import { dirToVector, scaleVector } from './utils.js';
import Actor from './actor.js';

export default class Enemy extends Actor {
    constructor(pos, scene) {
        super({
            vel: {x:0,y:0},
            pos: pos,
            r: 40,
            img: undefined,
            health: 3,
            speed: 140
        })
        this.scene = scene;
        this.hitbox = undefined;
        this.hitBy = undefined;
    }

    tick() {
        super.tick();
    }

    hit() {
        let timeElapsed = Date.now() - this.timeEnteredState;
        this.stateLock = true;
        if (timeElapsed < 400) {
            this.pushBack(400 -timeElapsed);
        } else {
            this.hitBy = undefined;
            this.vel = {x:0, y:0};
            this.stateLock = false;
            this.changeState("idle");
        }
    }

    pushBack(factor) {
        let pushVector = dirToVector(this.hitBy.dir);
        pushVector = scaleVector(pushVector, -1);
        this.vel.x = pushVector.x * factor;
        this.vel.y = pushVector.y * factor;
    }
}