const ELEMENTS = {
    score    : document.getElementById('point-total'),
    pointsDiv: document.querySelector('#points-div'),
    challenge:null
}

const PLAYER = {
    score: 0
}

const challenges = [
    // [0]
    `<p>Click the button</p><input type="button" id="btn" value="Button" />`,
    // [1]
    `<p>Check the box, then click the button.</p><input type="checkbox" id="checkbox" /><input type="button" id="btn" value="Button" />`
]

let countdownMax = 3;
let countdown = setCountdown(countdownMax)

export function setCountdown(max) {
  return Math.floor(Math.random() * max)+1;
}

export function getChallengeInteger(){
  return Math.floor(Math.random() * 2);
}
  
export function createChallenge(challengeIndex) {
  ELEMENTS.challenge = document.createElement('div');
  ELEMENTS.challenge.className = 'challenge';
  ELEMENTS.challenge.innerHTML = challenges[challengeIndex];
  document.body.insertBefore(ELEMENTS.challenge, ELEMENTS.pointsDiv);
  
  if(challengeIndex == 0){
    ELEMENTS.button = document.querySelector('.challenge');

    ELEMENTS.button.addEventListener('click', () => clickedTheButton());
  } else if(challengeIndex == 1){
    ELEMENTS.button = document.querySelector('#btn');
    ELEMENTS.checkbox = document.querySelector('#checkbox');

    ELEMENTS.button.addEventListener('click', () => checkBoxThenClickTheButton());
  }
}

function clickedTheButton() {
  if (countdown <= 1) {
    ELEMENTS.challenge.parentNode.removeChild(ELEMENTS.challenge);
    delete ELEMENTS.button;
    countdown = setCountdown(countdownMax);
  }

  countdown--;
  incrementScore(1);
}

function checkBoxThenClickTheButton(){
  if (countdown <= 1) {
    ELEMENTS.challenge.parentNode.removeChild(ELEMENTS.challenge);
    delete ELEMENTS.button;
    delete ELEMENTS.checkbox;
    countdown = setCountdown(countdownMax);
  }

  if(ELEMENTS.checkbox.checked){
    countdown--;
    console.log(countdown);
    incrementScore(1);
  }

  ELEMENTS.checkbox.checked = false;
}
  
function getScore() {
  let score = localStorage.getItem('score');

  if (score !== null) {
      PLAYER.score = parseInt(score);
      return PLAYER.score;
  } else {
      return 0;
  }
}
  
export function setScore() {
  ELEMENTS.score.innerText = getScore();
}
  
function incrementScore(addedScore) {
  PLAYER.score += addedScore;
  localStorage.setItem('score', PLAYER.score);
  ELEMENTS.score.innerText = PLAYER.score;
}