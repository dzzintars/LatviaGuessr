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
                guessCountText.innerHTML = 5-guessCount;
                input.value = '';
            } else {
                console.log('nav pilsēta tāda')
            }
        }
    });


    function addRow(guess_id) {
        let regionClass = 'incorrect-region';
        let countyClass = 'incorrect-county';
        let populationSymbol = '';

        if (guess_id === ansId) {
            totalScore += roundScore
            roundCount++;
            localStorage.setItem('totalScore', totalScore)
            localStorage.setItem('roundCount', roundCount)
            window.location.href = "/correctGuess";
            return;
        }

        roundScore = roundScore - 500*guessCount*0.8; 

        if (guessCount === 5){
            roundCount++;
            localStorage.setItem('roundCount', roundCount)
            window.location.href = "/correctGuess";
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
            <div>🧭</div>
        `;
        document.querySelector(".guesses-table").prepend(newRow);
    }