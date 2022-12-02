export default class Sprite {
    constructor({ vel, pos, r, img }) {
        this.vel = vel;
        this.pos = pos;
        this.r = r;
        this.img = img;
    }

    draw(ctx) {
        if (!this.img) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            let spriteImg = document.createElement('img')
            spriteImg.src = this.img;
            ctx.drawImage(spriteImg, this.pos.x, this.pos.y);
        }
    }

    move(dt) {
        this.pos.x += (this.vel.x * dt);
        this.pos.y += (this.vel.y * dt);
    }
}