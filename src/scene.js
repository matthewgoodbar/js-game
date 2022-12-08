import {intersect, scaleVector, dist, dirToVector, randInt} from "./utils.js";
import Boundary from "./boundary.js";
import Sprite from "./sprite.js";
import Actor from "./actor.js";
import Enemy from "./enemy.js";
import Player from "./player.js";
import SpawnPoint from "./spawnpoint.js";
import Hud from "./hud.js";
import Totem from "./totem.js";

export default class Scene {
    constructor(game) {
        this.game = game;
        this.ctx = this.game.ctx;
        this.center = game.center;
        this.cameraDir = 0;
        this.boundaries = [];
        this.spawnPoints = [];
        this.backgroundStatic = [];
        this.gameObjects = [];
        this.effects = [];
        this.hitboxes = [];
        this.player = new Player(this.center, this);
        this.foregroundStatic = [];
        this.floorTileOffset = {x:100,y:57};

        // this.addObjects();
        this.addBackgroundStatic();
        this.addBoundaries();
        this.addSpawnPoints();

        this.gameStart = false;
        this.gameOver = false;
        this.score = 0;

        this.hud = new Hud(this);
        this.gameObjects.push(new Totem(
            {x: this.terrainOrigin.x + (2 * this.floorTileOffset.x),
                 y:this.terrainOrigin.y + (4 * this.floorTileOffset.y)},
            this
        ));
    }
    
    run(dt) {
        // console.log(dt);
        // console.log(this.player.health);
        if (this.gameOver) {
            let keyCodes = key.getPressedKeyCodes();
            if (keyCodes.includes(82)) {
                this.game.restart();
            }
            this.drawObjects(this.ctx);
            this.drawHud(this.ctx);
        } else {
            if (this.gameStart) this.incrementScore(dt);
            this.tickStateMachines(dt);
            this.getInputs();
            this.checkCollisions();
            this.moveObjects(dt);
            this.translateObjects(dt);
            this.hitDetection();
            this.drawObjects(this.ctx);
            this.drawHud(this.ctx);
        }
        // this.drawHitboxes(this.ctx); //for debugging
        // this.drawBoundaries(this.ctx); //for debugging
        // this.drawSpawnPoints(this.ctx); //for debugging
    }

    startGame() {
        if (!this.gameStart) {
            this.gameStart = true;
            this.spawnInterval = setInterval(() => {
                let sp = this.spawnPoints[randInt(this.spawnPoints.length)];
                sp.spawnEnemy();
            }, 2500)
        }
    }

    endGame() {
        this.gameOver = true;
        clearInterval(this.spawnInterval);
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

    addEffect(ef) {
        if (!this.effects.includes(ef)) this.effects.push(ef);
    }

    removeEffect(ef) {
        this.effects.splice(this.effects.indexOf(ef), 1);
    }

    incrementScore(dt) {
        this.score += Math.floor(100 * dt);
    }

    tickStateMachines(dt) {
        this.player.tick(dt);
        let tickables = [...this.gameObjects, ...this.spawnPoints];
        tickables.forEach((go) => go.tick(dt))
    }

    getInputs() {
        // console.log(key.getPressedKeyCodes());
        let keyCodes = key.getPressedKeyCodes();
        this.processWasd(keyCodes);
        if (keyCodes.includes(74)) { //74 = 'j'
            this.player.changeState("attack");
        }
        if (keyCodes.includes(73)) { //73 = 'i'
            this.player.strafe = true;
        } else {
            this.player.strafe = false;
        }
        if (keyCodes.includes(79) && this.player.potions > 0) { //79 = 'o'
            this.player.changeState("heal");
        }
    }

    processWasd(keyCodes) {
        let wasd = [87, 65, 83, 68];
        let reducedWasd = intersect(wasd, keyCodes).slice(0,2);
        let wasdSum = reducedWasd.reduce((acc, el) => {return acc + el}, 0);
        if (wasdSum === 133 || wasdSum === 170) wasdSum = 0;
        if (wasdSum !== 0 && !this.player.stateLock && !this.player.strafe) this.player.dir = wasdSum;
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
            x: dpos.x + this.player.mockPush.x + this.player.collisionCorrection.x,
            y: dpos.y + this.player.mockPush.y + this.player.collisionCorrection.y
        };
        this.player.collisionCorrection.x = 0;
        this.player.collisionCorrection.y = 0;
        let sets = [
            this.backgroundStatic, 
            this.gameObjects,
            this.effects,
            this.hitboxes, 
            this.spawnPoints, 
            this.boundaries, 
            this.foregroundStatic
        ];
        sets.forEach((set) => {
            set.forEach((el) => {
                el.pos.x += dpos.x;
                el.pos.y += dpos.y;
            })
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
            //check for collision with game objects
            this.gameObjects.forEach((go) => {
                if (bd.distToObj(go) < go.r) go.collisionHandle(bd);
            })
            //check for collision with player
            if (bd.distToObj(this.player) < this.player.r) {
                this.player.collisionHandle(bd);
            }
        })
        let enemyOverlap = 20;
        for (let i = 1; i < this.gameObjects.length; i++) {
            for (let j = 0; j < i; j++) {
                let go1 = this.gameObjects[i];
                let go2 = this.gameObjects[j];
                if (dist(go1.pos, go2.pos) < (go1.r + go2.r) - enemyOverlap) go1.disperse(go2, enemyOverlap);
            }
        }
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
        let actors = [...this.gameObjects, ...this.spawnPoints, ...this.effects, this.player]; //actors = all game objects including player
        actors = actors.sort((a,b) => (a.pos.y > b.pos.y) ? 1 : -1); //sort based off y-pos
        for (let i = 0; i < actors.length; i++) { //loop thru actors, render furthest back FIRST
            actors[i].draw(ctx);
        }
        //draw fg elements
        this.foregroundStatic.forEach((go) => {
            go.draw(ctx);
        })
    }

