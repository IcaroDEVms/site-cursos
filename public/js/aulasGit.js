let aulaAtualId = null;
let qtdAulasTotal = 5;  // Armazena o total de aulas do curso
let progressoAtual = 0; // Armazena o progresso atual

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

// Função para buscar `qtd_aulas` do curso
function obterQtdAulas(cursoId) {
    fetch(`http://localhost:2005/curso/${cursoId}/qtd_aulas`)
        .then(response => response.json())
        .then(data => {
            qtdAulasTotal = data.qtd_aulas;
            console.log(`Total de aulas no curso: ${qtdAulasTotal}`);
        })
        .catch(error => console.error('Erro ao buscar qtd_aulas:', error));
}

// Função para marcar aula como concluída e enviar progresso incrementado
function marcarConclusao() {
    const usuarioId = localStorage.getItem('userId');
    const curso_id = 1;
    const aula_id = aulaAtualId;

    // Calcula o incremento de progresso com base no número total de aulas
    const incrementoProgresso = 100 / qtdAulasTotal;
    progressoAtual = Math.min(progressoAtual + incrementoProgresso, 100);  // Limita a 100%

    // Envia o novo progresso ao backend
    fetch('http://localhost:2005/atualizar-progresso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuarioId, curso_id, aula_id, progresso: progressoAtual })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            updateProgress(progressoAtual); // Atualiza visualmente o progresso
        } else {
            alert('Erro ao atualizar o progresso');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Função para atualizar visualmente o progresso no círculo
function updateProgress(percent) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.strokeDasharray = `${percent}, 100`;
    progressText.textContent = `${Math.round(percent)}%`;
}

// Carrega o total de aulas do curso ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    const cursoId = 1;
    obterQtdAulas(cursoId);
});

// Botões dos módulos e aulas
document.getElementById('m1a1git').addEventListener('click', () => { aulaAtualId = 1; playVideo("https://www.youtube.com/embed/iQU7AS2jbPM?si=EFYBDny_r2hbcs0I"); });
document.getElementById('m1a2git').addEventListener('click', () => { aulaAtualId = 2; playVideo("https://www.youtube.com/embed/Vl49fxpMiGc?si=eJAnOjNtMvQIwAF9"); });
document.getElementById('m1a3git').addEventListener('click', () => { aulaAtualId = 3; playVideo("https://www.youtube.com/embed/63e5LEAcSmE?si=kFAkfHuN1WkUu0Dy"); });
document.getElementById('m1a4git').addEventListener('click', () => { aulaAtualId = 4; playVideo("https://www.youtube.com/embed/NyPnxWXoWXg?si=dVfQEJcc0IxVDIw0"); });
document.getElementById('m1a5git').addEventListener('click', () => { aulaAtualId = 5; playVideo("https://www.youtube.com/embed/6ul_U0zeoz8?si=_qvwCWCi04gxTg1Z"); });
