export default class Sprite {
    constructor({ vel, pos, r, img, color }) {
        if (!vel) { this.vel = {x:0, y:0}; }
        else {this.vel = vel;}
        if (!pos) { this.pos = {x:0,y:0};}
        else {this.pos = pos;}
        if (!r) { this.r = 20;}
        else {this.r = r;}
        if (!color) { this.color = "green";}
        else {this.color = color;}
        this.img = img;
        // this.sprite = new Image(); 
        // this.sprite.src = this.img;
        if (img) {
            this.anchor = {
                x: this.pos.x - (this.img.width / 2),
                y: this.pos.y - (this.img.height / 2)
            };
        }
    }

    draw(ctx) {
        if (!this.img) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
            ctx.fill();

            this._updateAnchor();
            ctx.drawImage(this.img, this.anchor.x, this.anchor.y);
        }
    }

    _updateAnchor() {
        this.anchor = {
            x: this.pos.x - (this.img.width / 2),
            y: this.pos.y - (this.img.height / 2)
        };
    }

    move(dt) {
        this.pos.x += (this.vel.x * dt);
        this.pos.y += (this.vel.y * dt);
    }
}