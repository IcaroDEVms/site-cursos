// Função que insere o vídeo no body quando o botão é clicado
function playVideo(videoUrl) {
    // Seleciona o container onde o vídeo será injetado
    const videoContainer = document.getElementById('video-container');

    // Insere o código do vídeo no container
    videoContainer.innerHTML = `
        <div class="video-overlay">
            <div class="video-content">
                <button onclick="closeVideo()" class="close-video">X</button>
                <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

// Função para fechar o vídeo e limpar o container
function closeVideo() {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Limpa o conteúdo
}

// Detecta clique no botão e chama a função de play do vídeo
document.querySelectorAll('.accordion-item button').forEach(button => {
    button.addEventListener('click', function() {
        const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // URL do vídeo a ser exibido
        playVideo(videoUrl);
    });
});
