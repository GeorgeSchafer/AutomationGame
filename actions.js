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
    `<p>Click the button</p>
    <div><input type="button" id="btn" value="Button" /></div>`,
    // [1]
    `<p>Check the box, then click the button.</p>
    <div class="task">
      <input type="checkbox" id="checkbox" />
    </div>
    <div><input type="button" id="btn" value="Button" /></div>`,
    // [2]
    `<p>Check all the boxes, then click the button.</p>
    <div class="task">
      <input type="checkbox" id="checkbox1" />
      <input type="checkbox" id="checkbox2" />
      <input type="checkbox" id="checkbox3" />
    </div>
    <div>
      <input type="button" id="btn" value="Button" />
    </div>`,
    // [3]
    `<p>Type friend, then click the button.</p>
    <div class="task">
      <input type="text" id="typingTest" />
    </div>
    <div>
      <input type="button" id="btn" value="Button" />
    </div>`,
    // [4]
    `<p>Type the code, then click the button</p>
    <div class="task">
      <p>${generateRandomString()}<p>
      <div>
        <input type="text" id="typingTest" />
      </div>
    </div>
    <div>
      <input type="button" id="btn" value="Button" />
    </div>`
];

const countdownFrom = 3;
let countdown = setCountdown(countdownFrom);

export function generateChallenge(){
  if(document.querySelector('.challenge') == null){
    createChallenge(getChallengeInteger())
  }
}

function setCountdown(max) {
  return Math.floor(Math.random() * max)+1;
}

function getChallengeInteger(){
//  return 4;
  return Math.floor(Math.random() * challenges.length);
}
  
function createChallenge(challengeIndex) {
  elements.challenge = document.createElement('div');
  elements.challenge.className = 'challenge';
  elements.challenge.innerHTML = challenges[challengeIndex];
  document.body.insertBefore(elements.challenge, elements.pointsDiv);
  
  if(challengeIndex === 0){
    elements.button = document.querySelector('.challenge');

    elements.button.addEventListener('click', () => clickedTheButton());
  } else if(challengeIndex === 1){
    elements.button = document.querySelector('#btn');
    elements.checkbox = document.querySelector('#checkbox');

    elements.button.addEventListener('click', () => checkBoxThenClickTheButton());
  } else if (challengeIndex === 2){
    elements.button = document.querySelector('#btn');
    elements.checkbox1 = document.querySelector('#checkbox1');
    elements.checkbox2 = document.querySelector('#checkbox2');
    elements.checkbox3 = document.querySelector('#checkbox3');
    
    elements.button.addEventListener('click',() => checkBoxesThenClickTheButton());
  } else if (challengeIndex === 3){
    elements.button = document.querySelector('#btn');
    elements.typingTest = document.querySelector('#typingTest');

    elements.button.addEventListener('click',() => typeFriendThenClickTheButton());
  } else if (challengeIndex === 4){
    elements.button = document.querySelector('#btn');
    elements.typingTest = document.querySelector('#typingTest');

    elements.button.addEventListener('click',()=> typeCodeThenClickTheButton());
  }
    
}

function clickedTheButton() {
  countdown--;
  incrementScore(1);

  if (countdown <= 1) {
    elements.challenge.parentNode.removeChild(elements.challenge);
    delete elements.button;
    countdown = setCountdown(countdownFrom);
  }
}

function checkBoxThenClickTheButton(){
  if(elements.checkbox.checked){
    countdown--;
    incrementScore(1);
  }

  if (countdown <= 1) {
    elements.challenge.parentNode.removeChild(elements.challenge);
    delete elements.button;
    delete elements.checkbox;
    countdown = setCountdown(countdownFrom);
  }

  elements.checkbox.checked = false;
}

function checkBoxesThenClickTheButton(){
  if(elements.checkbox1.checked && elements.checkbox2.checked && elements.checkbox3.checked ){
    countdown--;
    incrementScore(1);
  }

  elements.checkbox1.checked = false;
  elements.checkbox2.checked = false;
  elements.checkbox3.checked = false;

  if (countdown <= 1) {
    elements.challenge.parentNode.removeChild(elements.challenge);
    delete elements.button;
    delete elements.checkbox1;
    delete elements.checkbox2;
    delete elements.checkbox3;
    countdown = setCountdown(countdownFrom);
  }
}

function typeFriendThenClickTheButton(){
  if(elements.typingTest.value === 'friend' || elements.typingTest.value == 'Friend'){
    countdown--;
    incrementScore(1);
    elements.typingTest.value = '';
  }

  if(countdown <= 1){
    elements.challenge.parentNode.removeChild(elements.challenge);
    delete elements.typingTest;
    countdown = setCountdown(countdownFrom);
  }
}

function typeCodeThenClickTheButton(){
  const code = document.querySelector('.task > p');

  if(elements.typingTest.value === `${code.textContent}`){
    countdown--;
    incrementScore(1);
    code.textContent = generateRandomString();
    elements.typingTest.value = '';
  }


  if(countdown <= 1){
    elements.challenge.parentNode.removeChild(elements.challenge);
    delete elements.typingTest;
    countdown = setCountdown(countdownFrom);
  }
}

function generateRandomString(){
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let result='';

  for(let i = 0; i < 6 ; i++){
    result += characters.charAt(Math.floor(Math.random()*characters.length));
  }

  return result;
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