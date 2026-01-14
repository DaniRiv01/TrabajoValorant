async function showMaps() {
    const div = document.querySelector('#mapsContainer');
    if (!div) return;
    div.innerHTML = "";
    try {
        const res = await fetch('https://valorant-api.com/v1/maps');
        const data = await res.json();
        data.data.forEach(map => {
            const card = document.createElement('div');
            card.className = "map-card w-32 md:w-36 rounded-lg backdrop-blur-md shadow-lg overflow-hidden flex flex-col items-center cursor-pointer animate-fadeUp transition-all duration-300 hover:scale-105";
            card.innerHTML = `
                <img src="${map.displayIcon || map.listViewIcon}" class="max-w-full h-auto object-contain p-3 pointer-events-none">
                <p class="text-sm text-center font-semibold pb-3 px-2 break-words uppercase">${map.displayName}</p>
            `;
            card.onclick = () => showMapDetails(map);
            div.appendChild(card);
        });
    } catch (e) { console.error(e); }
}

function showMapDetails(map) {
    const isLight = document.body.classList.contains('light-mode');
    const left = document.querySelector('#left');
    if (left) { left.classList.remove('hidden'); left.classList.add('flex'); }

    document.querySelector('#nameMapContainer').innerHTML = `<h2 class="text-4xl md:text-8xl font-bold uppercase ${isLight ? 'text-black' : 'text-white'}">${map.displayName}</h2>`;
    document.querySelector('#imageMapContainer').innerHTML = `<img src="${map.splash}" class="max-h-[50vh] w-full object-cover rounded-xl shadow-2xl drop-shadow-2xl">`;
    
    const coords = map.coordinates ? `Coordenadas: ${map.coordinates}` : "";
    document.querySelector('#descriptionMapContainer').innerHTML = `<p class="text-lg ${isLight ? 'text-slate-800' : 'text-gray-300'}">${coords}</p>`;
}

window.updateMapsTheme = function() {
    const isLight = document.body.classList.contains('light-mode');
    document.querySelectorAll('.map-card').forEach(card => {
        card.classList.toggle('bg-white/90', isLight);
        card.classList.toggle('border', isLight);
        card.classList.toggle('bg-gray-800/80', !isLight);
        const p = card.querySelector('p');
        if (p) p.className = `text-sm text-center font-semibold pb-3 px-2 uppercase ${isLight ? 'text-black' : 'text-white'}`;
    });
    const detName = document.querySelector('#nameMapContainer h2');
    if (detName) detName.className = `text-4xl md:text-8xl font-bold uppercase ${isLight ? 'text-black' : 'text-white'}`;
    const detDesc = document.querySelector('#descriptionMapContainer p');
    if (detDesc) detDesc.className = `text-lg ${isLight ? 'text-slate-800' : 'text-gray-300'}`;
};

document.addEventListener('DOMContentLoaded', async () => {
    await showMaps();
    window.updateMapsTheme();
});