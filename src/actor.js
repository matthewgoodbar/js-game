import Sprite from "./sprite.js";

export default class Actor extends Sprite {
    constructor({vel, pos, r, health, speed}) {
        super({vel: vel, pos: pos, r: r});
        this.health = health;
        this.speed = speed;
    }
}