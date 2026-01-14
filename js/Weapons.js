async function showWeapons() {
    const div = document.querySelector('#weaponsContainer');
    if (!div) return;
    div.innerHTML = "";
    try {
        const res = await fetch('https://valorant-api.com/v1/weapons');
        const data = await res.json();
        data.data.forEach(weapon => {
            const card = document.createElement('div');
            card.className = "weapon-card w-32 md:w-36 rounded-lg backdrop-blur-md shadow-lg overflow-hidden flex flex-col items-center cursor-pointer animate-fadeUp transition-all duration-300 hover:scale-105";
            card.dataset.id = weapon.uuid;
            card.innerHTML = `
                <img src="${weapon.displayIcon}" class="max-w-full h-auto object-contain p-3 pointer-events-none">
                <p class="text-sm text-center font-semibold pb-3 px-2 break-words uppercase">${weapon.displayName}</p>
            `;
            card.onclick = () => showWeaponDetails(weapon);
            div.appendChild(card);
        });
    } catch (e) { console.error(e); }
}

function showWeaponDetails(weapon) {
    const isLight = document.body.classList.contains('light-mode');
    const left = document.querySelector('#left');
    if (left) { left.classList.remove('hidden'); left.classList.add('flex'); }

    document.querySelector('#nameWeaponContainer').innerHTML = `<h2 class="text-4xl md:text-8xl font-bold uppercase ${isLight ? 'text-black' : 'text-white'}">${weapon.displayName}</h2>`;
    document.querySelector('#imageWeaponContainer').innerHTML = `<img src="${weapon.displayIcon}" class="max-h-[50vh] object-contain drop-shadow-2xl">`;
    
    const category = weapon.shopData ? weapon.shopData.categoryText : "";
    document.querySelector('#descriptionWeaponContainer').innerHTML = `<p class="text-lg ${isLight ? 'text-slate-800' : 'text-gray-300'}">${category}</p>`;

    const skinsContainer = document.querySelector('#skinsSelectedContainer');
    if (skinsContainer) {
        skinsContainer.innerHTML = '';
        const allDiv = document.createElement('div');
        allDiv.className = 'flex flex-wrap gap-2 justify-center mt-4 overflow-y-auto max-h-[40vh]';
        weapon.skins.forEach(skin => {
            if (!skin.displayIcon) return;
            const thumb = document.createElement('img');
            thumb.src = skin.displayIcon;
            thumb.className = 'w-24 h-auto m-1 cursor-pointer object-contain grayscale hover:grayscale-0 transition-all';
            thumb.onclick = () => {
                document.querySelector('#imageWeaponContainer img').src = skin.displayIcon;
            };
            allDiv.appendChild(thumb);
        });
        skinsContainer.appendChild(allDiv);
    }
}

window.updateWeaponsTheme = function() {
    const isLight = document.body.classList.contains('light-mode');
    document.querySelectorAll('.weapon-card').forEach(card => {
        card.classList.toggle('bg-white/90', isLight);
        card.classList.toggle('border', isLight);
        card.classList.toggle('bg-gray-800/80', !isLight);
        const p = card.querySelector('p');
        if (p) p.className = `text-sm text-center font-semibold pb-3 px-2 uppercase ${isLight ? 'text-black' : 'text-white'}`;
    });
    const detName = document.querySelector('#nameWeaponContainer h2');
    if (detName) detName.className = `text-4xl md:text-8xl font-bold uppercase ${isLight ? 'text-black' : 'text-white'}`;
    const detDesc = document.querySelector('#descriptionWeaponContainer p');
    if (detDesc) detDesc.className = `text-lg ${isLight ? 'text-slate-800' : 'text-gray-300'}`;
};

document.addEventListener('DOMContentLoaded', async () => {
    await showWeapons();
    window.updateWeaponsTheme();
});