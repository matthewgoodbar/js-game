import Sprite from "./sprite.js";
import Hitbox from "./hitbox.js";
import { dirToVector, scaleVector, dirScaleFactor } from './utils.js';
import HitEffect from "./hiteffect.js";

export default class Actor extends Sprite {
    constructor({vel, pos, r, health, speed, img, dir, state}, scene) {
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

        this.scene = scene;
        this.hitbox = undefined;
        this.hitBy = undefined;
        this.timeHit = undefined;

        this.states = {
            "idle": ["attack", "moving", "death"],
            "attack": ["idle", "death"],
            "moving": ["idle", "attack", "death"],
            "death": []
        };
    }

    tick(dt) {
        switch(this.state) {
            case "idle": {this.idle(); break;}
            case "attack": {this.attack(); break;}
            case "moving": {this.moving(); break;}
            case "death": {this.death(); break;}
        }
        if (this.hitBy) this._hit(dt);
    }

    changeState(newState) {
        if (!this.stateLock || newState === 'death'){
            if (this.states[this.state].includes(newState)) {
                if (this.hitbox) {
                    this.scene.removeHitbox(this.hitbox);
                    this.hitbox = undefined;
                }
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
            this.blockCheck(hb);
        }
    }
    
    blockCheck(hb) { //overridden in Player
        if (this.health > 0) this.health--;
        this.addHitEffect(hb);
    }

    addHitEffect(hb) { //overridden in Player
        let effectPos = scaleVector(dirToVector(hb.dir), 20);
        new HitEffect({
                x:effectPos.x + this.pos.x,
                y:effectPos.y + this.pos.y
            }, this.scene, false);
        if (this.scene.sound) {
            new Audio('../assets/sounds/hit1.wav').play();
        }
    }

    _hit(dt) {
        let timeElapsed = Date.now() - this.timeHit;
        if (timeElapsed < 400) {
            this.pushBack(400 - timeElapsed, dt);
            this.color = "red";
        } else {
            this.vel = {x:0,y:0}; 
            this.hitBy = undefined;
            this.color = "white";
        }
    }

    pushBack(factor, dt) {
        let pushVector = dirToVector(this.hitBy.dir);
        pushVector = scaleVector(pushVector, -1);
        this.pos.x += pushVector.x * factor * dt;
        this.pos.y += pushVector.y * factor * dt;
    }

    createHitbox(size = 1.2) {
        let hbr = this.r * size;
        let hbPos = scaleVector(dirToVector(this.dir), (hbr + this.r + 4) * dirScaleFactor(this.dir) * -1);
        let hitbox = new Hitbox({ 
            pos: {
                x: this.pos.x + hbPos.x,
                y: this.pos.y + hbPos.y
            },
            r: hbr,
            owner: this,
            dir: this.dir
        });
        return hitbox;
    }

    collisionHandle(bd) {
        let error = Math.abs(bd.distToObj(this) - this.r);
        let correction = scaleVector({x:bd.normal.x,y:bd.normal.y}, -1 * error);
        this.pos.x += correction.x;
        this.pos.y += correction.y;
    }

    disperse() { //overridden in Enemy

    }
}