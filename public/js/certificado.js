function downloadCertificate() {

    const userId = localStorage.getItem('userId');
    if (userId <= 0) {
        alert("Você precisa estar logado para emitir um certificado!");
        window.location.href = 'login.html';
        return;
    }

    const certificate = document.getElementById("certificate");

    html2canvas(certificate).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "certificado.png";
        link.click();
    });
}

async function loadCertificateData(userId, courseId) {
    try {
        const response = await fetch(`/certificado-dados/${userId}/${courseId}`);
        const data = await response.json();
        document.getElementById('nome-aluno').textContent = `Nome: ${data.nome}`;
        document.getElementById('nome-curso').textContent = `Curso: ${data.curso}`;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

window.onload = function() {
    const userId = 1; // Substitua pelo ID real do usuário
    const courseId = 2; // Substitua pelo ID real do curso
    loadCertificateData(userId, courseId);
};

function downloadCertificate() {
    html2canvas(document.querySelector("#certificate")).then(canvas => {
        const link = document.createElement('a');
        link.download = 'certificado.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}