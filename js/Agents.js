// Función principal para mostrar los agentes
async function showAgents() {
    const div = document.querySelector('#agentsContainer');
    div.innerHTML = "";

    try {
        const res = await fetch('https://valorant-api.com/v1/agents');
        const data = await res.json();
        const agentesArray = data.data;

        agentesArray.forEach(agente => {
            const card = document.createElement('div');
            card.className = `
                w-32 md:w-36
                bg-gray-800 bg-opacity-80
                rounded-lg shadow-lg
                overflow-hidden
                flex flex-col items-center
                cursor-pointer
                transition transform duration-300
                hover:scale-105 hover:shadow-2xl
            `;

            const img = document.createElement('img');
            img.src = agente.displayIcon;
            img.alt = agente.displayName;
            img.className = `
                max-w-full h-auto
                object-contain p-3
            `;

            const name = document.createElement('p');
            name.textContent = agente.displayName;
            name.className = `
                text-sm text-center text-white
                font-semibold pb-3 px-2
                break-words
            `;

            card.addEventListener('click', () => {
                showAgentDetails(agente);
            });

            card.appendChild(img);
            card.appendChild(name);
            div.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando agentes:", error);
    }
}
function showAgentDetails(agente) {

    document.querySelector('#nameAgentContainer').innerHTML = `
        <h1 class="text-4xl font-bold text-white mb-4">
            ${agente.displayName}
        </h1>
    `;

    document.querySelector('#imageAgentContainer').innerHTML = `
        <img src="${agente.fullPortrait}" 
             class="max-w-full h-auto object-contain">
    `;

    document.querySelector('#descriptionAgentContainer').innerHTML = `
        <p class="text-gray-300 break-words whitespace-normal">
            ${agente.description}
        </p>
    `;
}
document.addEventListener('DOMContentLoaded', async () => {
    await showAgents();
});
