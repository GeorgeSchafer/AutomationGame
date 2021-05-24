const elements = {
    score: document.getElementById('point-total'),
    pointsDiv: document.querySelector('#points-div'),
    challenge: null
};

const player = {
    score: 0
};

const challenges = [
    // [0]
    `<p>Click the button</p><input type="button" id="btn" value="Button" />`,
    // [1]
    `<p>Check the box, then click the button.</p><input type="checkbox" id="checkbox" /><input type="button" id="btn" value="Button" />`,
    `<p>Check all the boxes, then click the button.</p><p><input type="checkbox" id="checkbox1" /><input type="checkbox" id="checkbox2" /><input type="checkbox" id="checkbox3" /></p><input type="button" id="btn" value="Button" />`
];

let countdownMax = 3;
let countdown = setCountdown(countdownMax);

export function setCountdown(max) {
  return Math.floor(Math.random() * max)+1;
}

export function getChallengeInteger(){
  return Math.floor(Math.random() * 3);
}
  
export function createChallenge(challengeIndex) {
  elements.challenge = document.createElement('div');
  elements.challenge.className = 'challenge';
  elements.challenge.innerHTML = challenges[challengeIndex];
  document.body.insertBefore(elements.challenge, elements.pointsDiv);
  
  if(challengeIndex == 0){
    elements.button = document.querySelector('.challenge');

    elements.button.addEventListener('click', () => clickedTheButton());
  } else if(challengeIndex == 1){
    elements.button = document.querySelector('#btn');
    elements.checkbox = document.querySelector('#checkbox');

    elements.button.addEventListener('click', () => checkBoxThenClickTheButton());
  } else if (challengeIndex == 2){
    elements.button = document.querySelector('#btn');
    elements.checkbox1 = document.querySelector('#checkbox1');
    elements.checkbox2 = document.querySelector('#checkbox2');
    elements.checkbox3 = document.querySelector('#checkbox3');
    
    elements.button.addEventListener('click',() => checkBoxesThenClickTheButton());
  }
}

function clickedTheButton() {
  countdown--;
  incrementScore(1);

  if (countdown <= 1) {
    elements.challenge.parentNode.removeChild(elements.challenge);
    delete elements.button;
    countdown = setCountdown(countdownMax);
  }
}

function checkBoxThenClickTheButton(){
  if(elements.checkbox.checked){
    countdown--;
    console.log(countdown);
    incrementScore(1);
  }

  if (countdown <= 1) {
    elements.challenge.parentNode.removeChild(elements.challenge);
    delete elements.button;
    delete elements.checkbox;
    countdown = setCountdown(countdownMax);
  }

  elements.checkbox.checked = false;
}

function checkBoxesThenClickTheButton(){
  if(elements.checkbox1.checked && elements.checkbox2.checked && elements.checkbox3.checked ){
    countdown--;
    console.log(countdown);
    incrementScore(1);
  }

  if (countdown <= 1) {
    elements.challenge.parentNode.removeChild(elements.challenge);
    delete elements.button;
    delete elements.checkbox1;
    delete elements.checkbox2;
    delete elements.checkbox3;
    countdown = setCountdown(countdownMax);
  }

  elements.checkbox1.checked = false;
  elements.checkbox2.checked = false;
  elements.checkbox3.checked = false;
}
  
function getScore() {
  let score = localStorage.getItem('score');

  if (score !== null) {
      player.score = parseInt(score);
      return player.score;
  } else {
      return 0;
  }
}
  
export function setScore() {
  elements.score.innerText = getScore();
}
  
function incrementScore(addedScore) {
  player.score += addedScore;
  localStorage.setItem('score', player.score);
  elements.score.innerText = player.score;
}

export function generateChallenge(){
  if(document.querySelector('.challenge') == null){
    createChallenge(getChallengeInteger())
  }
}