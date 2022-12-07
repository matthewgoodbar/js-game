import Enemy from "./enemy";

export default class SpawnPoint {
    constructor({ pos }, scene) {
        this.pos = pos
        if (!pos) this.pos = {x:0,y:0};
        this.scene = scene;
    }

    spawnEnemy() {
        let enemy = new Enemy({x:this.pos.x, y:this.pos.y}, this.scene)
        this.scene.addGameObject(enemy);
    }

    draw(ctx) {
        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}