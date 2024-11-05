// Função para exibir o vídeo e o sistema de avaliação
function playVideo(videoUrl) {
    const videoContainer = document.getElementById('video-container');
    
    videoContainer.innerHTML = `
        <div class="video-overlay">
            <div class="video-content">
                <div class="video-header">
                    <h2 class="video-title">Legue of legends</h2>
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
document.getElementById('m1a1Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/KD9eiLqI32s?si=WJh0lvkR8_7gUl5v"));
document.getElementById('m2a1Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/wuh6pZFhzkw?si=kYdODdL3Nl1a3MMY"));
document.getElementById('m2a2Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/3su1lhUSrWc?si=qmMLml2RGiCkiRtO"));
document.getElementById('m3a1Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/9YQB1qVZyUg?si=vDpmz_0pN2K-Vtpa"));
document.getElementById('m4a1Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/I4GQDs8RKVQ?si=ZKLaj4eWDXHFRjSf"));
document.getElementById('m5a1Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/cLQqQufaTRg?si=vyZnjTdk-dsRwJht"));
document.getElementById('m5a2Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/vjhZ75eJ9_o?si=A8UA11Oct2uOHkMu"));
document.getElementById('m6a1Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/azIOGIfArMM?si=_oCKhhargdaQQIUu"));
document.getElementById('m6a2Lol').addEventListener('click', () => playVideo("https://www.youtube.com/embed/Pck1Kocwvfs?si=hivfP8l4AOy_424b"));
