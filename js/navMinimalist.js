(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    const IN_HTML_FOLDER = window.location.pathname.includes("/html/");
    const fragmentPath = IN_HTML_FOLDER ? "navMinimalist.html" : "html/navMinimalist.html";

    function applyTheme(isLight) {
        document.body.classList.toggle('light-mode', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        const darkBg = IN_HTML_FOLDER ? "../media/img/wallpaper.webp" : "media/img/wallpaper.jpg";
        const lightBg = IN_HTML_FOLDER ? "../media/img/wallpaper_light_mode.jpg" : "media/img/wallpaper_light_mode.jpg";
        document.body.style.backgroundImage = `url('${isLight ? lightBg : darkBg}')`;
        const icon = document.querySelector("#themeIconMinimal") || document.querySelector("#themeIcon");
        if (icon) {
            const sun = IN_HTML_FOLDER ? "../media/img/sun.png" : "media/img/sun.png";
            const moon = IN_HTML_FOLDER ? "../media/img/moon.png" : "media/img/moon.png";
            icon.src = isLight ? sun : moon;
        }
        if (window.updateWeaponsTheme) window.updateWeaponsTheme();
        if (window.updateMapsTheme) window.updateMapsTheme();
        if (window.updateAgentsTheme) window.updateAgentsTheme();
        if (window.updateIndexTheme) window.updateIndexTheme();
    }

    window.toggleTheme = function () {
        applyTheme(!document.body.classList.contains('light-mode'));
    };

    function fetchAndInsert() {
        fetch(fragmentPath)
            .then((r) => r.text())
            .then((html) => {
                const container = document.createElement("div");
                container.innerHTML = html;
                if (document.getElementById("navMinimalist")) return;

                const navEl = container.querySelector("#navMinimalist");
                const sideMenu = container.querySelector("#navSideMenu");
                const overlay = container.querySelector("#navOverlay");

                normalizeLinks(container);
                normalizeImages(container);
                markActive(container);

                const btn = container.querySelector("#themeToggleMinimal");
                if (btn) btn.onclick = window.toggleTheme;

                document.body.appendChild(navEl);
                if (overlay) document.body.appendChild(overlay);
                if (sideMenu) document.body.appendChild(sideMenu);

                hookSideMenu();
                adaptToViewport(navEl);
                window.addEventListener("resize", () => adaptToViewport(navEl));

                if (localStorage.getItem('theme') === 'light') applyTheme(true);
            });
    }

    function hookSideMenu() {
    const logoBtn = document.getElementById("navLogoBtn");
    const sideMenu = document.getElementById("navSideMenu");
    const overlay = document.getElementById("navOverlay");
    const themeInMenu = document.getElementById("themeToggleInMenu");
    const closeBtn = document.getElementById("navCloseBtn");

    if (!logoBtn || !sideMenu || !overlay) return;

    logoBtn.onclick = () => {
        sideMenu.classList.remove("hidden");
        overlay.classList.remove("hidden");
        
        setTimeout(() => {
            sideMenu.classList.remove("-translate-x-full");
        }, 10);
    };

    const closeMenu = () => {
        sideMenu.classList.add("-translate-x-full");
        setTimeout(() => {
            sideMenu.classList.add("hidden");
            overlay.classList.add("hidden");
        }, 300);
    };

    overlay.onclick = closeMenu;
    if (closeBtn) closeBtn.onclick = closeMenu;
    if (themeInMenu) themeInMenu.onclick = window.toggleTheme;
}

    function normalizeLinks(root) {
        const anchors = root.querySelectorAll("a");
        anchors.forEach((a) => {
            let href = a.getAttribute("href");
            if (!href || href.startsWith("http") || href.startsWith("#")) return;
            
            if (!IN_HTML_FOLDER) {
                if (href !== "index.html" && !href.startsWith("html/")) {
                    a.setAttribute("href", "html/" + href);
                }
            } else {
                if (href === "index.html") {
                    a.setAttribute("href", "../index.html");
                } else if (!href.startsWith("../") && href !== window.location.pathname.split("/").pop()) {
                }
            }
        });
    }

    function normalizeImages(root) {
        const imgs = root.querySelectorAll("img");
        imgs.forEach((img) => {
            const src = img.getAttribute("src") || "";
            if (!src || src.startsWith("http")) return;
            if (IN_HTML_FOLDER) {
                if (src.startsWith("media/img/")) img.src = "../" + src;
            } else {
                if (src.startsWith("../media/img/")) img.src = src.replace("../", "");
            }
        });
    }

    function adaptToViewport(navBar) {
        const isDesktop = window.innerWidth >= 1024;
        const navButtons = document.getElementById("navButtons");
        const navLogoBtn = document.getElementById("navLogoBtn");
        if (isDesktop) {
            navBar.className = "fixed left-4 top-1/3 flex flex-col gap-5 z-50";
            if (navButtons) navButtons.classList.remove("hidden");
            if (navLogoBtn) navLogoBtn.style.display = "none";
        } else {
            navBar.className = "fixed top-4 left-4 z-50 flex flex-col";
            if (navButtons) navButtons.classList.add("hidden");
            if (navLogoBtn) navLogoBtn.style.display = "flex";
        }
    }

    function markActive(root) {
        const anchors = root.querySelectorAll("a");
        let current = window.location.pathname.split("/").pop();
        if (current === "" || current === "/") current = "index.html";

        anchors.forEach((a) => {
            const href = a.getAttribute("href") || "";
            if (href.endsWith(current)) {
                a.removeAttribute("href");
                a.classList.add("ring-2", "ring-white", "opacity-50", "cursor-default");
                a.classList.remove("hover:scale-110", "cursor-pointer");
                a.onclick = (e) => e.preventDefault();
            }
        });
    }

    fetchAndInsert();
})();