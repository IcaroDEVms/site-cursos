const $html = document.querySelector('html')
// const $checkbox = document.querySelector('#switch')


// $checkbox.addEventListener('change', function(){
//     $html.classList.toggle('dark-mode')
// })

window.addEventListener('load', function(){
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === '1') {
        $html.classList.add('dark-mode');

        // $checkbox.checked = true; // Ensure the checkbox reflects the current mode
    }
});