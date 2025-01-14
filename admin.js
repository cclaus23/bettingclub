document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back-btn');
    const clearBetsBtn = document.getElementById('clear-bets-btn');
    const adminContainer = document.getElementById('admin-container');

    // Load bets
    const bets = JSON.parse(localStorage.getItem('bets')) || [];
    renderAdminBets(bets);

    // Navigate back to the main page
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Clear all bets
    clearBetsBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all bets?')) {
            localStorage.removeItem('bets');
            renderAdminBets([]);
            alert('All bets cleared!');
        }
    });

    // Render bets for admin
    function renderAdminBets(bets) {
        adminContainer.innerHTML = '';
        if (bets.length === 0) {
            adminContainer.innerHTML = '<p>No bets available.</p>';
            return;
        }

        bets.forEach(bet => {
            const adminRow = document.createElement('div');
            adminRow.className = 'admin-bet-row';
            adminRow.innerHTML = `
                <p>${bet.title}</p>
                <button onclick="endBet('${bet.id}')">End Bet</button>
            `;
            adminContainer.appendChild(adminRow);
        });
    }
});

// End a bet (example function for admin page)
function endBet(betId) {
    const bets = JSON.parse(localStorage.getItem('bets')) || [];
    const updatedBets = bets.filter(bet => bet.id !== betId);
    localStorage.setItem('bets', JSON.stringify(updatedBets));
    alert(`Bet with ID: ${betId} has been ended.`);
    location.reload();
}
