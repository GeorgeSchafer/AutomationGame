import {
    setScore,
    generateChallenge
} from './actions.js';

generateChallenge();
setInterval(() => generateChallenge(), 3000);
document.body.onload = setScore();

