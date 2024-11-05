// Função para exibir o vídeo e o sistema de avaliação
function playVideo(videoUrl) {
    const videoContainer = document.getElementById('video-container');
    
    videoContainer.innerHTML = `
        <div class="video-overlay">
            <div class="video-content">
                <div class="video-header">
                    <h2 class="video-title">Rainbow Six Siege</h2>
                    <button id="close-btn" class="close-btn" aria-label="Close">✖</button>
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
document.getElementById('m1a1R6').addEventListener('click', () => playVideo("https://www.youtube.com/embed/yBR11yEGPYQ?si=2HqpX2w5cco2wLfo"));
document.getElementById('m2a1R6').addEventListener('click', () => playVideo("https://www.youtube.com/embed/PQdu3PGF0dY?si=kDITXJAAsDNRnd0F"));
document.getElementById('m2a2R6').addEventListener('click', () => playVideo("https://www.youtube.com/embed/sj-H6hY9b48?si=XG2HN-uYprH6uRms"));
document.getElementById('m3a1R6').addEventListener('click', () => playVideo("https://www.youtube.com/embed/Dbg4bqdSDDM?si=NLCMeiq-aGJX1hRe"));
document.getElementById('m3a2R6').addEventListener('click', () => playVideo("https://www.youtube.com/embed/moWoVtmS2ko?si=ru15KB904N1Yyu2G"));
document.getElementById('m4a1R6').addEventListener('click', () => playVideo("https://www.youtube.com/embed/GfvbxPPW-vk?si=S_B9dxcCgxmb7YnB"));
document.getElementById('m5a1R6').addEventListener('click', () => playVideo("https://www.youtube.com/embed/9UUyAJuiFa0?si=7jg6zXm7nByPdbs8"));





