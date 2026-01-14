window.updateIndexTheme = function() {
    const isLight = document.body.classList.contains('light-mode');
    const container = document.querySelector('main div');
    const title = document.querySelector('h1');
    const desc = document.querySelector('p');
    const secBtns = document.querySelectorAll('a:not(.bg-\\[\\#ff4655\\])');

    if (container) {
        container.classList.toggle('bg-white/90', isLight);
        container.classList.toggle('bg-black/60', !isLight);
        container.classList.toggle('text-black', isLight);
        container.classList.toggle('text-white', !isLight);
    }
    if (title) title.classList.toggle('text-black', isLight);
    if (desc) desc.classList.toggle('text-slate-700', isLight);
    
    secBtns.forEach(btn => {
        btn.classList.toggle('bg-slate-200', isLight);
        btn.classList.toggle('text-black', isLight);
        btn.classList.toggle('bg-white/10', !isLight);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    window.updateIndexTheme();
});