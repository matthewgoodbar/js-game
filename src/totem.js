import Actor from "./actor";

export default class Totem extends Actor {
    constructor(pos, scene) {
        super({pos: pos});
        this.scene = scene;
    }

    hit(hb){
        this.scene.startGame();
        super.hit(hb);
    }
}