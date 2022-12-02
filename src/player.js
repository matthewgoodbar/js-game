import Actor from './actor.js';

export default class Player extends Actor {
    constructor(pos) {
        super({
            vel: {x: 0, y: 0}, 
            pos: pos, 
            r: 40, 
            img: "../assets/0001.png",
            health: 3,
            speed: 100
        });
    }

    tick() {
        super.tick();
    }

    idle() {
        this.stateLock = false;
        // console.log("i am idle!");
    }

    attack() {
        let timeElapsed = Date.now() - this.timeEnteredState;
        if (timeElapsed < 1000) {
            this.stateLock = true;
            // console.log("attacking!");
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
}