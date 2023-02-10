# CATACOMB

[Live Link](https://matthewgoodbar.github.io/js-game/)

## Overview

CATACOMB is an isometric action survival game where you play as a lone knight, cursed to the depths of a cursed
dungeon, fending off the endless hoards of the undead to survive.
Players are scored based off how long they survive, as well as how many enemies they defeat.

## Technologies

* The game logic is written in JavaScript
* The game is rendered to the screen using CSS Canvas
* Keyboard input reading is achieved with [KeyMaster](https://github.com/madrobby/keymaster)

# Feature Highlights

## The Game Loop

The instantiation of the game itself happens in index.js, nested within an immediately invoked async function
to allow for the invocation of loadAssets (an async function) to ensure that the game is created only once
assets have been loaded:

``` javascript
// index.js
let game;
(async () => {
    await loadAssets();
    game = new Game(canvas, options);
})();
```

The Game class itself is fairly small, and is mostly meant to provide a singular requestAnimationFrame function
that the rest of the game (the Scene) will depend on. This run function also calculates a delta time variable (dt), 
which is simply the difference in time between the current and previous frames. This value is helpful for a lot of
applications such as creating smooth velocity based movement, so it gets passed into the Scene's run function every frame:

``` javascript
// game.js
export default class Game {
    constructor(canvas, options) {
        this.canvas = canvas;
        this.options = options;
        this.ctx = canvas.getContext('2d');
        this.dimx = canvas.width;
        this.dimy = canvas.height;
        this.center = {x: this.dimx / 2, y: this.dimy / 2};
        this.scene = new Scene(this, options);
        this.prevTime = Date.now();
        this.dt = 0;
        this.run();
    }

    run = () => {
        let currentTime = Date.now();
        this.dt = (currentTime - this.prevTime) / 1000;
        this.prevTime = currentTime;
        this.scene.run(this.dt);
        requestAnimationFrame(this.run);
    }

    restart() {
        this.scene = new Scene(this, this.options);
    }
}
```

The Scene object is what instantiates every game object (player, enemies, etc) and determines the actual game logic (that is, what
happens each frame). Every invocation of requestAnimationFrame within game.js calls this function within scene.js:

``` javascript
// scene.js
run(dt) {
    if (this.gameOver) {
        let keyCodes = key.getPressedKeyCodes();
        if (keyCodes.includes(82)) {
            this.setScore();
            this.game.restart();
        }
        this.drawObjects(this.ctx);
        this.drawHud(this.ctx);
    } else {
        if (this.gameStart) this.incrementScore(dt);
        this.tickStateMachines(dt);
        this.getInputs();
        this.checkCollisions();
        this.moveObjects(dt);
        this.translateObjects(dt);
        this.hitDetection();
        this.drawObjects(this.ctx);
        this.drawHud(this.ctx);
    }
}
```

## Wall collision

One problem I encountered while making this game was how to handle collisions between actors (player, enemies) and
the boundaries of the arena. Actors are represented by circles for the purposes of collision detection, 
and collision with circles is easy, we just check the distance between the centers
and compare it to the sum of the radii. However, the boundaries of the arena are represented two points in space, the start
and end points, which essentially form a vector. So how do we find the distance between a circle and a vector? We use
vector projection!

The idea is this: when you calculate the projection P of one vector A (the position of the circle) onto another B (the boundary),
the difference between that projection and vector A is the vector perpendicular to the vector B, that points at A. Therefore,
the magnitude of that difference is the distance.

I won't go into the details of how one finds a projection, but I made several vector math helper functions to make it easier:

``` javascript
// utils.js
export const dot = (v1, v2) => {
    return (
        (v1.x * v2.x) + (v1.y * v2.y)
    )
};

export const mag = (vector) => {
    return dist(vector, {x:0,y:0});
};

export const scaleVector = (vector, c) => {
    return {
        x: vector.x * c,
        y: vector.y * c
    }
};

export const dist = (v1, v2) => {
    return Math.sqrt(
        (v1.x - v2.x)**2 + (v1.y-v2.y)**2
    );
};
```

Within the Boundary class, I was able to write a function that calculates the distance of a game object to the boundary
using the method listed above like so. (Note: pos and delta here simply refer to the start and end points of the
boundary vector, that is, end = pos + delta):

``` javascript
// boundary.js
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
```