document.addEventListener('DOMContentLoaded', function() {

    // Função para exibir o vídeo e o sistema de avaliação
    function playVideo(videoUrl, emailId, cursoId, aulaId) {
        const videoContainer = document.getElementById('video-container');
        
        videoContainer.innerHTML = `
            <div class="video-overlay">
                <div class="video-content">
                    <iframe width="560" height="315" src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <button id="close-btn">Fechar</button>
            </div>
            <div class="AboveVideo">
                <div class="star-rating">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
                <button id="ConclusaoButton" class="ConclusaoButton">Marcar como concluída</button>
            </div>
            <p id="statusAula${aulaId}">🔘</p>
        `;

        // Função para fechar o vídeo
        const closeBtn = document.getElementById('close-btn');
        closeBtn.addEventListener('click', () => {
            videoContainer.innerHTML = '';
        });

        // Eventos para avaliação com estrelas
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
            stars.forEach((star, i) => {
                star.classList.toggle('active', i <= index);
            });
        }
    }

    // Lista de botões para aulas e suas URLs
    const aulas = [
        { id: 'm1a1git', url: "https://www.youtube.com/embed/iQU7AS2jbPM?si=EFYBDny_r2hbcs0I", emailId: 1, cursoId: 1, aulaId: 1 },
        { id: 'm1a2git', url: "https://www.youtube.com/embed/Vl49fxpMiGc?si=eJAnOjNtMvQIwAF9", emailId: 1, cursoId: 1, aulaId: 2 },
        { id: 'm1a3git', url: "https://www.youtube.com/embed/63e5LEAcSmE?si=kFAkfHuN1WkUu0Dy", emailId: 1, cursoId: 1, aulaId: 2 },
        { id: 'm1a4git', url: "https://www.youtube.com/embed/NyPnxWXoWXg?si=dVfQEJcc0IxVDIw0", emailId: 1, cursoId: 1, aulaId: 2 },
        { id: 'm1a5git', url: "https://www.youtube.com/embed/6ul_U0zeoz8?si=_qvwCWCi04gxTg1Z", emailId: 1, cursoId: 1, aulaId: 2 },
      
    ];

    aulas.forEach(aula => {
        const button = document.getElementById(aula.id);
        if (button) {
            button.addEventListener('click', () => playVideo(aula.url, aula.emailId, aula.cursoId, aula.aulaId));
        } else {
            console.warn(`Botão de aula com id ${aula.id} não encontrado no HTML.`);
        }
    });
});
