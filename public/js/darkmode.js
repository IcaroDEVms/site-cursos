if (typeof $html === 'undefined') {
    const $html = document.querySelector('html');
}
const casinha = document.getElementById('casinha');

window.addEventListener('load', function(){
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === '1') {
        console.log('modo escuro ativado!');
        $html.classList.add('dark-mode');
        casinha.src = 'img/CASINHABRANCA.png' 
    }
});