const casinha = document.getElementById('casinha');
const $html = document.querySelector('html');

window.addEventListener('load', function(){
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === '1') {
        console.log('modo escuro ativado!');
        casinha.src = 'img/CASINHABRANCA.png' 
        $html.classList.add('dark-mode');
    }
});