import Actor from './actor.js';
import * as utils from './utils.js';

const CONST = {
    "SPEED": 400,
    "HEALTH": 5,
    "MAXHEALTH": 5,
    "MAXPOTS": 3
}

export default class Player extends Actor {
    constructor(pos, scene) {
        super({
            vel: {x: 0, y: 0}, 
            pos: pos, 
            r: 40, 
            img: playerSprites[148]['idle'],
            health: CONST["HEALTH"],
            speed: CONST["SPEED"],
            color: "white"
        }, scene);
        this.mockPush = {x:0, y:0};
        this.collisionCorrection = {x:0, y:0};
        this.unscaledSpeed = this.speed;
        this.strafe = false;
        this.potions = 3;
        this.killCount = 0;

        this.states = {
            "idle": ["attack", "moving", "death", "heal"],
            "attack": ["idle", "death"],
            "moving": ["idle", "attack", "death", "heal"],
            "death": [],
            "heal": ["idle", "death"]
        };
    }

    blocking() {
        return (this.state === 'idle' || this.state === 'moving') && this.strafe;
    }

    tick(dt) {
        super.tick(dt);
        if (this.state === "heal") this.heal();
        if (this.strafe) {
            this.speed = this.unscaledSpeed * 0.3;
        }
    }

    idle() {
        this.stateLock = false;
        // console.log("i am idle!");
        this.setSprite('idle');
        if (this.strafe) {
            this.setSprite('strafe_1');
        }
    }

    heal() {
        this.stateLock = true;
        this.setSprite('idle');
        let timeElapsed = Date.now() - this.timeEnteredState;
        if (timeElapsed < 200) {

        } else if (timeElapsed < 400) {
            if (!this.usedPotion){
                this.usedPotion = true;
                this.usePotion();
            }
        } else {
            this.usedPotion = undefined;
            this.stateLock = false;
            this.changeState("idle");
        }
    }

    attack() {
        let timeElapsed = Date.now() - this.timeEnteredState;
        this.stateLock = true;
        if (timeElapsed < 200) {
            this.setSprite('attack_1');
            if (!this.hitbox) {
                this.hitbox = this.createHitbox();
                this.scene.addHitbox(this.hitbox);
            }
        } else if (timeElapsed < 300) {
            this.setSprite('attack_2');
        } else if (timeElapsed < 400) {
            this.setSprite('attack_3')
            if (this.hitbox) {
                this.scene.removeHitbox(this.hitbox);
                this.hitbox = undefined;
            }
        } else {
            this.stateLock = false;
            this.changeState("idle");
        }
    }

    hit(hb) {
        super.hit(hb);
        if (this.health <= 0) this.scene.endGame();
    }

    blockCheck(hb) {
        if (this.blocking()){ //Player is blocking
            if (utils.blockedFromDir(this.dir, hb.dir)){ //block is successful
                this.addHitEffect(hb, 'block');
            } else { //block is unsuccessful
                super.blockCheck(hb);
            }
        } else { //Player is not blocking
            super.blockCheck(hb);
        }
    }

    _hit(dt) {
        let timeElapsed = Date.now() - this.timeHit;
        if (timeElapsed < 400) {
            this.pushBack(400 - timeElapsed, dt);
            this.color = "red";
            this.img.style.opacity = 0;
        } else {
            this.mockPush = {x:0,y:0}; 
            this.hitBy = undefined;
            this.color = "white";
        }
    }

    pushBack(factor, dt) {
        let pushVector = utils.dirToVector(this.hitBy.dir);
        pushVector = utils.scaleVector(pushVector, -1);
        this.mockPush.x = pushVector.x * factor * dt * -1;
        this.mockPush.y = pushVector.y * factor * dt * -1;
    }

    moving() {
        this.speed = this.unscaledSpeed * utils.dirScaleFactor(this.dir);
        this.stateLock = false;
        let timeElapsed = (Date.now() - this.timeEnteredState) % 800;
        if (timeElapsed < 200) {
            this.setSprite('move_1');
            if (this.strafe) this.setSprite('strafe_3');
        } else if (timeElapsed < 400) {
            this.setSprite('move_2');
            if (this.strafe) this.setSprite('strafe_2');
        } else if (timeElapsed < 600) {
            this.setSprite('move_3');
            if (this.strafe) this.setSprite('strafe_1');
        } else {
            this.setSprite('move_4');
            if (this.strafe) this.setSprite('strafe_2');
        }
    }

    death() {

    }

    addHealth(amt) {
        this.health += amt;
        if (this.health >= CONST["MAXHEALTH"]) this.health = CONST["MAXHEALTH"];
    }

    addPotion() {
        this.potions++;
        if (this.potions >= CONST["MAXPOTS"]) this.potions = CONST["MAXPOTS"];
    }

    usePotion() {
        if (this.potions > 0) {
            this.addHealth(3);
            this.potions--;
        }
    }

    collisionHandle(bd) {
        let error = Math.abs(bd.distToObj(this) - this.r);
        let correction = utils.scaleVector({x:bd.normal.x,y:bd.normal.y}, error);
        this.collisionCorrection.x += correction.x;
        this.collisionCorrection.y += correction.y;
    }

    setSprite(frame) {
        this.img = playerSprites[this.dir][frame];
    }

}