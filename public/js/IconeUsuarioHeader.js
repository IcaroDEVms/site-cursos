// Carrega o userId salvo no localStorage
const userId = localStorage.getItem('userId');

// Verifica se o userId existe e chama a função para carregar a foto do usuário
if (userId > 0) {
    loadUserPhoto(userId);
    LoadNameUser(userId);
    document.getElementById('HeaderUserImg').href = 'usuario.html';
}else{
    document.getElementById('HeaderUserImg').href = 'login.html';
}

function loadUserPhoto(userId) {
    fetch(`/buscar-imagemPath/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar imagem do usuário');
            }
            return response.json();
        })
        .then(data => {
            const HeaderUserImg = document.getElementById('user-photo');
            if (data.imagePath) {
                HeaderUserImg.src = data.imagePath; // Atualiza o caminho da imagem
            } else {
                HeaderUserImg.alt = "Imagem não encontrada";
            }
        })
        .catch(error => {
            console.error('Erro ao carregar imagem:', error);
        });
}

function LoadNameUser(userId){
    fetch(`/buscar-nome/${userId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar nome do usuário');
        }
        return response.json();
    })
    .then(data => {
        const HeaderUser = document.getElementById('nameHeader');
        if (data.nome) {
            HeaderUser.innerHTML = data.nome;
        } else {
            HeaderUser.innerHTML = "Nome não encontrado";
        }
    })
    .catch(error => {
        console.error('Erro ao carregar imagem:', error);
    });
}