    drawHud(ctx) {
        this.hud.draw(ctx);
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

    drawSpawnPoints(ctx) {
        this.spawnPoints.forEach((sp) => {
            sp.draw(ctx);
        })
    }

    addBackgroundStatic() {
        let offset = this.floorTileOffset; //Proper spacing between tiles
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
                x: (this.terrainOrigin.x) - (10 * this.floorTileOffset.x),
                y: (8 * this.floorTileOffset.y)
            },
            delta: {
                x: 10 * this.floorTileOffset.x,
                y: 10 * -this.floorTileOffset.y
            },
            normal: dirToVector(151)
        });
        this.boundaries.push(nw);
        let ne = new Boundary({
            pos: {
                x: (this.terrainOrigin.x) + (10 * this.floorTileOffset.x),
                y: (8 * this.floorTileOffset.y)
            },
            delta: {
                x: 10 * -this.floorTileOffset.x,
                y: 10 * -this.floorTileOffset.y
            },
            normal: dirToVector(148)
        });
        this.boundaries.push(ne);
        let se = new Boundary({
            pos: {
                x: (this.terrainOrigin.x) + (10 * this.floorTileOffset.x),
                y: (8.6 * this.floorTileOffset.y)
            },
            delta: {
                x: 10 * -this.floorTileOffset.x,
                y: 10 * this.floorTileOffset.y
            },
            normal: dirToVector(152)
        });
        this.boundaries.push(se);
        let sw = new Boundary({
            pos: {
                x: (this.terrainOrigin.x) - (10 * this.floorTileOffset.x),
                y: (8.6 * this.floorTileOffset.y)
            },
            delta: {
                x: 10 * this.floorTileOffset.x,
                y: 10 * this.floorTileOffset.y
            },
            normal: dirToVector(155)
        });
        this.boundaries.push(sw);
    }

    addSpawnPoints() {
        let start = this.terrainOrigin;
        let offset = this.floorTileOffset;
        let points = [
            {x:start.x, y:start.y - offset.y}, //north
            {x:start.x - (9 * offset.x), 
                y:start.y + (8 * offset.y)}, //west
            {x:start.x + (9 * offset.x), 
                y:start.y + (8 * offset.y)}, //east
            {x:start.x, 
            y:start.y + (17 * offset.y)}, //south
            {x:start.x - (4.5 * offset.x),
                y:start.y + (3.5 * offset.y)}, //north west
            {x:start.x + (4.5 * offset.x),
                y:start.y + (3.5 * offset.y)}, //north east
            {x:start.x + (4.5 * offset.x),
                y:start.y + (12.5 * offset.y)}, //south east
            {x:start.x - (4.5 * offset.x),
                y:start.y + (12.5 * offset.y)}, //south west
        ];
        points.forEach((point) => {
            let sp = new SpawnPoint({pos: point}, this);
            this.spawnPoints.push(sp);
        })
    }

    addObjects() {
        this.gameObjects.push(new Enemy(
            {
                x: this.game.dimx / 2 - 100,
                y: this.game.dimy / 2 + 50
            },
            this
        ));
        this.gameObjects.push(new Enemy(
            {
                x: this.game.dimx / 2 + 100,
                y: this.game.dimy / 2 + 50
            },
            this
        ));
        this.gameObjects.push(new Enemy(
            {
                x: this.game.dimx / 2 + 50,
                y: this.game.dimy / 2 + 150
            },
            this
        ));
    }
}