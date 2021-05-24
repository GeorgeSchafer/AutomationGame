import {
    createChallenge,
    setScore,
    getChallengeInteger,
    generateChallenge
} from './actions.js';

setInterval(()=>generateChallenge(),3000);
document.body.onload = setScore();

