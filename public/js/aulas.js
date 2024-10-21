// Função que insere o vídeo no body quando o botão é clicado
        // Função para exibir o vídeo
        function playVideo(videoUrl) {
            // Seleciona o container onde o vídeo será injetado
            const videoContainer = document.getElementById('video-container');
    
            // Insere o código do vídeo no container
            videoContainer.innerHTML = `
                <div class="video-overlay">
                    <div class="video-content">
                        <button onclick="closeVideo()" class="close-video">X</button>
                            <iframe width="560" height="315" src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>                    </div>
                </div>
            `;
        }
    
        // Função para fechar o vídeo e limpar o container
        function closeVideo() {
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = ''; // Limpa o conteúdo
        }
    
        // Adiciona o evento de clique ao botao1
        document.getElementById('botao1').addEventListener('click', function() {
            const videoUrl = "https://www.youtube.com/embed/EuTdbZxJzKk?si=NWqqVox8RyBywdcq"; // URL do vídeo a ser exibido
            playVideo(videoUrl);
        });