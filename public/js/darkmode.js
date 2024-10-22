const $html = document.querySelector('html')

window.onload = function(){
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === '1') {
        $html.classList.add('dark-mode');

    } else {
        localStorage.setItem('darkMode', 0);
    }
}