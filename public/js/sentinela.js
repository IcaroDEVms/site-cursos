document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button-link a");
    const modal = document.getElementById("videoModal");
    const closeModal = document.querySelector(".close");
    const concludeButton = document.getElementById("concludeButton");
    const percentageCircle = document.getElementById("circle");
    const videoFrame = document.getElementById("videoFrame");
    let currentProgress = 0; // Progresso inicial
    let completedButtons = new Set(); // Armazena botões que já concluíram a aula
    let currentButtonIndex = null; // Index do botão atual

    // Adicionar o índice aos botões
    buttons.forEach((button, index) => {
        button.setAttribute('data-index', index); // Atribui um índice a cada botão
        button.addEventListener("click", function () {

            // Armazena o índice do botão clicado
            currentButtonIndex = index;

            // Defina o URL do vídeo correspondente ao personagem 
            const videoUrl = "https://www.youtube.com/embed/-y4vMXYgX1Q"; // Exemplo de URL
            videoFrame.src = videoUrl;
            modal.style.display = "block"; // Exibe o modal
        });
    });

    closeModal.onclick = function () {
        modal.style.display = "none"; // Fecha o modal
        videoFrame.src = ""; // Limpa o vídeo quando o modal é fechado
    };

    concludeButton.addEventListener("click", function () {
        if (currentProgress < 100 && currentButtonIndex !== null && !completedButtons.has(currentButtonIndex)) {
            completedButtons.add(currentButtonIndex); // Marca o botão como completado
            currentProgress += 17; // Incrementa o progresso em 17% (inteiros)
            currentProgress = Math.min(currentProgress, 100); // Garante que o progresso máximo seja 100%
            percentageCircle.textContent = `${currentProgress}%`;
            percentageCircle.style.backgroundColor = currentProgress >= 100 ? "#4CAF50" : "#aaaaaa"; // Muda a cor para verde se for 100%
        }
        modal.style.display = "none"; // Fecha o modal
        videoFrame.src = ""; // Limpa o vídeo
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Fecha o modal ao clicar fora dele
            videoFrame.src = ""; // Limpa o vídeo quando o modal é fechado
        }
    };

    // Adiciona o comportamento de hover e clique dinâmico para estrelas de avaliação
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
        star.addEventListener("click", function () {
            const value = parseInt(this.getAttribute('data-value')); // Obtém o valor da estrela clicada
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add("active"); // Preenche estrelas até o valor clicado
                } else {
                    s.classList.remove("active"); // Remove o preenchimento das demais
                }
            });
        });
    });
});
