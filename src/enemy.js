import { dirToVector, scaleVector, norm, dot, dirScaleFactor, dist } from './utils.js';
import Actor from './actor.js';

const CONST = {
    "SPEED": 60,
    "HEALTH": 3,
    "AGGRO": 100
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
        this.absoluteSpeed = this.speed;
    }
    
    tick(dt) {
        // this.vel = {x:20, y:0};
        if (this.health <= 0) this.changeState("death");
        super.tick(dt);
    }

    idle() {
        if (dist(this.scene.player.pos, this.pos) < CONST["AGGRO"]) {
            this.changeState("attack");
        } else {
            this.changeState("moving");
        }
    }

    attack() {
        this.stateLock = true;
        this.vel = {x:0, y:0};
        let timeElapsed = Date.now() - this.timeEnteredState;
        if (timeElapsed < 400) {
            console.log("i'm attacking!");
        } else {
            this.stateLock = false;
            this.changeState("idle");
        }

    }

    death() {
        console.log("i am dead...");
        this.color = "black";
    }
    
    moving() {
        let player = this.scene.player;
        let moveDir = norm({
            x: player.pos.x - this.pos.x,
            y: player.pos.y - this.pos.y
        });
        let unitNorth = {x:0, y:-1};
        let angle = dot(moveDir, unitNorth);
        this._getDirFromAngle(angle, moveDir.x);
        let dirVector = scaleVector(dirToVector(this.dir), -1);
        this.speed = this.absoluteSpeed * dirScaleFactor(this.dir);
        this.vel.x = dirVector.x * this.speed;
        this.vel.y = dirVector.y * this.speed;

        if (dist(player.pos, this.pos) < CONST["AGGRO"]) {
            this.changeState("attack");
        }
    }

    _getDirFromAngle(moveDirAngle, sign) {
        let minAngleDiff = 2;
        if (sign < 0) {
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