const cityTitle = document.querySelector('.city-title');
const score = document.querySelector('.correct-score');
const nxtRoundBtn = document.querySelector('.round-button');


let roundCount = Number(localStorage.getItem('roundCount'));
let ansId = localStorage.getItem('ansId');
let cities = JSON.parse(localStorage.getItem('cities'));
let totalScore = Number(localStorage.getItem('totalScore'));

if (roundCount === 4){
    nxtRoundBtn.innerHTML = 'Rezultāts';
    nxtRoundBtn.onclick = function(){
        window.location.href='/results';
    }
}

cityTitle.innerHTML = cities[ansId]['city'];
score.innerHTML = totalScore;
