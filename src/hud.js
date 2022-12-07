export default class Hud {
    constructor(scene) {
        this.scene = scene;
        this.dim = {x:this.scene.game.dimx, y:this.scene.game.dimy};
    }

    draw(ctx) {
        let dim = this.dim;
        let fontSize = 40;
        let string = "Health:"
        let leftJust = 40;
        ctx.font = `italic ${fontSize}px Times New Roman`;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.fillStyle = "white";

        ctx.strokeText("Health:", leftJust, 50);
        ctx.fillText("Health:", leftJust, 50);

        ctx.strokeText("Potions:", leftJust, 100);
        ctx.fillText("Potions:", leftJust, 100);

        ctx.strokeText("Score:", leftJust, dim.y - 50);
        ctx.fillText("Score:", leftJust, dim.y - 50);
    }
}