import { dirToVector, scaleVector, norm, dot, dirScaleFactor, dist } from './utils.js';
import Actor from './actor.js';

const CONST = {
    "SPEED": 60,
    "HEALTH": 3,
    "AGGRO": 120
}

export default class Enemy extends Actor {
    constructor(pos, scene) {
        super({
            vel: {x:0,y:0},
            pos: pos,
            r: 40,
            img: undefined,
            health: 3,
            speed: 60,
            state: "moving"
        })
        this.scene = scene;
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
        if (dist(this.player.pos, this.pos) < CONST["AGGRO"]) {
            this.changeState("attack");
        } else {
            this.changeState("moving");
        }
    }

    attack() {
        this._setDirFromAngle();
        this.stateLock = true;
        this.vel = {x:0, y:0};
        let timeElapsed = Date.now() - this.timeEnteredState;
        if (timeElapsed < 400) { //wind up
            this.color = "white";
        } else if (timeElapsed < 800) { //spawn hitbox
            if (!this.hitbox){
                this.hitbox = this.createHitbox();
                this.scene.addHitbox(this.hitbox);
            }
        } else if (timeElapsed < 1000) {// despawn hitbox / recovery
            if (this.hitbox) {
                this.scene.removeHitbox(this.hitbox);
                this.hitbox = undefined;
            }
        } else {
            this.stateLock = false;
            this.color = "green";
            this.changeState("idle");
        }

    }

    death() {
        this.stateLock = true;
        // console.log("i am dead...");
        this.color = "black";
    }
    
    moving() {
        this.stateLock = false;
        this.vel.x = this.velVector.x * this.speed;
        this.vel.y = this.velVector.y * this.speed;
        if (dist(this.player.pos, this.pos) < CONST["AGGRO"]) {
            this.changeState("attack");
        }
    }

    setSprite(frame) {
        this.img = playerSprites[this.dir][frame];
    }

    _setVelAndSpeed() {
        this.velVector = scaleVector(dirToVector(this.dir), -1);
        this.speed = this.absoluteSpeed * dirScaleFactor(this.dir);
    }

    _setDirFromAngle() {
        if (this.stateLock) return;
        let moveDir = norm({
            x: this.player.pos.x - this.pos.x,
            y: this.player.pos.y - this.pos.y
        });
        let moveDirAngle = dot(moveDir, {x:0,y:-1});
        let minAngleDiff = 2;
        if (moveDir.x < 0) {
            //[N, NW, W, SW, S]
            let westDirs = [87, 152, 65, 148, 83];
            westDirs.forEach((dirCode) => {
                let dirVector = scaleVector(dirToVector(dirCode), -1);
                let angle = dot(dirVector, {x:0,y:-1});
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
                let dirVector = scaleVector(dirToVector(dirCode), -1);
                let angle = dot(dirVector, {x:0,y:-1});
                let angleDiff = Math.abs(angle - moveDirAngle);
                if (angleDiff < minAngleDiff) {
                    minAngleDiff = angleDiff;
                    this.dir = dirCode;
                }
            })
        }
    }

    
}