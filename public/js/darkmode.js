const $html = document.querySelector('html')

window.addEventListener('load', function(){
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === '1') {
        $html.classList.add('dark-mode');
    }
});