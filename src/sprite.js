export default class Sprite {
    constructor({ vel, pos, r }) {
        this.vel = vel;
        this.pos = pos;
        this.r = r;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    move(dt) {
        this.pos.x += (this.vel.x * dt);
        this.pos.y += (this.vel.y * dt);
    }
}