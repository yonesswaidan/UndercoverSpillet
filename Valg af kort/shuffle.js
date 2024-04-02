document.addEventListener('DOMContentLoaded', () => {
    let playerCardMapping = {};
    let currentPlayerIndex = -1; // Start med -1 så første spiller starter korrekt

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCardButton(card) {
        const cardButton = document.createElement('button');
        cardButton.textContent = "Vælg et kort"; // Standardtekst
        cardButton.classList.add('card');
        cardButton.setAttribute('data-card', card);
        return cardButton;
    }

    function updateHeaderForNextPlayer(playerNames) {
        currentPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
        const header = document.querySelector('header');
        header.innerHTML = `<h1>${playerNames[currentPlayerIndex]}, vælge et kort</h1>`;
    }

    function cardSelected(card, playerNames) {
        const playerName = playerNames[currentPlayerIndex];
        playerCardMapping[playerName] = playerCardMapping[playerName] || [];
        playerCardMapping[playerName].push(card);
    
        // Vis en pop-up-skærm med valgt kortinformation
        alert(`${playerName} har trukket: ${card}`);
    
        updateHeaderForNextPlayer(playerNames);
    
        if (Object.keys(playerCardMapping).length === playerNames.length) {
            sessionStorage.setItem('playerCardMapping', JSON.stringify(playerCardMapping));
            // Omdiriger til hjul.html og send kun spillerens navne
            const playerNamesParam = encodeURIComponent(JSON.stringify(playerNames));
            window.location.href = `hjul.html?playerNames=${playerNamesParam}`;
        }
    }

    function startCardSelection(numPlayers, playerNames, numUndercovers, words) {
        const cardSelection = document.querySelector('.card-selection');
        
        let cards = new Array(numUndercovers).fill("Mr. White").concat(new Array(numPlayers - numUndercovers).fill(words[Math.floor(Math.random() * words.length)]));
        
        shuffleArray(cards);

        updateHeaderForNextPlayer(playerNames);

        cards.forEach((card) => {
            const cardButton = createCardButton(card);
            cardSelection.appendChild(cardButton);
            cardButton.addEventListener('click', function() {
                cardSelected(this.getAttribute('data-card'), playerNames);
                this.remove();
            });
        });
    }

    function initGameFromURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const numPlayers = parseInt(urlParams.get('numPlayers'), 10);
        const numUndercovers = parseInt(urlParams.get('numUndercovers'), 10);
        const playerNames = JSON.parse(urlParams.get('playerNames') || '[]');

        if (!isNaN(numPlayers) && Array.isArray(playerNames) && playerNames.length === numPlayers && !isNaN(numUndercovers)) {
            fetch('words.json')
                .then(response => response.json())
                .then(words => {
                    startCardSelection(numPlayers, playerNames, numUndercovers, words);
                })
                .catch(error => console.error('Fejl ved indlæsning af ordene:', error));
        } else {
            console.error('Fejl: Ugyldige spillerdetaljer i URL-parametrene.');
        }
    }

    initGameFromURLParams();
});
