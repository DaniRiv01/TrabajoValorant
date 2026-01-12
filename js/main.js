fetch('https://valorant-api.com/v1/agents')
    .then(agents => agents.json())
    .then(data => {
        const div = document.querySelector('#agentesContainer');
        const agentesArray = data.data;

        agentesArray.forEach(agente => {
            const img = document.createElement('img');

            img.src = agente.displayIcon;
            div.appendChild(img);
        });
    });

fetch('https://valorant-api.com/v1/weapons')
    .then(encabezado => encabezado.json())
    .then(objeto => {
        const armas = objeto.data;
        const divArmas = document.querySelector('#armasContainer');
        let i = 0;

        armas.forEach(arma => {
            const skinsContainer = document.createElement('div');
            const img = document.createElement('img');
            const j = i;

            img.src = arma.displayIcon;
            skinsContainer.id = 'skinsContainer' + i;

            divArmas.appendChild(img);
            divArmas.appendChild(skinsContainer);

            img.addEventListener('click', () => {
                const containerActual = document.querySelector('#skinsContainer' + j);
                const skins = arma.skins;

                containerActual.innerHTML = '';

                skins.forEach(skin => {
                    const skinImg = document.createElement('img');

                    if (skin.displayIcon) {
                        skinImg.src = skin.displayIcon;
                        skinImg.style.width = '100px';
                        skinImg.style.margin = '5px';

                        containerActual.appendChild(skinImg);
                    }

                });
            });

            i++;
        });
    });

