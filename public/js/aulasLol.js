let aulaAtualId = null;
const qtdAulasTotal = 9;  // Defina aqui a quantidade total de aulas no curso
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
                    <div class="message-box">
                        <textarea placeholder="Escreva sua mensagem de dúvida aqui..."></textarea>
                    </div>
                    <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="below-video">
                    <div class="star-rating">
                        <span class="star" data-value="1">★</span>
                        <span class="star" data-value="2">★</span>
                        <span class="star" data-value="3">★</span>
                        <span class="star" data-value="4">★</span>
                        <span class="star" data-value="5">★</span>
                    </div>
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
    const curso_id = 3;
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
            alert(data.message);
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
    const cursoId =3;  // Substitua com o ID do curso correspondente
    
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
const cursoId = 3;  // Substitua com o ID do curso correspondente

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
document.getElementById('m1a1Lol').addEventListener('click', () => {aulaAtualId = 1; playVideo("https://www.youtube.com/embed/KD9eiLqI32s?si=WJh0lvkR8_7gUl5v")});
document.getElementById('m2a1Lol').addEventListener('click', () => {aulaAtualId = 2; playVideo("https://www.youtube.com/embed/wuh6pZFhzkw?si=kYdODdL3Nl1a3MMY")});
document.getElementById('m2a2Lol').addEventListener('click', () => {aulaAtualId = 3; playVideo("https://www.youtube.com/embed/3su1lhUSrWc?si=qmMLml2RGiCkiRtO")});
document.getElementById('m3a1Lol').addEventListener('click', () => {aulaAtualId = 4;playVideo("https://www.youtube.com/embed/9YQB1qVZyUg?si=vDpmz_0pN2K-Vtpa")});
document.getElementById('m4a1Lol').addEventListener('click', () => {aulaAtualId = 5;playVideo("https://www.youtube.com/embed/I4GQDs8RKVQ?si=ZKLaj4eWDXHFRjSf")});
document.getElementById('m5a1Lol').addEventListener('click', () => {aulaAtualId = 6;playVideo("https://www.youtube.com/embed/cLQqQufaTRg?si=vyZnjTdk-dsRwJht")});
document.getElementById('m5a2Lol').addEventListener('click', () => {aulaAtualId = 7;playVideo("https://www.youtube.com/embed/vjhZ75eJ9_o?si=A8UA11Oct2uOHkMu")});
document.getElementById('m6a1Lol').addEventListener('click', () => {aulaAtualId = 8;playVideo("https://www.youtube.com/embed/azIOGIfArMM?si=_oCKhhargdaQQIUu")});
document.getElementById('m6a2Lol').addEventListener('click', () => {aulaAtualId = 9;playVideo("https://www.youtube.com/embed/Pck1Kocwvfs?si=hivfP8l4AOy_424b")});
