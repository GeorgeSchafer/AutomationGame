const ELEMENTS = {
    score    : document.getElementById('point-total'),
    pointsDiv: document.querySelector('#points-div'),
    button   :null,
    challenge:null
}

const PLAYER = {
    score: 0
}

const challenges = [
    `<p>Click the button</p><input type="button" id="btn" value="Button" />`
]

let countdown = setCountdown(10)

export function setCountdown(max) {
    return Math.floor(Math.random() * max)+1;
}
  
export function createChallenge(challengeIndex) {
    ELEMENTS.challenge = document.createElement('div');

    ELEMENTS.challenge.className = 'challenge';
    ELEMENTS.challenge.innerHTML = challenges[challengeIndex];
    document.body.insertBefore(ELEMENTS.challenge, ELEMENTS.pointsDiv);
    ELEMENTS.button = document.querySelector('.challenge');
    ELEMENTS.button.addEventListener('click', () => clickedTheButton());
  }
  
function clickedTheButton() {
    if (countdown == 1) {
       ELEMENTS.challenge.parentNode.removeChild(ELEMENTS.challenge);
    }

    countdown--;
    incrementScore(1);
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