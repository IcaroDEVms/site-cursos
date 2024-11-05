// Função para exibir o vídeo e o sistema de avaliação
function playVideo(videoUrl) {
    const videoContainer = document.getElementById('video-containerTrue');
    
    videoContainer.innerHTML = `
        <div class="video-overlay">
            <div class="video-content">
                <div class="video-header">
                    <h2 class="video-title">Rocket League</h2>
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
document.getElementById('m1a1RL').addEventListener('click', () => playVideo("https://www.youtube.com/embed/rlTMBCaezeU?si=ElgLpBElLpSy4Q_s"));
document.getElementById('m1a2RL').addEventListener('click', () => playVideo("https://www.youtube.com/embed/jKXW6Gv9TJo?si=2PUV2wjN-e6AySnW"));
document.getElementById('m2a1RL').addEventListener('click', () => playVideo("https://www.youtube.com/embed/dcOs728v6oE?si=bemeLhj_SF_dZkkw"));
document.getElementById('m3a1RL').addEventListener('click', () => playVideo("https://www.youtube.com/embed/b5D5VArKebk?si=5QUXSKDiHYbuc70b"));
document.getElementById('m4a1RL').addEventListener('click', () => playVideo("https://www.youtube.com/embed/NYI9bjrNwcU?si=hMGpvx4YIRT8mNwn"));
document.getElementById('m5a1RL').addEventListener('click', () => playVideo("https://www.youtube.com/embed/ia7KRhj76Cc?si=z7q0eYIeEzkLtbuX"));
