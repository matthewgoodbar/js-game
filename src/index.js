import Game from "./game.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');

canvas.width = 960;
canvas.height = 720;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const game = new Game(canvas);