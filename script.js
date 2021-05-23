import {
    createChallenge,
    setScore,
    getChallengeInteger
} from './actions.js';

setInterval(()=>{
  if(document.querySelector('.challenge') == null){
    createChallenge(getChallengeInteger())
  }
},3000)
document.body.onload = setScore()

