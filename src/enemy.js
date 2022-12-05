import { dirToVector, scaleVector, norm } from './utils.js';
import Actor from './actor.js';

export default class Enemy extends Actor {
    constructor(pos, scene) {
        super({
            vel: {x:0,y:0},
            pos: pos,
            r: 40,
            img: undefined,
            health: 3,
            speed: 60,
            state: "moving"
        })
        this.scene = scene;
    }

    tick(dt) {
        // this.vel = {x:20, y:0};
        super.tick(dt);
    }

    moving() {
        let player = this.scene.player;
        this.vel = norm({
            x: player.pos.x - this.pos.x,
            y: player.pos.y - this.pos.y
        });
        this.vel.x *= this.speed;
        this.vel.y *= this.speed;
    }

    
}