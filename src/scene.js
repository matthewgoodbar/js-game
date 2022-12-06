import {intersect, scaleVector, dist, dirToVector, randInt} from "./utils.js";
import Boundary from "./boundary.js";
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
        this.boundaries = [];
        this.backgroundStatic = [];
        this.gameObjects = [];
        this.hitboxes = [];
        this.player = new Player(this.center, this);
        this.foregroundStatic = [];

        this.addObjects();
        this.addBackgroundStatic();
        this.addBoundaries();
    }
    
    run(dt) {
        // console.log(dt);
        // console.log(this.player.health);
        this.tickStateMachines(dt);
        this.getInputs();
        this.moveObjects(dt);
        this.translateObjects(dt);
        // this.checkCollisions();
        this.hitDetection();
        this.drawObjects(this.ctx);
        this.drawHitboxes(this.ctx); //for debugging
        this.drawBoundaries(this.ctx); //for debugging
        this.checkCollisions();
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
        let dir = dirToVector(this.cameraDir);
        let speed = this.player.speed;
        let dpos = scaleVector(dir, speed * dt);
        dpos = {
            x: dpos.x + this.player.mockPush.x,
            y: dpos.y + this.player.mockPush.y
        };
        this.backgroundStatic.forEach((bg) => {
            bg.pos.x += dpos.x;
            bg.pos.y += dpos.y;
        })
        this.gameObjects.forEach((go) => {
            go.pos.x += dpos.x;
            go.pos.y += dpos.y;
        })
        this.hitboxes.forEach((hb) => {
            hb.pos.x += dpos.x;
            hb.pos.y += dpos.y;
        })
        this.boundaries.forEach((bd) => {
            bd.pos.x += dpos.x;
            bd.pos.y += dpos.y;
        })
        this.foregroundStatic.forEach((fg) => {
            fg.pos.x += dpos.x;
            fg.pos.y += dpos.y;
        })
    }

    hitDetection() {
        this.gameObjects.forEach((go) => {
            this.hitboxes.forEach((hb) => {
                if (dist(go.pos, hb.pos) < go.r + hb.r && hb.owner === this.player) {
                    go.hit(hb);
                }
            })
        })
        this.hitboxes.forEach((hb) => {
            if (dist(this.player.pos, hb.pos) < this.player.r + hb.r && hb.owner !== this.player){
                this.player.hit(hb);
            }
        })
    }

    checkCollisions() {
        this.boundaries.forEach((bd) => {
            this.gameObjects.forEach((go) => {
                bd.distToObj(go);
            })
            bd.distToObj(this.player);
        })
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

    drawBoundaries(ctx) {
        this.boundaries.forEach((bd) => {
            bd.draw(ctx);
        })
    }

    addBackgroundStatic() {
        let offset = {x:100,y:57}; //Proper spacing between tiles
        let wallStart = {x:this.game.dimx / 2, y: offset.y * -2}; //Start point for wall tiles
        let rightWall = {x:wallStart.x, y:wallStart.y};
        for (let i = 0; i < 11; i++) { //Render right side wall
            let randomJitter = (Math.random() * 20);
            let wall = new Sprite({
                pos: {
                    x: rightWall.x,
                    y: rightWall.y + randomJitter
                },
                img: bgSprites['wall0']
            });
            this.backgroundStatic.push(wall); //lower level
            wall = new Sprite({
                pos: {
                    x: rightWall.x,
                    y: rightWall.y - 128 + randomJitter
                },
                img: bgSprites['wall0']
            });
            this.backgroundStatic.push(wall); //upper level
            rightWall.x += offset.x;
            rightWall.y += offset.y;
        }
        let leftWall = {x:wallStart.x - offset.x, y:wallStart.y + offset.y};
        for (let i = 0; i < 10; i++) { //Render left side wall
            let randomJitter = (Math.random() * 20);
            let wall = new Sprite({
                pos: {
                    x: leftWall.x,
                    y: leftWall.y + randomJitter
                },
                img: bgSprites['wall0']
            });
            this.backgroundStatic.push(wall); //lower level
            wall = new Sprite({
                pos: {
                    x: leftWall.x,
                    y: leftWall.y - 128 + randomJitter
                },
                img: bgSprites['wall0']
            });
            this.backgroundStatic.push(wall); //upper level
            leftWall.x -= offset.x;
            leftWall.y += offset.y;
        }
        let initialPos = {x:this.game.dimx / 2, y: 0}; //Start point for floor tiles
        this.terrainOrigin = {x:initialPos.x, y:initialPos.y};
        let rowStart = {x:initialPos.x, y:initialPos.y};
        for (let i = 0; i < 10; i++) { //Render floor tiles
            let column = {x:rowStart.x, y:rowStart.y};
            for (let j = 0; j < 10; j++) {
                let tile = new Sprite({
                    pos: {
                        x: column.x,
                        y: column.y + (Math.random() * 20)
                    },
                    img: bgSprites[`ground${randInt(2)}`]
                });
                this.backgroundStatic.push(tile);
                column.x += offset.x;
                column.y += offset.y;
            }
            rowStart.x -= offset.x;
            rowStart.y += offset.y;
        }
    }

    addBoundaries() {
        let nw = new Boundary({
            pos: {
                x: (this.terrainOrigin.x) - (10 * 100),
                y: (8 * 57)
            },
            delta: {
                x: 10 * 100,
                y: 10 * -57
            },
            normal: dirToVector(151)
        });
        this.boundaries.push(nw);
        let ne = new Boundary({
            pos: {
                x: (this.terrainOrigin.x) + (10 * 100),
                y: (8 * 57)
            },
            delta: {
                x: 10 * -100,
                y: 10 * -57
            },
            normal: dirToVector(148)
        });
        this.boundaries.push(ne);
        let se = new Boundary({
            pos: {
                x: (this.terrainOrigin.x) + (10 * 100),
                y: (8.6 * 57)
            },
            delta: {
                x: 10 * -100,
                y: 10 * 57
            },
            normal: dirToVector(152)
        });
        this.boundaries.push(se);
        let sw = new Boundary({
            pos: {
                x: (this.terrainOrigin.x) - (10 * 100),
                y: (8.6 * 57)
            },
            delta: {
                x: 10 * 100,
                y: 10 * 57
            },
            normal: dirToVector(155)
        });
        this.boundaries.push(sw);
    }

    addObjects() {
        // this.gameObjects.push(new Enemy(
        //     {
        //         x: this.game.dimx / 2 - 100,
        //         y: this.game.dimy / 2 + 50
        //     },
        //     this
        // ));
        // this.gameObjects.push(new Enemy(
        //     {
        //         x: this.game.dimx / 2 + 100,
        //         y: this.game.dimy / 2 + 50
        //     },
        //     this
        // ));
        // this.gameObjects.push(new Enemy(
        //     {
        //         x: this.game.dimx / 2 + 50,
        //         y: this.game.dimy / 2 + 150
        //     },
        //     this
        // ));
    }
}