const API_URL = 'https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/';

const fetchAndRenderRoster = async () => {
    try {
        // Simulating the fetched player data from the API along with the provided player objects
        const playersFromAPI = await fetch(API_URL + 'players').then(response => response.json());
        const additionalPlayers = [
            {
                "id": 2,
                "name": "Crumpet",
                "breed": "American Staffordshire Terrier",
                "status": "field",
                "imageUrl": "http://r.ddmcdn.com/w_1012/s_f/o_1/cx_0/cy_0/cw_1012/ch_1518/APL/uploads/2019/12/Crumpet-PBXVI.jpg",
                "createdAt": "2021-06-15T16:21:14.103Z",
                "updatedAt": "2021-06-15T16:21:14.103Z",
                "teamId": 1,
                "cohortId": 1
            },
            {
                "id": 4,
                "name": "Daphne",
                "breed": "German Shepherd",
                "status": "field",
                "imageUrl": "http://r.ddmcdn.com/w_960/s_f/o_1/cx_25/cy_0/cw_960/ch_1440/APL/uploads/2020/01/Daphne-PBXVI.jpg",
                "createdAt": "2021-06-15T16:21:14.103Z",
                "updatedAt": "2021-06-15T16:21:14.103Z",
                "teamId": 2,
                "cohortId": 1
            },
            {
                "id": 10,
                "name": "Kenny",
                "breed": "Golden Retriever / Boxer",
                "status": "bench",
                "imageUrl": "http://r.ddmcdn.com/w_1012/s_f/o_1/cx_0/cy_0/cw_1012/ch_1518/APL/uploads/2019/12/Kenny-PBXVI.jpg",
                "createdAt": "2021-06-15T16:21:14.103Z",
                "updatedAt": "2021-06-15T16:21:14.103Z",
                "teamId": 2,
                "cohortId": 1
            }
        ];

        const players = [...playersFromAPI, ...additionalPlayers]; // Combine fetched players with additional players

        const rosterContainer = document.getElementById('roster-container');
        rosterContainer.innerHTML = ''; // Clear previous content

        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');
            playerCard.innerHTML = `
                <p>Name: ${player.name}</p>
                <p>Breed: ${player.breed}</p>
                <button onclick="viewPlayerDetails(${player.id})">View Details</button>
            `;
            rosterContainer.appendChild(playerCard);
        });
    } catch (error) {
        console.error('Error fetching player details:', error);
    }
};

const viewPlayerDetails = async (playerId) => {
    try {
        const response = await fetch(API_URL + 'players/' + playerId);
        const player = await response.json();
        const playerDetailsContainer = document.getElementById('player-details-container');
        playerDetailsContainer.innerHTML = `
            <h2>${player.name}</h2>
            <p>Breed: ${player.breed}</p>
            <p>Status: ${player.status}</p>
            <img src="${player.imageUrl}" alt="${player.name}">
        `;
        playerDetailsContainer.style.display = 'block';
    } catch (error) {
        console.error('Error fetching player details:', error);
    }
};

const addNewPlayer = async (event) => {
    event.preventDefault();
    const playerName = document.getElementById('playerName').value;
    const playerBreed = document.getElementById('playerBreed').value;

    try {
        const response = await fetch(API_URL + 'players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: playerName, breed: playerBreed }),
        });

        if (response.ok) {
            await fetchAndRenderRoster(); // Refresh roster on successful addition
            document.getElementById('add-player-form').reset();
        } else {
            console.error('Failed to add player');
        }
    } catch (error) {
        console.error('Error adding player:', error);
    }
};

// Initial rendering of roster and setting up form submission
fetchAndRenderRoster();

const addPlayerForm = document.getElementById('add-player-form');
addPlayerForm.addEventListener('submit', addNewPlayer);
