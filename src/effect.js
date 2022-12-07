export default class Effect {
    constructor({pos, sprite, lifespan}, scene) {
        this.pos = pos;
        this.scene = scene;
        this.lifespan = lifespan;
        this.img = effectSprites[sprite];
        if (this.img) {
            this.anchor = {
                x: this.pos.x - (this.img.width / 2),
                y: this.pos.y - (this.img.height / 2)
            };
        }

        this.scene.addEffect(this);
        this.timeSpawned = Date.now();
    }

    draw(ctx) {
        let timeElapsed = Date.now() - this.timeSpawned;
        if (timeElapsed < this.lifespan) {
            if (this.img){
                ctx.drawImage(this.img, this.anchor.x, this.anchor.y);
            } else {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(this.pos.x, this.pos.y, 20, 0, 2 * Math.PI);
                ctx.fill();
            }
        } else {
            this.scene.removeEffect(this);
        }
    }

}