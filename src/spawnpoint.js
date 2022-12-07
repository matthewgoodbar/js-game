export default class SpawnPoint {
    constructor({ pos }) {
        this.pos = pos
        if (!pos) this.pos = {x:0,y:0};
    }

    draw(ctx) {
        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}