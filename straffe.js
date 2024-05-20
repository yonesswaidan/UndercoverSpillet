document.addEventListener('DOMContentLoaded', () => {
    fetch('punishments.json') // Indlæs JSON-filen med konsekvenser
        .then(response => response.json())
        .then(punishments => {
            const selectedPunishments = getRandomPunishments(punishments, 5); // Vælg fem tilfældige konsekvenser
            const cardSelection = document.querySelector('.card-selection');
            
            // Funktion til at afsløre straffen ved klik
            function revealPunishment(event) {
                const card = event.target;
                const index = Array.from(cardSelection.children).indexOf(card);
                if (selectedPunishments[index]) {
                    card.textContent = selectedPunishments[index];
                    card.removeEventListener('click', revealPunishment);
                }
            }
            
            // Opret kortene og tilføj event listeners
            selectedPunishments.forEach((punishment, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.textContent = `Vælg straf`;
                card.addEventListener('click', revealPunishment);
                cardSelection.appendChild(card);
            });
        })
        .catch(error => console.error('Fejl: Kunne ikke indlæse konsekvenserne', error));

    // Funktion til at vælge et tilfældigt antal konsekvenser fra listen
    function getRandomPunishments(punishments, num) {
        const shuffledPunishments = punishments.sort(() => Math.random() - 0.5); // Bland konsekvenserne
        return shuffledPunishments.slice(0, num); // Returner det ønskede antal konsekvenser
    }
});
