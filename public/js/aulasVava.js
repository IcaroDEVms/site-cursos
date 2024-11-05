// Função para exibir o vídeo e o sistema de avaliação
function playVideo(videoUrl) {
    const videoContainer = document.getElementById('video-containerTrue');
    
    videoContainer.innerHTML = `
        <div class="video-overlay">
            <div class="video-content">
                <div class="video-header">
                    <h2 class="video-title">Valorant</h2>
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
document.getElementById('m1a1Vava').addEventListener('click', () => playVideo("https://www.youtube.com/embed/GSUr_8Z2TCo?si=syE_Prioud6SzqQg"));
document.getElementById('m2a1Vava').addEventListener('click', () => playVideo("https://www.youtube.com/embed/tuDyNBQVnQ0?si=D_9cQiRb4s8-jvz9"));
document.getElementById('m3a1Vava').addEventListener('click', () => playVideo("https://www.youtube.com/embed/QvtHRl3BcNc?si=38HtSJk--Ohyy5Ut"));
document.getElementById('m4a1Vava').addEventListener('click', () => playVideo("https://www.youtube.com/embed/s2VbD_nNwFM?si=1ckrHVIqpzKzsKcB"));
document.getElementById('m5a1Vava').addEventListener('click', () => playVideo("https://www.youtube.com/embed/PLdwbIHm_Ww?si=2hsTZHN-nbT0QXsi"));
document.getElementById('m5a2Vava').addEventListener('click', () => playVideo("https://www.youtube.com/embed/Xxfgkdl6bmQ?si=It0YKY3xuM-KeJy1"));
document.getElementById('m5a3Vava').addEventListener('click', () => playVideo("https://www.youtube.com/embed/gBi-sQ0okeU?si=RvEk1IW8mSDmjGOG"));