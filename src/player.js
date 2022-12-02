import Actor from './actor.js';

export default class Player extends Actor {
    constructor(pos) {
        super({
            vel: {x: 0, y: 0}, 
            pos: pos, 
            r: 10, 
            health: 3,
            speed: 60
        });
    }
}