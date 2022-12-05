import {intersect, scaleVector, dist, dirToVector} from "./utils.js";
import Sprite from "./sprite.js";
import Actor from "./actor.js";
import Enemy from "./enemy.js";
import Player from "./player.js";

export default class Scene {
    constructor(game) {
        this.game = game;
        this.ctx = this.game.ctx;
        this.center = game.center;
        this.cameraDir = 0;
        this.backgroundStatic = [];
        this.gameObjects = [];
        this.hitboxes = [];
        this.player = new Player(this.center, this);
        this.foregroundStatic = [];

        this.addObjects();
        this.addBackgroundStatic();
    }
    
    run(dt) {
        // console.log(dt);
        this.tickStateMachines(dt);
        this.getInputs();
        this.moveObjects(dt);
        this.translateObjects(dt);
        this.hitDetection();
        this.checkCollisions();
        this.drawObjects(this.ctx);
        // this.drawHitboxes(this.ctx);
    }

    addGameObject(obj) {
        if (!this.gameObjects.includes(obj)) this.gameObjects.push(obj);
    }

    removeGameObject(obj) {
        this.gameObjects.splice(this.gameObjects.indexOf(obj), 1);
    }

    addHitbox(hb) {
        if (!this.hitboxes.includes(hb)) this.hitboxes.push(hb);
    }

    removeHitbox(hb) {
        this.hitboxes.splice(this.hitboxes.indexOf(hb), 1);
    }

    tickStateMachines(dt) {
        this.player.tick(dt);
        this.gameObjects.forEach((go) => go.tick(dt))
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
        if (wasdSum === 133 || wasdSum === 170) wasdSum = 0;
        if (wasdSum !== 0 && !this.player.stateLock) this.player.dir = wasdSum;
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
        this.backgroundStatic.forEach((bg) => {
            bg.pos.x += dirToVector(this.cameraDir).x * this.player.speed * dt;
            bg.pos.y += dirToVector(this.cameraDir).y * this.player.speed * dt;
        })
        this.gameObjects.forEach((go) => {
            go.pos.x += dirToVector(this.cameraDir).x * this.player.speed * dt;
            go.pos.y += dirToVector(this.cameraDir).y * this.player.speed * dt;
        })
        this.foregroundStatic.forEach((fg) => {
            fg.pos.x += dirToVector(this.cameraDir).x * this.player.speed * dt;
            fg.pos.y += dirToVector(this.cameraDir).y * this.player.speed * dt;
        })
    }

    hitDetection() {
        this.gameObjects.forEach((go) => {
            this.hitboxes.forEach((hb) => {
                if (dist(go.pos, hb.pos) < go.r + hb.r) {
                    go.hit(hb);
                }
            })
        })
    }

    checkCollisions() {

    }

    drawObjects(ctx) {
        //clear screen
        ctx.clearRect(0, 0, this.game.dimx, this.game.dimy);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.game.dimx, this.game.dimy);
        //draw bg elements
        this.backgroundStatic.forEach((go) => {
            go.draw(ctx);
        })
        //draw actors based off y pos
        let actors = [...this.gameObjects, this.player]; //actors = all game objects including player
        actors = actors.sort((a,b) => (a.pos.y > b.pos.y) ? 1 : -1); //sort based off y-pos
        for (let i = 0; i < actors.length; i++) { //loop thru actors, render furthest back FIRST
            actors[i].draw(ctx);
        }
        //draw fg elements
        this.foregroundStatic.forEach((go) => {
            go.draw(ctx);
        })
    }

    drawHitboxes(ctx) {
        this.hitboxes.forEach((hb) => {
            hb.draw(ctx);
        })
    }

    addBackgroundStatic() {
        let initialPos = {x:this.game.dimx / 2, y: 0};
        let offset = {x:100,y:57};
        let rowStart = {x:initialPos.x, y:initialPos.y};
        for (let i = 0; i < 10; i++) {
            let column = {x:rowStart.x, y:rowStart.y};
            for (let j = 0; j < 10; j++) {
                let tile = new Sprite({
                    pos: {
                        x: column.x,
                        y: column.y + (Math.random() * 20)
                    },
                    img: bgSprites['ground1']
                });
                this.backgroundStatic.push(tile);
                column.x += offset.x;
                column.y += offset.y;
            }
            rowStart.x -= offset.x;
            rowStart.y += offset.y;
        }
    }

    addObjects() {
        this.gameObjects.push(new Enemy(
            {
                x: this.game.dimx / 2 - 100,
                y: this.game.dimy / 2 + 50
            },
            this
        ));
    }
}