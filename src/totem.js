import Actor from "./actor";

export default class Totem extends Actor {
    constructor(pos, scene) {
        super({pos: pos});
        this.scene = scene;
        this.img = bgSprites['totem_1'];
    }

    hit(hb){
        if (!this.whacked) {
            this.whacked = true;
            this.scene.startGame();
            this.img = bgSprites['totem_2'];
        }
        super.hit(hb);
    }
}