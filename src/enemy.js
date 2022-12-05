import { dirToVector, scaleVector, norm, dot } from './utils.js';
import Actor from './actor.js';

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
    }

    tick(dt) {
        // this.vel = {x:20, y:0};
        super.tick(dt);
    }

    moving() {
        let player = this.scene.player;
        let moveDir = norm({
            x: player.pos.x - this.pos.x,
            y: player.pos.y - this.pos.y
        });
        let unitNorth = {x:0, y:-1};
        let angle = dot(moveDir, unitNorth);
        this.getDirFromAngle(angle, moveDir.x);
        let dirVector = scaleVector(dirToVector(this.dir), -1);
        this.vel.x = dirVector.x * this.speed;
        this.vel.y = dirVector.y * this.speed;
    }

    getDirFromAngle(moveDirAngle, sign) {
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