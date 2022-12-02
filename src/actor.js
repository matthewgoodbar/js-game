import Sprite from "./sprite.js";

const states = {
    "idle": ["attack", "hit", "move"],
    "attack": ["idle", "hit"],
    "hit": ["idle", "death"],
    "move": ["idle", "attack", "hit"],
    "death": []
};

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
    }

    tick() {
        switch(this.state) {
            case "idle": this.idle();
            case "attack": this.attack();
            case "hit": this.hit();
            case "move": this.move();
            case "death": this.death();
        }
    }

    changeState(newState) {
        if (this.states[this.state].includes(newState)) {
            this.state = newState;
            this.timeEnteredState = new Date();
        }
    }

    idle() {
        console.log("i am idle!");
    }

    attack() {

    }

    hit() {

    }

    move() {

    }

    death() {

    }
}