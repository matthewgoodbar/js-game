import Game from "./game.js";
import { loadAssets } from "./assets.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');
const screenSizes = {
    "s": [640, 480],
    "m": [800, 600],
    "l": [960, 720],
    "s169": [800, 450],
    "m169": [1040, 585],
    "l169": [1280, 720]
};
const setSize = (size) => {
    canvas.width = screenSizes[size][0];
    canvas.height = screenSizes[size][1];
};
let screenSize = "l169";
setSize(screenSize);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const setScoreBoard = () => {
    const scoreBoard = document.getElementById("scoreboard");
    while (scoreBoard.firstChild) {
        scoreBoard.removeChild(scoreBoard.firstChild);
    }
    let scoreKeys = ['s0','s1','s2','s3','s4','s5','s6','s7','s8','s9'];
    if (localStorage.getItem('s0')) {
        for (let i = 0; i < 10; i++) {
            let score = localStorage.getItem(scoreKeys[i]);
            if (score) {
                if (i === 0) score = "~~~" + score + "~~~"
                const scoreText = document.createTextNode(score);
                const scoreBoardEntry = document.createElement("p");
                scoreBoardEntry.appendChild(scoreText);
                scoreBoard.appendChild(scoreBoardEntry);
            }
        }
    }
    else {
        const noScoreText = document.createTextNode("No hi score yet!");
        const noScoreTag = document.createElement("p");
        noScoreTag.appendChild(noScoreText);
        scoreBoard.appendChild(noScoreTag);
    }
};
let options = { scoreBoardCallback: setScoreBoard }

let game;
(async () => {
    await loadAssets();
    game = new Game(canvas, options);
})();

let resizeButton = document.getElementById("resize-button");
resizeButton.addEventListener('click', () => {
    switch (screenSize) {
        case 's169': screenSize = 'm169'; break;
        case 'm169': screenSize = 'l169'; break;
        case 'l169': screenSize = 's169'; break;
    }
    setSize(screenSize);
    game = new Game(canvas, options);
});

setScoreBoard();