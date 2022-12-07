export default class Hud {
    constructor(scene) {
        this.scene = scene;
        this.dim = {x:this.scene.game.dimx, y:this.scene.game.dimy};
        this.player = this.scene.player;
    }

    draw(ctx) {
        let dim = this.dim;
        let fontSize = 40;
        let leftJust = 40;

        let healthStr = `Health: ${this.player.health}`;
        let scoreStr = `Score: ${this.scene.score}`;
        let potionStr = `Potions: ${this.player.potions}`;
        
        ctx.font = `italic ${fontSize}px Times New Roman`;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.fillStyle = this.player.color;

        ctx.strokeText(healthStr, leftJust, 50);
        ctx.fillText(healthStr, leftJust, 50);

        ctx.fillStyle = "white"

        ctx.strokeText(potionStr, leftJust, 100);
        ctx.fillText(potionStr, leftJust, 100);

        ctx.strokeText(scoreStr, leftJust, dim.y - 50);
        ctx.fillText(scoreStr, leftJust, dim.y - 50);
    }
}