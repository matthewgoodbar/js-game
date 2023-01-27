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

let game;
(async () => {
    await loadAssets();
    game = new Game(canvas);
})();

let resizeButton = document.getElementById("resize-button");
resizeButton.addEventListener('click', () => {
    switch (screenSize) {
        case 's169': screenSize = 'm169'; break;
        case 'm169': screenSize = 'l169'; break;
        case 'l169': screenSize = 's169'; break;
    }
    setSize(screenSize);
    game = new Game(canvas);
});