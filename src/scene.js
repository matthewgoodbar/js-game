import {intersect} from "./utils.js";
import Player from "./player.js";
import Sprite from "./sprite.js";

export default class Scene {
    constructor(game) {
        this.game = game;
        this.ctx = this.game.ctx;
        this.center = game.center;
        this.cameraDir = 0;
        this.gameObjects = [];
        this.player = new Player(this.center);
        this.directionVectors = {
            87: {x: 0, y: 1}, //w
            65: {x: 1, y: 0}, //a
            83: {x: 0, y: -1}, //s
            68: {x: -1, y: 0}, //d
            155: {x: -0.707, y: 0.707}, //wd
            152: {x: 0.707, y: 0.707}, //wa
            151: {x: -0.707, y: -0.707}, //sd
            148: {x: 0.707, y: -0.707}, //sa
            0: {x: 0, y: 0}
        };
        this.addObjects();
    }
    
    run(dt) {
        // console.log(dt);
        this.player.tick();
        this.getInputs();
        this.moveObjects(dt);
        this.translateObjects(dt);
        this.checkCollisions();
        this.drawObjects(this.ctx);
    }

    getInputs() {
        // console.log(key.getPressedKeyCodes());
        let keyCodes = key.getPressedKeyCodes();
        this.processWasd(keyCodes);
        if (keyCodes.includes(74)) { //74 = 'j'
            this.player.changeState("attack");
        }
    }

    processWasd(keyCodes) {
        let wasd = [87, 65, 83, 68];
        let reducedWasd = intersect(wasd, keyCodes).slice(0,2);
        let wasdSum = reducedWasd.reduce((acc, el) => {return acc + el}, 0);
        if (wasdSum !== 0) this.player.dir = wasdSum;
        if (wasdSum === 133 || wasdSum === 170) wasdSum = 0;
        if (wasdSum === 0) {
            this.player.changeState("idle");
        } else {
            this.player.changeState("moving");
        }
        if (this.player.state === "moving") {
            this.cameraDir = wasdSum;
        } else {
            this.cameraDir = 0;
        }
    }

    moveObjects(dt) {
        this.gameObjects.forEach((go) => {
            go.move(dt);
        })
    }

    translateObjects(dt) {
        this.gameObjects.forEach((go) => {
            go.pos.x += this.directionVectors[this.cameraDir].x * this.player.speed * dt;
            go.pos.y += this.directionVectors[this.cameraDir].y * this.player.speed * dt;
        })
    }

    checkCollisions() {

    }

    drawObjects(ctx) {
        ctx.clearRect(0, 0, this.game.dimx, this.game.dimy);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.game.dimx, this.game.dimy);
        this.gameObjects.forEach((go) => {
            go.draw(ctx);
        })
        this.player.draw(ctx)
    }

    addObjects() {
        this.gameObjects.push(new Sprite({
            vel: {
                x: 0,
                y: 0
            },
            pos: {
                x: 100,
                y: 100
            },
            r: 10
        }));
        this.gameObjects.push(new Sprite({
            vel: {
                x: 0,
                y: 0
            },
            pos: {
                x: 200,
                y: 300
            },
            r: 15
        }));
        this.gameObjects.push(new Sprite({
            vel: {
                x: 0,
                y: 0
            },
            pos: {
                x: 600,
                y: 100
            },
            r: 4
        }));
    }
}