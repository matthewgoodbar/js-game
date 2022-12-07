import * as utils from './utils.js';
import Actor from './actor.js';

const CONST = {
    "SPEED": 60,
    "HEALTH": 3,
    "RADIUS": 40,
    "AGGRO": 120,
    "VALUE": 200
}

export default class Enemy extends Actor {
    constructor(pos, scene) {
        super({
            vel: {x:0,y:0},
            pos: pos,
            r: CONST["RADIUS"],
            img: undefined,
            health: CONST["HEALTH"],
            speed: CONST["SPEED"],
            state: "moving"
        }, scene);
        this.player = this.scene.player;
        this.absoluteSpeed = this.speed;
        this.velVector = {x:0, y:0};

        setInterval(() => { //Set dir based off player pos
            if (!this.stateLock) {
                this._setDirFromAngle();
                this._setVelAndSpeed();
            }
        }, 500);
    }
    
    tick(dt) {
        // this.vel = {x:20, y:0};
        if (this.health <= 0) this.changeState("death");
        this.setSprite("idle");
        super.tick(dt);
    }

    idle() {
        this.stateLock = false;
        if (utils.dist(this.player.pos, this.pos) < CONST["AGGRO"]) {
            this.changeState("attack");
        } else {
            this.changeState("moving");
        }
    }

    attack() {
        this._setDirFromAngle();
        this.stateLock = true;
        this.vel = {x:0, y:0};
        let timeElapsed = (Date.now() - this.timeEnteredState);
        if (timeElapsed < 400) { //wind up
            this.setSprite("attack_1");
            this.color = "white";
        } else if (timeElapsed < 800) { //spawn hitbox
            this.setSprite("attack_2");
            if (!this.hitbox){
                this.hitbox = this.createHitbox();
                this.scene.addHitbox(this.hitbox);
            }
        } else if (timeElapsed < 1000) {// despawn hitbox / recovery
            this.setSprite("attack_3");
            if (this.hitbox) {
                this.scene.removeHitbox(this.hitbox);
                this.hitbox = undefined;
            }
        } else if (timeElapsed < 1200) {
            this.setSprite("attack_4");
        } else {
            this.stateLock = false;
            this.color = "green";
            this.changeState("idle");
        }

    }

    death() {
        let timeElapsed = Date.now() - this.timeEnteredState;
        this.stateLock = true;
        // console.log("i am dead...");
        this.color = "black";
        if (timeElapsed < 600) {
            this.setSprite('death_1');
        } else if (timeElapsed < 800){
            this.setSprite('death_2');
        } else if (timeElapsed < 1000) {
            this.setSprite('death_3');
        } else if (timeElapsed < 1200) {
            this.setSprite('death_4');
        } else {
            this.scene.removeGameObject(this);
            this.scene.score += CONST["VALUE"];
            this.player.killCount++;
        }
    }
    
    moving() {
        this.stateLock = false;
        let timeElapsed = (Date.now() - this.timeEnteredState) % 800;
        if (timeElapsed < 400) {
            this.setSprite("idle");
        } else if (timeElapsed < 600) {
            this.setSprite("move_1");
        } else if (timeElapsed < 800) {
            this.setSprite("move_2");
        }
        this.vel.x = this.velVector.x * this.speed;
        this.vel.y = this.velVector.y * this.speed;
        if (utils.dist(this.player.pos, this.pos) < CONST["AGGRO"]) {
            this.changeState("attack");
        }
    }

    setSprite(frame) {
        this.img = enemySprites[this.dir][frame];
    }

    _setVelAndSpeed() {
        this.velVector = utils.scaleVector(utils.dirToVector(this.dir), -1);
        this.speed = this.absoluteSpeed * utils.dirScaleFactor(this.dir);
    }

    _setDirFromAngle() {
        if (this.stateLock) return;
        let moveDir = utils.norm({
            x: this.player.pos.x - this.pos.x,
            y: this.player.pos.y - this.pos.y
        });
        let moveDirAngle = utils.cos(moveDir, {x:0,y:-1});
        let minAngleDiff = 2;
        if (moveDir.x < 0) {
            //[N, NW, W, SW, S]
            let westDirs = [87, 152, 65, 148, 83];
            westDirs.forEach((dirCode) => {
                let dirVector = utils.scaleVector(utils.dirToVector(dirCode), -1);
                let angle = utils.cos(dirVector, {x:0,y:-1});
                let angleDiff = Math.abs(angle - moveDirAngle);
                if (angleDiff < minAngleDiff) {
                    minAngleDiff = angleDiff;
                    this.dir = dirCode;
                }
            })
        } else {
            //[N, NE, E, SE, S]
            let eastDirs = [87, 155, 68, 151, 83]
            eastDirs.forEach((dirCode) => {
                let dirVector = utils.scaleVector(utils.dirToVector(dirCode), -1);
                let angle = utils.cos(dirVector, {x:0,y:-1});
                let angleDiff = Math.abs(angle - moveDirAngle);
                if (angleDiff < minAngleDiff) {
                    minAngleDiff = angleDiff;
                    this.dir = dirCode;
                }
            })
        }
    }

    disperse(go, overlap) {
        let error = Math.abs(utils.dist(go.pos, this.pos) - (go.r + this.r - overlap));
        let goToMe = utils.scaleVector(utils.norm({
            x: this.pos.x - go.pos.x,
            y: this.pos.y - go.pos.y
        }), error);
        let meToGo = utils.scaleVector(goToMe, -1);
        this.pos.x += goToMe.x;
        this.pos.y += goToMe.y;
        go.pos.x += meToGo.x;
        go.pos.y += meToGo.y;
    }
    
}