// Função para exibir o vídeo e o sistema de avaliação
function playVideo(videoUrl) {
    // Seleciona o container onde o vídeo será injetado
    const videoContainer = document.getElementById('video-container');
    
    // Insere o código do vídeo no container
    videoContainer.innerHTML = `
        <div class="video-overlay">
            <div class="video-content">
                <iframe width="560" height="315" src=" ${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>            </div>
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
<p id="statusAula"></p>

    `;

    // Função para fechar o vídeo e limpar o container
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
        videoContainer.innerHTML = ''; // Limpa o conteúdo
    });

    // Adiciona os eventos de avaliação às estrelas depois que o HTML foi criado
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('rating-value');
    let rating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            highlightStars(index);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(rating - 1); // Restaura a avaliação anterior
        });

        star.addEventListener('click', () => {
            rating = index + 1; // Define a avaliação com base no índice clicado
            ratingValue.textContent = `Avaliação: ${rating} estrelas`;
            highlightStars(rating - 1); // Mantém as estrelas selecionadas após o clique
        });
    });

    function highlightStars(index) {
        stars.forEach((star, i) => {
            star.classList.toggle('active', i <= index);
        });
    }
}

//botões do modulo 1  NOMENCLATURA mxay  x=numero do módulo e y = numero da aula
// Adiciona o evento de clique ao botão para exibir o vídeo
document.getElementById('m1a1Vava').addEventListener('click', function() {
    const videoUrl = "https://www.youtube.com/embed/GSUr_8Z2TCo?si=syE_Prioud6SzqQg"; // URL do vídeo a ser exibido
    playVideo(videoUrl); // Chama a função ao clicar no botão
});

//botões do modulo 2 NOMENCLATURA mxay  x=numero do módulo e y = numero da aula
document.getElementById('m2a1Vava').addEventListener('click', function() {
    const videoUrl = "https://www.youtube.com/embed/tuDyNBQVnQ0?si=D_9cQiRb4s8-jvz9"; // URL do vídeo a ser exibido
    playVideo(videoUrl); // Chama a função ao clicar no botão
});

//botões do modulo 3  NOMENCLATURA mxay  x=numero do módulo e y = numero da aula
document.getElementById('m3a1Vava').addEventListener('click', function() {
    const videoUrl = "https://www.youtube.com/embed/QvtHRl3BcNc?si=38HtSJk--Ohyy5Ut"; // URL do vídeo a ser exibido
    playVideo(videoUrl); // Chama a função ao clicar no botão
});

//botões do modulo 4  NOMENCLATURA mxay  x=numero do módulo e y = numero da aula
document.getElementById('m4a1Vava').addEventListener('click', function() {
    const videoUrl = "https://www.youtube.com/embed/s2VbD_nNwFM?si=1ckrHVIqpzKzsKcB"; // URL do vídeo a ser exibido
    playVideo(videoUrl); // Chama a função ao clicar no botão
});

//botões do modulo 5  NOMENCLATURA mxay  x=numero do módulo e y = numero da aula
document.getElementById('m5a1Vava').addEventListener('click', function() {
    const videoUrl = "https://www.youtube.com/embed/PLdwbIHm_Ww?si=2hsTZHN-nbT0QXsi"; // URL do vídeo a ser exibido
    playVideo(videoUrl); // Chama a função ao clicar no botão
});

document.getElementById('m5a2Vava').addEventListener('click', function() {
    const videoUrl = "https://www.youtube.com/embed/Xxfgkdl6bmQ?si=It0YKY3xuM-KeJy1"; // URL do vídeo a ser exibido
    playVideo(videoUrl); // Chama a função ao clicar no botão
});

document.getElementById('m5a3Vava').addEventListener('click', function() {
    const videoUrl = "https://www.youtube.com/embed/gBi-sQ0okeU?si=RvEk1IW8mSDmjGOG"; // URL do vídeo a ser exibido
    playVideo(videoUrl); // Chama a função ao clicar no botão
});

document.getElementById('ConclusaoButton').addEventListener('click', function() {
    // Muda o ícone de status para a aula correspondente
    const statusAula = document.getElementById(statusAulaId);
    if (statusAula) {
        statusAula.innerHTML = '✅'; // Marca a aula como concluída
    }
});




