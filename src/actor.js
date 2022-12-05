import Sprite from "./sprite.js";
import { dirToVector, scaleVector } from './utils.js';

export default class Actor extends Sprite {
    constructor({vel, pos, r, health, speed, img, dir, state}) {
        super({vel: vel, pos: pos, r: r, img: img});

        if (!health) { this.health = 5;}
        else {this.health = health;}
        if (!speed) { this.speed = 60;}
        else {this.speed = speed;}
        if (!dir) { this.dir = 148;}
        else {this.dir = dir;}
        if (!state) { this.state = "idle";}
        else {this.state = state;}
        this.stateLock = false;
        this.timeEnteredState = new Date();

        this.hitbox = undefined;
        this.hitBy = undefined;
        this.timeHit = undefined;

        this.states = {
            "idle": ["attack", "moving", "death"],
            "attack": ["idle", "death"],
            // "hit": ["idle", "death"],
            "moving": ["idle", "attack", "death"],
            "death": []
        };
    }

    tick(dt) {
        switch(this.state) {
            case "idle": {this.idle(); break;}
            case "attack": {this.attack(); break;}
            // case "hit": {this.hit(); break;}
            case "moving": {this.moving(); break;}
            case "death": {this.death(); break;}
        }
        if (this.hitBy) this._hit(dt);
    }

    changeState(newState) {
        if (!this.stateLock){
            if (this.states[this.state].includes(newState)) {
                this.state = newState;
                this.timeEnteredState = new Date();
            }
        }
    }

    idle() {
        // console.log("please override idle()!");
    }

    attack() {
        // console.log("please override attack()!");
    }

    moving() {
        // console.log("please override moving()!");
    }

    death() {
        // console.log("please override death()!");
    }

    hit(hb) {
        if (!this.hitBy) { //initial hit frame
            this.hitBy = hb;
            this.timeHit = Date.now();
        }
    }

    _hit(dt) {
        let timeElapsed = Date.now() - this.timeHit;
        if (timeElapsed < 400) {
            this.pushBack(400 - timeElapsed, dt);
        } else {
            this.vel = {x:0,y:0}; 
            this.hitBy = undefined;
        }
    }

    pushBack(factor, dt) {
        let pushVector = dirToVector(this.hitBy.dir);
        pushVector = scaleVector(pushVector, -1);
        this.pos.x += pushVector.x * factor * dt;
        this.pos.y += pushVector.y * factor * dt;
    }
}