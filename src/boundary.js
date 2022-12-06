import * as utils from './utils.js';

export default class Boundary {
    constructor({ pos, delta, normal }) {
        this.pos = pos;
        if (!pos) this.pos = {
            x:0, y:0
        };
        this.delta = delta;
        if (!delta) this.delta = {
            x:50, y:50
        };
        this.normal = normal;
    }

    rayTo(go, ctx) {
        let pos = this.pos;
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(go.pos.x, go.pos.y);
        ctx.stroke();

        let objectVector = {
            x: go.pos.x - this.pos.x,
            y: go.pos.y - this.pos.y
        }

        // let projectionScale = utils.dot(objectVector, this.delta) / (utils.mag(this.delta)** 2);
        let projectionScale = utils.dot(objectVector, this.delta) / utils.dot(this.delta, this.delta);
        console.log(projectionScale);
        let projDelta = utils.scaleVector({x:this.delta.x, y:this.delta.y}, projectionScale);

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(projDelta.x + pos.x, projDelta.y + pos.y);
        ctx.stroke();

    }

    draw(ctx) {
        let pos = this.pos;
        let delta = this.delta;
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + delta.x, pos.y + delta.y);
        ctx.stroke();
    }
}