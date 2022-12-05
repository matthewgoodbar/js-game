import Scene from "./scene.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dimx = canvas.width;
        this.dimy = canvas.height;
        this.center = {x: this.dimx / 2, y: this.dimy / 2};
        this.scene = new Scene(this);
        this.prevTime = Date.now();
        this.dt = 0;
        this.run();
    }

    run = () => {
        let currentTime = Date.now();
        this.dt = (currentTime - this.prevTime) / 1000;
        this.prevTime = currentTime;
        this.scene.run(this.dt);
        // console.log(this.dt);
        requestAnimationFrame(this.run);
    }

    restart() {
        this.scene = new Scene(this);
    }
}