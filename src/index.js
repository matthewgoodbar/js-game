import Game from "./game.js";
import { loadAssets } from "./assets.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');
const screenSizes = {
    "small": [640, 480],
    "large": [960, 720]
};
const setSize = (size) => {
    canvas.width = screenSizes[size][0];
    canvas.height = screenSizes[size][1];
}

setSize("large");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

(async () => {
    await loadAssets();
    const game = new Game(canvas);
})();