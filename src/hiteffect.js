export default class HitEffect {
    constructor(pos, scene, block) {
        this.pos = pos;
        this.scene = scene;
        this.type = block ? 'block' : 'hit';
        this.setSprite(`${this.type}_1`);
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
        if (timeElapsed < 100) {
            this.setSprite(`${this.type}_1`);
            ctx.drawImage(this.img, this.anchor.x, this.anchor.y);
        } else  if (timeElapsed < 200) {
            this.setSprite(`${this.type}_2`);
            ctx.drawImage(this.img, this.anchor.x, this.anchor.y);
        } else if (timeElapsed < 300) {
            this.setSprite(`${this.type}_3`);
            ctx.drawImage(this.img, this.anchor.x, this.anchor.y);
        } else {
            this.scene.removeEffect(this);
        }
    }

    setSprite(frame) {
        this.img = effectSprites[frame];
    }
}