import * as utils from './utils.js';

export default class Boundary {
    constructor({ pos, delta }) {
        this.pos = pos;
        if (!pos) this.pos = {
            x:0, y:0
        };
        this.delta = delta;
        if (!delta) this.delta = {
            x:50, y:50
        };
    }

    draw(ctx) {
        let pos = this.pos;
        let delta = this.delta;
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + delta.x, pos.y + delta.y);
        ctx.stroke();
        console.log("being drawn")
    }
}