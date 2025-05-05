const input = document.querySelector('.city-input');
const guessCountText = document.querySelector('.guess-count');
const scoreText = document.querySelector('.score');
const roundText = document.querySelector('.round');

let cities = JSON.parse(localStorage.getItem('cities'));
let ansId = Number(localStorage.getItem('ansId'));
let totalScore = Number(localStorage.getItem('totalScore'));
let roundCount = Number(localStorage.getItem('roundCount'));
let guessCount = 0;
let roundScore = 5000;

scoreText.innerHTML = totalScore;
roundText.innerHTML = roundCount;

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const name = input.value.trim().toLowerCase();
        const city = cities.find(c => c.city.toLowerCase() === name);

        if (city) {
            guessCount++;
            addRow(city.id - 1);
            guessCountText.innerHTML = 5 - guessCount;
            input.value = '';
        } else {
            alert('Datubāzē nav šāda pilsēta')
        }
    }
});


function addRow(guess_id) {
    let regionClass = 'incorrect-region';
    let countyClass = 'incorrect-county';
    let populationSymbol = '';
    let [x1, y1] = cities[ansId]['coordinates'].split(', ').map(Number);
    let [x2, y2] = cities[guess_id]['coordinates'].split(', ').map(Number);
    let distance = Math.round(getDistance(x1,y1,x2,y2), 0) + ' km';
    
    if (guess_id === ansId) {
        totalScore += roundScore
        saveAfterGuess();
        return;
    }

    roundScore = roundScore - 500 * guessCount * 0.8;

    if (guessCount === 5) {
        roundScore=0
        saveAfterGuess();
    }


    if (cities[guess_id]['region_name'] === cities[ansId]['region_name']) {
        regionClass = 'correct-region'
    }
    if (cities[guess_id]['county_name'] === cities[ansId]['county_name']) {
        countyClass = 'correct-county'
    }
    if (cities[guess_id]['population'] > cities[ansId]['population']) {
        populationSymbol = '🡻'
    } else if (cities[guess_id]['population'] < cities[ansId]['population']) {
        populationSymbol = '🡹';
    } else { populationSymbol = '' }

    const newRow = document.createElement("div");
    newRow.classList.add("guess-row");
    newRow.innerHTML = `
            <div class="minejums">${cities[guess_id]['city']}</div>
            <div class='${regionClass}'>${cities[guess_id]['region_name']}</div>
            <div class='${countyClass}'>${cities[guess_id]['county_name']}</div>
            <div>${cities[guess_id]['population']} ${populationSymbol}</div>
            <div>${distance}</div>
        `;
    document.querySelector(".guesses-table").prepend(newRow);
}


function saveAfterGuess() {
    roundCount++;
    localStorage.setItem('totalScore', totalScore)
    localStorage.setItem('roundCount', roundCount)
    localStorage.setItem('roundScore', roundScore)
    window.location.href = "/correctGuess";
}

function getDistance(lat1, lon1, lat2, lon2) {
    const toRad = angle => angle * Math.PI / 180;
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
  
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
  
    const distance = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return distance; 
  }