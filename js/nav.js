async function nav() {
    const RUTA_NAV = window.location.pathname.includes('/html/') ? 'nav.html' : 'html/nav.html';
    const RUTA_ACTUAL = window.location.pathname.split("/").pop();
    const nav = document.querySelector("#nav");
    const header = document.querySelector("header");

    if (!nav) {
        if (header) {
            const p = document.createElement("p");
            p.textContent = "No se ha encontrado la referencia para cargar el nav";
            header.appendChild(p);
        }
        return;
    }

    try {
        const PAQUETE_NAV = await fetch(RUTA_NAV);
        if (!PAQUETE_NAV.ok) throw new Error(`Error HTTP: ${PAQUETE_NAV.status}`);

        const CONTENIDO_NAV = await PAQUETE_NAV.text();
        nav.innerHTML = CONTENIDO_NAV;

        const NAV_ENLACES = nav.querySelectorAll("a");
        const base = window.location.pathname.includes('/html/') ? '' : 'html/';

        NAV_ENLACES.forEach(enlace => {
            const origHref = enlace.getAttribute('href') || '';
            const file = origHref.split('/').pop();

            const isExternal = origHref.startsWith('http') || origHref.startsWith('//');
            const isAbsolute = origHref.startsWith('/');
            const hasParentRef = origHref.includes('..');

            if (!isExternal && !isAbsolute && !hasParentRef) {
                enlace.setAttribute('href', base + file);
            }

            if (file === RUTA_ACTUAL) {
                enlace.classList.add("text-red-500", "border-b-2", "border-red-500", "font-bold", "sm:scale-110");
                enlace.setAttribute("aria-current", "page");
            } else {
                enlace.classList.remove("text-red-500", "border-b-2", "border-red-500", "font-extrabold", "sm:scale-110");
            }
        });

        const themeBtn = nav.querySelector('#themeToggle');
        if (themeBtn) {
            window.toggleTheme = window.toggleTheme || function() {
                document.body.classList.toggle('light-mode');
                const isLight = document.body.classList.contains('light-mode');

                const darkBg = "../media/img/wallpaper.webp";
                const lightBg = "../media/img/wallpaper_light_mode.jpg";
                document.body.style.backgroundImage = `url('${isLight ? lightBg : darkBg}')`;

                const themeIcon = document.querySelector("#themeIcon");
                if (themeIcon) themeIcon.src = isLight ? "../media/img/sun.png" : "../media/img/moon.png";

                if (window.updateWeaponsTheme) window.updateWeaponsTheme();
                if (window.updateMapsTheme) window.updateMapsTheme();
                if (window.updateAgentsTheme) window.updateAgentsTheme();
            };

            themeBtn.addEventListener('click', () => {
                window.toggleTheme();
            });
        }
    } catch (e) {
        console.error(e);
        if (header) {
            const p = document.createElement("p");
            p.textContent = `Error al cargar el nav: ${e.message || e}`;
            header.appendChild(p);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    nav();

    if (window.updateAgentsTheme) window.updateAgentsTheme();
});