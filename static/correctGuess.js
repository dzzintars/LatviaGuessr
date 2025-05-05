const cityTitle = document.querySelector('.city-title');
const score = document.querySelector('.correct-score');
const nxtRoundBtn = document.querySelector('.round-button');
const cityDesc = document.querySelector('.city-desc');
const cityMap = document.querySelector('.map');
const correctImage = document.querySelector('.correct-img');

let roundCount = Number(localStorage.getItem('roundCount'));
let roundScore = Number(localStorage.getItem('roundScore'));
let ansId = localStorage.getItem('ansId');
let cities = JSON.parse(localStorage.getItem('cities'));



let [y, x] = cities[ansId]['coordinates'].split(', ').map(Number);

cityDesc.innerHTML = cities[ansId]['description']
cityMap.src = `https://www.openstreetmap.org/export/embed.html?bbox=${x - 0.06}%2C${y - 0.06}%2C${x + 0.06}%2C${y + 0.06}&layer=mapnik&marker=${y}%2C${x}`
correctImage.src = 'static/images/cities/' + cities[ansId]['picture']

link = '/game'

if (roundCount === 4) {
    nxtRoundBtn.innerHTML = '<span class="flip-text">Rezultāts</span>';
    link = '/results'
    nxtRoundBtn.onclick = function () {
        window.location.href = link;
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        window.location.href = link;
    }
});

cityTitle.innerHTML = cities[ansId]['city'];
score.innerHTML = roundScore;
