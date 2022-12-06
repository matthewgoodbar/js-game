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

    distToObj(go) {
        let pos = this.pos;
        let delta = this.delta;
        let objectVector = {
            x: go.pos.x - pos.x,
            y: go.pos.y - pos.y
        }
        let projectionScale = utils.dot(objectVector, delta) / (utils.mag(delta)** 2);
        let projectionDelta = utils.scaleVector({x:delta.x, y:delta.y}, projectionScale);

        let distance = utils.mag({
            x: (go.pos.x) - (projectionDelta.x + pos.x),
            y: (go.pos.y) - (projectionDelta.y + pos.y)
        });
        return distance;
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