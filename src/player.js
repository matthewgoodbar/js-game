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
        // this.hitbox = undefined;
        // this.hitBy = undefined;
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

    hit() {

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

    setSprite(frame) {
        this.img = playerSprites[this.dir][frame];
    }

}