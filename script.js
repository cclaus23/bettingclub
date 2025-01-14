// Fetch and display bets
function loadBets() {
  fetch('bets.json')
    .then(response => response.json())
    .then(bets => displayBets(bets))
    .catch(error => console.error('Error loading bets:', error));
}

// Display bets on the page
function displayBets(bets) {
  const betList = document.querySelector('.bet-list');
  betList.innerHTML = ""; // Clear previous content

  bets.forEach(bet => {
    const betCard = document.createElement('div');
    betCard.className = 'bet-card';
    betCard.innerHTML = `
      <h3>${bet.title}</h3>
      <p>Creator: ${bet.creator}</p>
      <p>Total Yes: $${bet.totalBetAmount.Yes} | Total No: $${bet.totalBetAmount.No}</p>
    `;
    betList.appendChild(betCard);
  });
}

// Create a new bet
function createBet() {
  const betTitle = document.getElementById('bet-title').value;
  if (!betTitle) {
    alert('Please enter a bet title.');
    return;
  }

  // Add new bet to the list
  const newBet = {
    id: Date.now().toString(),
    title: betTitle,
    creator: "Admin",
    totalBetAmount: { Yes: 0, No: 0 },
    participants: { Yes: [], No: [] }
  };

  alert('New bet created! (But this demo cannot save it to the JSON file.)');
}

// Event listeners
document.getElementById('create-bet-button').addEventListener('click', createBet);

// Initialize
loadBets();
