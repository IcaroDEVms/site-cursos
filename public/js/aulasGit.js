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
