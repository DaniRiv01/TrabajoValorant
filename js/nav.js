async function nav() 
{
    const RUTA_NAV = "../html/nav.html";
    const RUTA_ACTUAL = window.location.pathname.split("/").pop();
    let nav = document.querySelector("#nav");

    //EN CASO DE NO ENCONTRAR EL DIV DONDE VA A IR EL NAV (para mostrarlo por pantalla)
    let p = document.createElement("p");
    //Busco la etiqueta por que no debería de haber más de un header (en teoría)
    let header = document.querySelector("header");
    if(!nav)
    {
        p.textContent = "No se ha encontrado la referencia para cargar el nav"
        header.appendChild(p);
        return;
    }
    try{
        const PAQUETE_NAV = await fetch(RUTA_NAV);
        //EN CASO DE QUE POR LO QUE SEA FALLE EL FETCH
        if(!PAQUETE_NAV.ok){
            throw new Error(`Error HTTP: ${PAQUETE_NAV.status}`);
        }

        const CONTENIDO_NAV = await PAQUETE_NAV.text();
        nav.innerHTML = CONTENIDO_NAV;

        const NAV_ENLACES = nav.querySelectorAll("a");

        NAV_ENLACES.forEach(enlace => {
            const RUTA_ENLACE = enlace.getAttribute("href").split("/").pop();
            if (RUTA_ENLACE === RUTA_ACTUAL) {
                enlace.classList.add("text-green-400", "border-b-2", "border-green-400", "font-bold", "sm:scale-110");
                enlace.setAttribute("aria-current", "page");
            } else {
                enlace.classList.remove("text-green-400", "border-b-2", "border-green-400", "font-extrabold", "sm:scale-110");
            }
        });
    }catch(e){
        console.error("No se ha podido cargar el nav:", e);
        p.textContent = `Error al cargar el nav: ${e.message || e}`;
        header.appendChild(p);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    nav();
});