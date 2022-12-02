import Sprite from "./sprite.js";



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

        this.states = {
            "idle": ["attack", "hit", "moving"],
            "attack": ["idle", "hit"],
            "hit": ["idle", "death"],
            "moving": ["idle", "attack", "hit"],
            "death": []
        };
    }

    tick() {
        switch(this.state) {
            case "idle": {this.idle(); break;}
            case "attack": {this.attack(); break;}
            case "hit": {this.hit(); break;}
            case "moving": {this.moving(); break;}
            case "death": {this.death(); break;}
        }
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
        console.log("please override idle()!");
    }

    attack() {
        console.log("please override attack()!");
    }

    hit() {
        console.log("please override hit()!");
    }

    moving() {
        console.log("please override moving()!");
    }

    death() {
        console.log("please override death()!");
    }
}