import {
    createChallenge,
    setScore
} from './actions.js';

const ELEMENTS = {
    score    : document.getElementById('point-total'),
    pointsDiv: document.querySelector('#points'),
    button   :null,
    challenge:null
}

createChallenge(0,ELEMENTS)
document.body.onload = setScore(ELEMENTS)


