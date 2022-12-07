export default class Hud {
    constructor(scene) {
        this.scene = scene;
        this.dim = {x:this.scene.game.dimx, y:this.scene.game.dimy};
        this.player = this.scene.player;
    }

    draw(ctx) {
        if (this.scene.gameOver) {
            this._gameOverScreen(ctx);
            return;
        }
        let dim = this.dim;
        let fontSize = 40;
        let leftJust = 40;

        let healthStr = `Health: ${this.player.health}`;
        let scoreStr = `Score: ${this.scene.score}`;
        let potionStr = `Potions: ${this.player.potions}`;
        
        ctx.font = `italic ${fontSize}px Times New Roman`;
        ctx.textAlign = "left";
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

    _gameOverScreen(ctx) {
        let dim = this.dim;
        let leftJust = 40;
        
        let fontSize = 80;
        ctx.font = `italic ${fontSize}px Times New Roman`;
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.fillStyle = "white";

        let fixY = dim.y / 2 - 40;
        
        let gameOverText = "GAME OVER"
        ctx.strokeText(gameOverText, dim.x / 2, fixY - 40);
        ctx.fillText(gameOverText, dim.x / 2, fixY - 40);

        fontSize = 40;
        ctx.font = `italic ${fontSize}px Times New Roman`;

        let decoration = "~";
        ctx.strokeText(decoration, dim.x / 2, fixY);
        ctx.fillText(decoration, dim.x / 2, fixY);
        
        let firstFlavor = `You scored ${this.scene.score} points`;
        ctx.strokeText(firstFlavor, dim.x / 2, fixY + 40);
        ctx.fillText(firstFlavor, dim.x / 2, fixY + 40);

        let secondFlavor = `and defeated ${this.player.killCount} enemies.`;
        ctx.strokeText(secondFlavor, dim.x / 2, fixY + 100);
        ctx.fillText(secondFlavor, dim.x / 2, fixY + 100);

        fontSize = 30;
        ctx.font = `italic ${fontSize}px Times New Roman`;
        let restartFlavor = "Press r to restart.";
        ctx.strokeText(restartFlavor, dim.x / 2, fixY + 160);
        ctx.fillText(restartFlavor, dim.x / 2, fixY + 160);

    }
}