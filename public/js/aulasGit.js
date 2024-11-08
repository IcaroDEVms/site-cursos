let aulaAtualId = null;
const qtdAulasTotal = 5;  // Defina aqui a quantidade total de aulas no curso
let progressoAtual = 0;   // Variável para armazenar o progresso atual

// Função para exibir o vídeo e o sistema de avaliação
function playVideo(videoUrl) {
    const videoContainer = document.getElementById('video-containerTrue');
    
    videoContainer.innerHTML = `
        <div class="video-overlay">
            <div class="video-content">
                <div class="video-header">
                    <h2 class="video-title">Git</h2>
                    <button id="close-btn" class="close-btn" aria-label="Close">❌</button>
                </div>
                <div class="video-and-message">
                    
                    <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="below-video">
                    
                    <button id="ConclusaoButton" class="ConclusaoButton">Marcar como concluída</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('close-btn').addEventListener('click', () => {
        videoContainer.innerHTML = '';
    });

    // Evento para marcar aula como concluída e enviar progresso
    document.getElementById('ConclusaoButton').addEventListener('click', marcarConclusao);
}

// Função para marcar aula como concluída e enviar progresso incrementado
function marcarConclusao() {
    const usuarioId = localStorage.getItem('userId');
    const curso_id = 1;
    const aula_id = aulaAtualId;

    // Verifique os valores
    console.log("Qtd de Aulas Total:", qtdAulasTotal);
    console.log("usuarioId:", usuarioId, "curso_id:", curso_id, "aula_id:", aula_id);
    if (qtdAulasTotal > 0) {
        const incrementoProgresso = 100 / qtdAulasTotal;
        progressoAtual = Math.min(progressoAtual + incrementoProgresso, 100);  // Limita a 100%
        console.log("Incremento de Progresso:", incrementoProgresso);
        console.log("Progresso Atual:", progressoAtual);
        
        // Salva progresso no localStorage
        localStorage.setItem('progressoAtual', progressoAtual);
    } else {
        progressoAtual = 100;
        console.log("Progresso Atual Setado para 100% porque qtdAulasTotal é 0");
    }
    

    // Envia o novo progresso ao backend
    fetch('/atualizar-progresso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuarioId, curso_id, aula_id, progresso: progressoAtual })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta do servidor:", data);
        if (data.message) {
            showNotification(data.message);
            updateProgress(progressoAtual); // Atualiza visualmente o progresso
        } else {
            alert('Erro ao atualizar o progresso');
        }
    })
    .catch(error => console.error('Erro na requisição:', error));
}

// Função para buscar o progresso do banco de dados e atualizar a variável progressoAtual
document.addEventListener('DOMContentLoaded', () => {
    const usuarioId = localStorage.getItem('userId');  // Substitua pelo método adequado para obter o ID do usuário
    const cursoId = 1;  // Substitua com o ID do curso correspondente
    
    // Função para buscar o progresso do banco de dados
    fetch(`/curso-progresso/${usuarioId}/${cursoId}`)
        .then(response => response.json())
        .then(data => {
            if (data.progresso !== undefined) {
                progressoAtual = data.progresso;  // Define o progresso atual com o valor do banco
                updateProgress(progressoAtual);  // Atualiza visualmente o círculo de progresso
            } else {
                console.warn('Progresso não encontrado.');
            }
        })
        .catch(error => console.error('Erro ao buscar progresso:', error));
});

const usuarioId = localStorage.getItem('userId');  // Substitua pelo método adequado para obter o ID do usuário
const cursoId = 1;  // Substitua com o ID do curso correspondente

// Verifica se há progresso salvo no localStorage
const progressoSalvo = localStorage.getItem('progressoAtual');
if (progressoSalvo !== null) {
    progressoAtual = parseFloat(progressoSalvo); // Usa o progresso salvo no localStorage
    updateProgress(progressoAtual);  // Atualiza visualmente o círculo de progresso
} else {
    // Caso não haja progresso salvo, tenta buscar do backend
    fetch(`/curso-progresso/${usuarioId}/${cursoId}`)
        .then(response => response.json())
        .then(data => {
            if (data.progresso !== undefined) {
                progressoAtual = data.progresso;  // Define o progresso atual com o valor do banco
                localStorage.setItem('progressoAtual', progressoAtual); // Salva no localStorage
                updateProgress(progressoAtual);  // Atualiza visualmente o progresso
            } else {
                console.warn('Progresso não encontrado.');
            }
        })
        .catch(error => console.error('Erro ao buscar progresso:', error));
}

// Função para buscar o progresso do banco de dados e atualizar o progresso visualmente
async function buscarProgresso() {
    try {
        const response = await fetch(`/buscar-progresso/${usuarioId}/${cursoId}/progresso`);
        if (!response.ok) {
            const errorData = await response.json();
            console.warn("Erro ao buscar progresso:", response.statusText, errorData);
            return;
        }

        const data = await response.json();
        
        if (data.progresso !== undefined) {
            progressoAtual = data.progresso;
            updateProgress(progressoAtual); // Atualiza visualmente o progresso no círculo
        } else {
            console.warn('Progresso não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar progresso:', error);
    }
}

// Função para atualizar visualmente o progresso no círculo
function updateProgress(percent) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    // Atualiza o dasharray do círculo com base na porcentagem
    progressBar.style.strokeDasharray = `${percent}, 100`;
    progressText.textContent = `${Math.round(percent)}%`;  // Atualiza o texto de porcentagem
}

// Chama buscarProgresso ao carregar a página
document.addEventListener('DOMContentLoaded', buscarProgresso);
// Botões dos módulos e aulas
document.getElementById('m1a1git').addEventListener('click', () => { aulaAtualId = 1; playVideo("https://www.youtube.com/embed/iQU7AS2jbPM?si=EFYBDny_r2hbcs0I"); });
document.getElementById('m1a2git').addEventListener('click', () => { aulaAtualId = 2; playVideo("https://www.youtube.com/embed/Vl49fxpMiGc?si=eJAnOjNtMvQIwAF9"); });
document.getElementById('m1a3git').addEventListener('click', () => { aulaAtualId = 3; playVideo("https://www.youtube.com/embed/63e5LEAcSmE?si=kFAkfHuN1WkUu0Dy"); });
document.getElementById('m1a4git').addEventListener('click', () => { aulaAtualId = 4; playVideo("https://www.youtube.com/embed/NyPnxWXoWXg?si=dVfQEJcc0IxVDIw0"); });
document.getElementById('m1a5git').addEventListener('click', () => { aulaAtualId = 5; playVideo("https://www.youtube.com/embed/6ul_U0zeoz8?si=_qvwCWCi04gxTg1Z"); });

function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.toggle('error', isError);
    notification.style.display = 'block';

    // Ocultar a notificação após 3 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}