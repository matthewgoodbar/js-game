export default class Sprite {
    constructor({ vel, pos, r, img }) {
        this.vel = vel;
        this.pos = pos;
        this.r = r;
        this.img = img;
        this.sprite = new Image();
        this.sprite.src = this.img;
        if (img) {
            this.anchor = {
                x: this.pos.x - (this.sprite.width / 2),
                y: this.pos.y - (this.sprite.height / 2)
            };
        }
    }

    draw(ctx) {
        if (!this.img) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.drawImage(this.sprite, this.anchor.x, this.anchor.y);
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    move(dt) {
        this.pos.x += (this.vel.x * dt);
        this.pos.y += (this.vel.y * dt);
    }
}