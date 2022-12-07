import Enemy from "./enemy";

export default class SpawnPoint {
    constructor({ pos }, scene) {
        this.pos = pos
        if (!pos) this.pos = {x:0,y:0};
        this.scene = scene;
        this.spawning = false;
        this.enemy = undefined;
    }

    tick(dt) {
        if (this.spawning) {
            let timeElapsed = Date.now() - this.timeActivated;
            if (timeElapsed < 200) {
                this.setSprite('spawn_3');
            } else if (timeElapsed < 400) {
                this.setSprite('spawn_2');
            } else if (timeElapsed < 600) {
                this.setSprite('spawn_1');
            } else if (timeElapsed < 700) {
                if (!this.enemy) {
                    this.enemy = new Enemy({x:this.pos.x, y:this.pos.y}, this.scene)
                    this.scene.addGameObject(this.enemy);
                }
            } else if (timeElapsed < 800) {
                this.setSprite('spawn_2');
            } else if (timeElapsed < 1000) {
                this.setSprite('spawn_3');
            } else {
                this.img = undefined;
                this.spawning = false;
                this.enemy = undefined;
            }
        }
    }

    spawnEnemy() {

        this.timeActivated = Date.now();
        this.spawning = true;
    }

    setSprite(frame) {
        this.img = effectSprites[frame];
    }

    draw(ctx) {
        // ctx.fillStyle = "purple";
        // ctx.beginPath();
        // ctx.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI);
        // ctx.fill();
        if (this.img) {
            ctx.drawImage(this.img, this.pos.x - (this.img.width / 2), this.pos.y - (this.img.height / 2));
        }
    }
}