import Actor from './actor.js';
import Hitbox from './hitbox.js';
import { scaleVector, dirToVector, dirScaleFactor } from './utils.js';

const CONST = {
    "SPEED": 300,
    "HEALTH": 3,
}

export default class Player extends Actor {
    constructor(pos, scene) {
        super({
            vel: {x: 0, y: 0}, 
            pos: pos, 
            r: 40, 
            img: playerSprites[148]['idle'],
            health: 3,
            speed: CONST["SPEED"]
        });
        this.scene = scene;
        this.mockPush = {x:0, y:0};
        this.collisionCorrection = {x:0, y:0};
        this.unscaledSpeed = this.speed;
    }

    tick(dt) {
        super.tick(dt);
    }

    idle() {
        this.stateLock = false;
        // console.log("i am idle!");
        this.setSprite('idle');
    }

    attack() {
        let timeElapsed = Date.now() - this.timeEnteredState;
        this.stateLock = true;
        if (timeElapsed < 200) {
            this.setSprite('attack_1');
            if (!this.hitbox) {
                this.hitbox = this.createHitbox();
                this.scene.addHitbox(this.hitbox);
            }
        } else if (timeElapsed < 300) {
            this.setSprite('attack_2');
        } else if (timeElapsed < 400) {
            this.setSprite('attack_3')
            if (this.hitbox) {
                this.scene.removeHitbox(this.hitbox);
                this.hitbox = undefined;
            }
        } else {
            this.stateLock = false;
            this.changeState("idle");
        }
    }

    // hit(hb) {
    // }

    _hit(dt) {
        let timeElapsed = Date.now() - this.timeHit;
        if (timeElapsed < 400) {
            this.pushBack(400 - timeElapsed, dt);
            this.color = "red";
            this.img.style.opacity = 0;
        } else {
            this.mockPush = {x:0,y:0}; 
            this.hitBy = undefined;
            this.color = "green";
        }
    }

    pushBack(factor, dt) {
        let pushVector = dirToVector(this.hitBy.dir);
        pushVector = scaleVector(pushVector, -1);
        this.mockPush.x = pushVector.x * factor * dt * -1;
        this.mockPush.y = pushVector.y * factor * dt * -1;
    }

    moving() {
        this.speed = this.unscaledSpeed * dirScaleFactor(this.dir);
        this.stateLock = false;
        let timeElapsed = (Date.now() - this.timeEnteredState) % 800;
        if (timeElapsed < 200) {
            this.setSprite('move_1');
        } else if (timeElapsed < 400) {
            this.setSprite('move_2');
        } else if (timeElapsed < 600) {
            this.setSprite('move_3');
        } else {
            this.setSprite('move_4');
        }
    }

    death() {

    }

    collisionHandle(bd) {
        let error = Math.abs(bd.distToObj(this) - this.r);
        let correction = scaleVector({x:bd.normal.x,y:bd.normal.y}, error);
        this.collisionCorrection.x += correction.x;
        this.collisionCorrection.y += correction.y;
    }

    setSprite(frame) {
        this.img = playerSprites[this.dir][frame];
    }

}