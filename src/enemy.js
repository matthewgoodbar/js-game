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
    }

    tick() {
        super.tick();
        if (this.hitBy) this._hit();
    }

    
}