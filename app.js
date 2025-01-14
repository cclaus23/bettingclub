document.addEventListener('DOMContentLoaded', () => {
    const createBetBtn = document.getElementById('create-bet-btn');
    const adminBtn = document.getElementById('admin-btn');
    const betsContainer = document.getElementById('bets-container');

    // Load existing bets from localStorage
    const bets = JSON.parse(localStorage.getItem('bets')) || [];

    // Render bets on page load
    renderBets(bets);

    // Create new bet
    createBetBtn.addEventListener('click', () => {
        const title = prompt('Enter the bet title:');
        const creator = prompt('Enter your name:');

        if (title && creator) {
            const newBet = {
                id: `bet-${Date.now()}`,
                title,
                creator,
                choices: ['Yes', 'No'],
                participants: [],
            };
            bets.push(newBet);
            localStorage.setItem('bets', JSON.stringify(bets));
            renderBets(bets);
            alert('Bet created successfully!');
        } else {
            alert('Bet creation failed. Both fields are required.');
        }
    });

    // Navigate to admin portal
    adminBtn.addEventListener('click', () => {
        window.location.href = 'admin.html';
    });

    // Render bets function
    function renderBets(bets) {
        betsContainer.innerHTML = '';
        bets.forEach(bet => {
            const betCard = document.createElement('div');
            betCard.className = 'bet-card';
            betCard.innerHTML = `
                <h3>${bet.title}</h3>
                <p>Created by: ${bet.creator}</p>
                <button onclick="placeBet('${bet.id}')">Place Bet</button>
            `;
            betsContainer.appendChild(betCard);
        });
    }

    // Global placeBet function
    window.placeBet = function(betId) {
        // Get the bet object from localStorage
        const bets = JSON.parse(localStorage.getItem('bets')) || [];
        const bet = bets.find(b => b.id === betId);

        if (!bet) {
            alert('Bet not found!');
            return;
        }

        // Prompt user for their name and bet amount
        const name = prompt('Enter your name:').trim();
        const amount = parseFloat(prompt('Enter your bet amount:'));

        if (!name || isNaN(amount) || amount <= 0) {
            alert('Invalid name or bet amount. Please try again.');
            return;
        }

        // Prompt user to choose between "Yes" or "No"
        const choice = prompt(`Enter your choice (Yes/No):`).trim();

        if (!bet.choices.includes(choice)) {
            alert('Invalid choice. Please select "Yes" or "No".');
            return;
        }

        // Store the bet details under the chosen option
        if (!bet.participants[choice]) {
            bet.participants[choice] = [];
        }

        bet.participants[choice].push({ name, amount });

        // Update the bet in localStorage
        localStorage.setItem('bets', JSON.stringify(bets));

        alert(`You placed a bet of $${amount} on ${choice}.`);
    }
});
