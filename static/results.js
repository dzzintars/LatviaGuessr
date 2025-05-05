const scoreTxt = document.querySelector('.result-score');
const resultsTitle = document.querySelector('.results-title');

let totalScore = Number(localStorage.getItem('totalScore'));

if (totalScore >= 13800) {
    resultsTitle.innerHTML = 'Ģeogrāfijas Karalis'
} else if (totalScore >= 11000) {
    resultsTitle.innerHTML = 'Izcilais ģeogrāfs';
} else if (totalScore >= 6000) {
    resultsTitle.innerHTML = 'Latvijas entuziasts';
} else {
    resultsTitle.innerHTML = 'Ģeogrāfijas iesācējs';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        window.location.href = '/';
    }
});

scoreTxt.innerHTML = totalScore;