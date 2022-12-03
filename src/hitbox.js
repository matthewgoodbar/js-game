import Sprite from "./sprite.js";

export default class Hitbox extends Sprite {
    constructor({ vel, pos, r, owner}) {
        super({vel: vel, pos: pos, r: r});
        this.owner = owner;
    }


    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}