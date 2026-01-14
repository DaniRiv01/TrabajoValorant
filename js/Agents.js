async function showAgents() {
    const div = document.querySelector('#agentsContainer');
    if (!div) return;
    div.innerHTML = "";
    try {
        const res = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
        const data = await res.json();
        data.data.forEach(agente => {
            const card = document.createElement('div');
            card.className = "agent-card w-32 md:w-36 rounded-lg backdrop-blur-md shadow-lg overflow-hidden flex flex-col items-center cursor-pointer animate-fadeUp transition-all duration-300 hover:scale-105";
            card.dataset.id = agente.uuid;
            card.innerHTML = `
                <img src="${agente.displayIcon}" class="max-w-full h-auto object-contain p-3 pointer-events-none">
                <p class="text-sm text-center font-semibold pb-3 px-2 break-words uppercase">${agente.displayName}</p>
            `;
            card.onclick = () => showAgentDetails(agente);
            div.appendChild(card);
        });
    } catch (e) { console.error(e); }
}

function showAgentDetails(agente) {
    const isLight = document.body.classList.contains('light-mode');
    const left = document.querySelector('#left');
    if (left) { left.classList.remove('hidden'); left.classList.add('flex'); }
    
    document.querySelector('#nameAgentContainer').innerHTML = `<h2 class="text-4xl md:text-8xl font-bold uppercase ${isLight ? 'text-black' : 'text-white'}">${agente.displayName}</h2>`;
    document.querySelector('#imageAgentContainer').innerHTML = `<img src="${agente.fullPortrait}" class="max-h-[55vh] object-contain drop-shadow-2xl">`;
    document.querySelector('#descriptionAgentContainer').innerHTML = `<p class="text-lg ${isLight ? 'text-slate-800' : 'text-gray-300'}">${agente.description}</p>`;
}

window.updateAgentsTheme = function() {
    const isLight = document.body.classList.contains('light-mode');
    document.querySelectorAll('.agent-card').forEach(card => {
        card.classList.toggle('bg-white/90', isLight);
        card.classList.toggle('border', isLight);
        card.classList.toggle('bg-gray-800/80', !isLight);
        const p = card.querySelector('p');
        if (p) p.className = `text-sm text-center font-semibold pb-3 px-2 uppercase ${isLight ? 'text-black' : 'text-white'}`;
    });
    const detName = document.querySelector('#nameAgentContainer h2');
    if (detName) detName.className = `text-4xl md:text-8xl font-bold uppercase ${isLight ? 'text-black' : 'text-white'}`;
    const detDesc = document.querySelector('#descriptionAgentContainer p');
    if (detDesc) detDesc.className = `text-lg ${isLight ? 'text-slate-800' : 'text-gray-300'}`;
};

document.addEventListener('DOMContentLoaded', async () => {
    await showAgents();
    window.updateAgentsTheme();
});