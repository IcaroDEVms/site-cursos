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