document.addEventListener('DOMContentLoaded', () => {
    const numPlayersInput = document.getElementById('numPlayers');
    const numUndercoversInput = document.getElementById('numUndercovers');
    const startSetupBtn = document.getElementById('startSetupBtn');
    const playerNameInputsContainer = document.getElementById('playerNameInputs');

    startSetupBtn.addEventListener('click', () => {
        const numPlayers = parseInt(numPlayersInput.value, 10);
        const numUndercovers = parseInt(numUndercoversInput.value, 10);

        if (numUndercovers > numPlayers) {
            alert('Antallet af undercovers kan ikke være større end antallet af spillere.');
            return;
        }

        playerNameInputsContainer.innerHTML = ''; // Nulstil spillernavn-inputfelter

        for (let i = 1; i <= numPlayers; i++) {
            const playerNameInput = document.createElement('input');
            playerNameInput.type = 'text';
            playerNameInput.placeholder = `Navn for Spiller ${i}`;
            playerNameInputsContainer.appendChild(playerNameInput);
        }

        const startGameBtn = document.createElement('button');
        startGameBtn.textContent = 'Start spillet';
        startGameBtn.addEventListener('click', () => {
            const playerNames = Array.from(playerNameInputsContainer.querySelectorAll('input')).map(input => input.value.trim());
            const incompleteNames = playerNames.some(name => name === '');
            if (incompleteNames) {
                alert('Venligst indtast navn for alle spillere.');
                return;
            }

            const playerNamesParam = encodeURIComponent(JSON.stringify(playerNames));
            window.location.href = `shuffle.html?numPlayers=${numPlayers}&numUndercovers=${numUndercovers}&playerNames=${playerNamesParam}`;
        });

        playerNameInputsContainer.appendChild(startGameBtn);
        playerNameInputsContainer.style.display = 'block'; // Vis spillernavn-inputfelter
    });
});
