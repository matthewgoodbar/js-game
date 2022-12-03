import Actor from './actor.js';
import Hitbox from './hitbox.js';
import { scaleVector } from './utils.js';

export default class Player extends Actor {
    constructor(pos, scene) {
        super({
            vel: {x: 0, y: 0}, 
            pos: pos, 
            r: 40, 
            img: sprites[0],
            health: 3,
            speed: 100
        });
        this.scene = scene;
        this.hitbox = undefined;
    }

    tick() {
        super.tick();
        // console.log(this.dir);
        this.updateDirection(this.dir);
    }

    idle() {
        this.stateLock = false;
        // console.log("i am idle!");
    }

    attack() {
        let timeElapsed = Date.now() - this.timeEnteredState;
        this.stateLock = true;
        if (timeElapsed < 400) {
            if (!this.hitbox) {
                this.hitbox = this.createHitbox();
                this.scene.addHitbox(this.hitbox);
            }
        } else if (timeElapsed < 800) {
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
        this.stateLock = false;
        // console.log(`now i'm moving in direction ${this.dir}!`);
        // console.log("now i'm moving!");
    }

    death() {

    }

    updateDirection(dir) {
        switch (dir) {
            case 148: {this.img = sprites[0]; break;}
            case 65: {this.img = sprites[1]; break;}
            case 152: {this.img = sprites[2]; break;}
            case 87: {this.img = sprites[3]; break;}
            case 155: {this.img = sprites[4]; break;}
            case 68: {this.img = sprites[5]; break;}
            case 151: {this.img = sprites[6]; break;}
            case 83: {this.img = sprites[7]; break;}
        }
    }

    createHitbox() {
        let hbPos = scaleVector(this.scene.directionVectors[this.dir], this.r);
        hbPos = scaleVector(hbPos, -1);
        let hitbox = new Hitbox({ 
            pos: {
                x: this.pos.x + hbPos.x,
                y: this.pos.y + hbPos.y
            },
            r: this.r * 1.2,
            owner: this,
            dir: this.dir
        });
        return hitbox;
    }
}