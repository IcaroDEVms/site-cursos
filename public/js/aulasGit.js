let aulaAtualId = null;

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
                        <textarea placeholder="Escreva sua mensagem de duvida aqui..."></textarea>
                    </div>
                    <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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

    // Função para fechar o vídeo
    document.getElementById('close-btn').addEventListener('click', () => {
        videoContainer.innerHTML = '';
    });

    const stars = document.querySelectorAll('.star');
    let rating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => highlightStars(index));
        star.addEventListener('mouseout', () => highlightStars(rating - 1));
        star.addEventListener('click', () => {
            rating = index + 1;
            highlightStars(rating - 1);
        });
    });

    function highlightStars(index) {
        stars.forEach((star, i) => star.classList.toggle('active', i <= index));
    }
}

// Botões dos módulos e aulas
document.getElementById('m1a1git').addEventListener('click', () => playVideo("https://www.youtube.com/embed/iQU7AS2jbPM?si=EFYBDny_r2hbcs0I"));
document.getElementById('m1a2git').addEventListener('click', () => playVideo("https://www.youtube.com/embed/Vl49fxpMiGc?si=eJAnOjNtMvQIwAF9"));
document.getElementById('m1a3git').addEventListener('click', () => playVideo("https://www.youtube.com/embed/63e5LEAcSmE?si=kFAkfHuN1WkUu0Dy"));
document.getElementById('m1a4git').addEventListener('click', () => playVideo("https://www.youtube.com/embed/NyPnxWXoWXg?si=dVfQEJcc0IxVDIw0"));
document.getElementById('m1a5git').addEventListener('click', () => playVideo("https://www.youtube.com/embed/6ul_U0zeoz8?si=_qvwCWCi04gxTg1Z"));

//Progresso
document.getElementById('ConclusaoButton').addEventListener('click', () => {
    const usuarioId = 1; // ID do usuário logado
    const curso_id = 1;  // ID do curso atual
    const aula_id = 1;   // ID da aula atual
    const progresso = 100;

    fetch('http://localhost:2005/atualizar-progresso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuarioId, curso_id, aula_id, progresso })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert('Erro ao atualizar o progresso');
        }
    })
    .catch(error => console.error('Erro:', error));
});

// Função para verificar e bloquear o acesso a aulas até que a aula anterior seja concluída
function verificarAcessoAulas(usuarioId, curso_id) {
    fetch(`http://localhost:2005/progressos/${usuarioId}/${curso_id}`)
    .then(response => response.json())
    .then(progressos => {
        const botoesAula = document.querySelectorAll('.button-aula');

        botoesAula.forEach((botao, index) => {
            const aula_id = index + 1;
            const progressoAula = progressos.find(prog => prog.aula_id === aula_id)?.progresso || 0;

            // Desabilitar a aula se a anterior não tiver sido concluída (progresso de 100%)
            if (aula_id > 1 && (progressos.find(prog => prog.aula_id === aula_id - 1)?.progresso || 0) < 100) {
                botao.disabled = true;
                botao.classList.add('disabled');
            } else {
                botao.disabled = false;
                botao.classList.remove('disabled');
            }
        });
    })
    .catch(error => console.error('Erro ao buscar progresso:', error));
}

// Chame verificarAcessoAulas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const usuarioId = 1;  // Substitua pelo ID do usuário logado
    const curso_id = 1;   // Substitua pelo ID do curso atual
    verificarAcessoAulas(usuarioId, curso_id);
});

// Função para atualizar o progresso do círculo
function updateProgress(percent) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    // Define o dasharray com base na porcentagem
    const dashArray = `${percent}, 100`;
    progressBar.style.strokeDasharray = dashArray;

    // Atualiza o texto de porcentagem
    progressText.textContent = `${percent}%`;
}

// Exemplo de chamada para simular o progresso (substitua isso pelo seu valor real)
document.addEventListener('DOMContentLoaded', () => {
    let progress = 0;
    const interval = setInterval(() => {
        if (progress >= 100) clearInterval(interval);
        updateProgress(progress);
        progress += 25; // Incrementa de 25% em 25%
    }, 1000); // Atualiza a cada segundo
});
