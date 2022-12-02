import Sprite from "./sprite.js";

export default class Actor extends Sprite {
    constructor({vel, pos, r, health, speed, img}) {
        super({vel: vel, pos: pos, r: r, img: img});
        this.health = health;
        this.speed = speed;
    }
}