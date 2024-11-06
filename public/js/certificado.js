function downloadCertificate() {
    const certificate = document.getElementById("certificate");
    
    html2canvas(certificate).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "certificado.png";
        link.click();
    });
}
