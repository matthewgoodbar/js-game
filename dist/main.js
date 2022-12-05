/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/actor.js":
/*!**********************!*\
  !*** ./src/actor.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Actor)\n/* harmony export */ });\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite.js */ \"./src/sprite.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\n\n\nclass Actor extends _sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor({vel, pos, r, health, speed, img, dir, state}) {\n        super({vel: vel, pos: pos, r: r, img: img});\n\n        if (!health) { this.health = 5;}\n        else {this.health = health;}\n        if (!speed) { this.speed = 60;}\n        else {this.speed = speed;}\n        if (!dir) { this.dir = 148;}\n        else {this.dir = dir;}\n        if (!state) { this.state = \"idle\";}\n        else {this.state = state;}\n        this.stateLock = false;\n        this.timeEnteredState = new Date();\n\n        this.hitbox = undefined;\n        this.hitBy = undefined;\n        this.timeHit = undefined;\n\n        this.states = {\n            \"idle\": [\"attack\", \"moving\", \"death\"],\n            \"attack\": [\"idle\", \"death\"],\n            // \"hit\": [\"idle\", \"death\"],\n            \"moving\": [\"idle\", \"attack\", \"death\"],\n            \"death\": []\n        };\n    }\n\n    tick(dt) {\n        switch(this.state) {\n            case \"idle\": {this.idle(); break;}\n            case \"attack\": {this.attack(); break;}\n            case \"moving\": {this.moving(); break;}\n            case \"death\": {this.death(); break;}\n        }\n        if (this.hitBy) this._hit(dt);\n    }\n\n    changeState(newState) {\n        if (!this.stateLock){\n            if (this.states[this.state].includes(newState)) {\n                this.state = newState;\n                this.timeEnteredState = new Date();\n            }\n        }\n    }\n\n    idle() {\n        // console.log(\"please override idle()!\");\n    }\n\n    attack() {\n        // console.log(\"please override attack()!\");\n    }\n\n    moving() {\n        // console.log(\"please override moving()!\");\n    }\n\n    death() {\n        // console.log(\"please override death()!\");\n    }\n\n    hit(hb) {\n        if (!this.hitBy) { //initial hit frame\n            this.hitBy = hb;\n            this.timeHit = Date.now();\n        }\n    }\n\n    _hit(dt) {\n        let timeElapsed = Date.now() - this.timeHit;\n        if (timeElapsed < 400) {\n            this.pushBack(400 - timeElapsed, dt);\n        } else {\n            this.vel = {x:0,y:0}; \n            this.hitBy = undefined;\n        }\n    }\n\n    pushBack(factor, dt) {\n        let pushVector = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.dirToVector)(this.hitBy.dir);\n        pushVector = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.scaleVector)(pushVector, -1);\n        this.pos.x += pushVector.x * factor * dt;\n        this.pos.y += pushVector.y * factor * dt;\n    }\n}\n\n//# sourceURL=webpack://js_project/./src/actor.js?");

/***/ }),

/***/ "./src/assets.js":
/*!***********************!*\
  !*** ./src/assets.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadAssets\": () => (/* binding */ loadAssets)\n/* harmony export */ });\nwindow.bgSprites = {};\nwindow.playerSprites = {};\nwindow.enemySprites = {};\n\nconst loadAssets = async () => {\n    await loadBackgroundSprites();\n    await loadPlayerSprites();\n};\n\nconst loadBackgroundSprites = async () => {\n    let path = '../assets/background';\n    let names = [\n        'ground1', 'archway1', 'wall1'\n    ];\n    names.forEach((name) => {\n        let img = new Image();\n        img.src = `${path}/${name}.png`;\n        bgSprites[name] = img;\n    })\n};\n\nconst loadPlayerSprites = async () => {\n    let path = '../assets/player';\n    let dirs = [148, 65, 152, 87, 155, 68, 151, 83];\n    let frames = [\n        'attack_1', 'attack_2', 'attack_3', \n        'idle', \n        'move_1', 'move_2', 'move_3', 'move_4'\n    ];\n    dirs.forEach((dir) => {\n        playerSprites[dir] = {};\n        frames.forEach((frame) => {\n            let img = new Image();\n            img.src = `${path}/${dir}/${frame}.png`;\n            playerSprites[dir][frame] = img;\n        })\n    })\n};\n\n//# sourceURL=webpack://js_project/./src/assets.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Enemy)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _actor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actor.js */ \"./src/actor.js\");\n\n\n\nclass Enemy extends _actor_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    constructor(pos, scene) {\n        super({\n            vel: {x:0,y:0},\n            pos: pos,\n            r: 40,\n            img: undefined,\n            health: 3,\n            speed: 60,\n            state: \"moving\"\n        })\n        this.scene = scene;\n    }\n\n    tick(dt) {\n        // this.vel = {x:20, y:0};\n        super.tick(dt);\n    }\n\n    moving() {\n        let player = this.scene.player;\n        let moveDir = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.norm)({\n            x: player.pos.x - this.pos.x,\n            y: player.pos.y - this.pos.y\n        });\n        let unitNorth = {x:0, y:-1};\n        let angle = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dot)(moveDir, unitNorth);\n        this.getDirFromAngle(angle, moveDir.x);\n        let dirVector = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.scaleVector)((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(this.dir), -1);\n        this.vel.x = dirVector.x * this.speed;\n        this.vel.y = dirVector.y * this.speed;\n    }\n\n    getDirFromAngle(moveDirAngle, sign) {\n        let minAngleDiff = 2;\n        if (sign < 0) {\n            //[N, NW, W, SW, S]\n            let westDirs = [87, 152, 65, 148, 83];\n            westDirs.forEach((dirCode) => {\n                let dirVector = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.scaleVector)((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(dirCode), -1);\n                let angle = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dot)(dirVector, {x:0,y:-1});\n                let angleDiff = Math.abs(angle - moveDirAngle);\n                if (angleDiff < minAngleDiff) {\n                    minAngleDiff = angleDiff;\n                    this.dir = dirCode;\n                }\n            })\n        } else {\n            //[N, NE, E, SE, S]\n            let eastDirs = [87, 155, 68, 151, 83]\n            eastDirs.forEach((dirCode) => {\n                let dirVector = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.scaleVector)((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(dirCode), -1);\n                let angle = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dot)(dirVector, {x:0,y:-1});\n                let angleDiff = Math.abs(angle - moveDirAngle);\n                if (angleDiff < minAngleDiff) {\n                    minAngleDiff = angleDiff;\n                    this.dir = dirCode;\n                }\n            })\n        }\n    }\n\n    \n}\n\n//# sourceURL=webpack://js_project/./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene.js */ \"./src/scene.js\");\n\n\nclass Game {\n    constructor(canvas) {\n        this.canvas = canvas;\n        this.ctx = canvas.getContext('2d');\n        this.dimx = canvas.width;\n        this.dimy = canvas.height;\n        this.center = {x: this.dimx / 2, y: this.dimy / 2};\n        this.scene = new _scene_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n        this.prevTime = Date.now();\n        this.dt = 0;\n        this.run();\n    }\n\n    run = () => {\n        let currentTime = Date.now();\n        this.dt = (currentTime - this.prevTime) / 1000;\n        this.prevTime = currentTime;\n        this.scene.run(this.dt);\n        // console.log(this.dt);\n        requestAnimationFrame(this.run);\n    }\n}\n\n//# sourceURL=webpack://js_project/./src/game.js?");

/***/ }),

/***/ "./src/hitbox.js":
/*!***********************!*\
  !*** ./src/hitbox.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Hitbox)\n/* harmony export */ });\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite.js */ \"./src/sprite.js\");\n\n\nclass Hitbox extends _sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor({ vel, pos, r, owner, dir}) {\n        super({vel: vel, pos: pos, r: r});\n        this.owner = owner;\n        this.dir = dir;\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = \"red\";\n        ctx.beginPath();\n        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);\n        ctx.fill();\n    }\n}\n\n//# sourceURL=webpack://js_project/./src/hitbox.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n/* harmony import */ var _assets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets.js */ \"./src/assets.js\");\n\n\n\nconst canvas = document.getElementById(\"game-canvas\");\nconst ctx = canvas.getContext('2d');\nconst screenSizes = {\n    \"small\": [640, 480],\n    \"large\": [960, 720]\n};\nconst setSize = (size) => {\n    canvas.width = screenSizes[size][0];\n    canvas.height = screenSizes[size][1];\n}\n\nsetSize(\"large\");\nctx.fillStyle = \"black\";\nctx.fillRect(0, 0, canvas.width, canvas.height);\n\n(async () => {\n    await (0,_assets_js__WEBPACK_IMPORTED_MODULE_1__.loadAssets)();\n    const game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n})();\n\n//# sourceURL=webpack://js_project/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _actor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor.js */ \"./src/actor.js\");\n/* harmony import */ var _hitbox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hitbox.js */ \"./src/hitbox.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\n\n\n\nclass Player extends _actor_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(pos, scene) {\n        super({\n            vel: {x: 0, y: 0}, \n            pos: pos, \n            r: 40, \n            img: playerSprites[148]['idle'],\n            health: 3,\n            speed: 200\n        });\n        this.scene = scene;\n        this.hitbox = undefined;\n        this.hitBy = undefined;\n    }\n\n    tick(dt) {\n        super.tick(dt);\n        // console.log(this.dir);\n        // this.updateDirection(this.dir);\n    }\n\n    idle() {\n        this.stateLock = false;\n        // console.log(\"i am idle!\");\n        this.setSprite('idle');\n    }\n\n    attack() {\n        let timeElapsed = Date.now() - this.timeEnteredState;\n        this.stateLock = true;\n        if (timeElapsed < 200) {\n            this.setSprite('attack_1');\n            if (!this.hitbox) {\n                this.hitbox = this.createHitbox();\n                this.scene.addHitbox(this.hitbox);\n            }\n        } else if (timeElapsed < 300) {\n            this.setSprite('attack_2');\n        } else if (timeElapsed < 400) {\n            this.setSprite('attack_3')\n            if (this.hitbox) {\n                this.scene.removeHitbox(this.hitbox);\n                this.hitbox = undefined;\n            }\n        } else {\n            this.stateLock = false;\n            this.changeState(\"idle\");\n        }\n    }\n\n    hit() {\n\n    }\n\n    moving() {\n        this.stateLock = false;\n        let timeElapsed = (Date.now() - this.timeEnteredState) % 800;\n        if (timeElapsed < 200) {\n            this.setSprite('move_1');\n        } else if (timeElapsed < 400) {\n            this.setSprite('move_2');\n        } else if (timeElapsed < 600) {\n            this.setSprite('move_3');\n        } else {\n            this.setSprite('move_4');\n        }\n    }\n\n    death() {\n\n    }\n\n    setSprite(frame) {\n        this.img = playerSprites[this.dir][frame];\n        // console.log(playerSprites[this.dir][frame]);\n    }\n\n    createHitbox() {\n        let hbr = this.r * 1.2;\n        let hbPos = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.scaleVector)((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.dirToVector)(this.dir), hbr + this.r + 4);\n        hbPos = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.scaleVector)(hbPos, -1);\n        let hitbox = new _hitbox_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ \n            pos: {\n                x: this.pos.x + hbPos.x,\n                y: this.pos.y + hbPos.y\n            },\n            r: hbr,\n            owner: this,\n            dir: this.dir\n        });\n        return hitbox;\n    }\n}\n\n//# sourceURL=webpack://js_project/./src/player.js?");

/***/ }),

/***/ "./src/scene.js":
/*!**********************!*\
  !*** ./src/scene.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Scene)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite.js */ \"./src/sprite.js\");\n/* harmony import */ var _actor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actor.js */ \"./src/actor.js\");\n/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemy.js */ \"./src/enemy.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n\n\n\n\n\nclass Scene {\n    constructor(game) {\n        this.game = game;\n        this.ctx = this.game.ctx;\n        this.center = game.center;\n        this.cameraDir = 0;\n        this.backgroundStatic = [];\n        this.gameObjects = [];\n        this.hitboxes = [];\n        this.player = new _player_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.center, this);\n        this.foregroundStatic = [];\n\n        this.addObjects();\n        this.addBackgroundStatic();\n    }\n    \n    run(dt) {\n        // console.log(dt);\n        this.tickStateMachines(dt);\n        this.getInputs();\n        this.moveObjects(dt);\n        this.translateObjects(dt);\n        this.hitDetection();\n        this.checkCollisions();\n        this.drawObjects(this.ctx);\n        // this.drawHitboxes(this.ctx);\n    }\n\n    addGameObject(obj) {\n        if (!this.gameObjects.includes(obj)) this.gameObjects.push(obj);\n    }\n\n    removeGameObject(obj) {\n        this.gameObjects.splice(this.gameObjects.indexOf(obj), 1);\n    }\n\n    addHitbox(hb) {\n        if (!this.hitboxes.includes(hb)) this.hitboxes.push(hb);\n    }\n\n    removeHitbox(hb) {\n        this.hitboxes.splice(this.hitboxes.indexOf(hb), 1);\n    }\n\n    tickStateMachines(dt) {\n        this.player.tick(dt);\n        this.gameObjects.forEach((go) => go.tick(dt))\n    }\n\n    getInputs() {\n        // console.log(key.getPressedKeyCodes());\n        let keyCodes = key.getPressedKeyCodes();\n        this.processWasd(keyCodes);\n        if (keyCodes.includes(74)) { //74 = 'j'\n            this.player.changeState(\"attack\");\n        }\n    }\n\n    processWasd(keyCodes) {\n        let wasd = [87, 65, 83, 68];\n        let reducedWasd = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.intersect)(wasd, keyCodes).slice(0,2);\n        let wasdSum = reducedWasd.reduce((acc, el) => {return acc + el}, 0);\n        if (wasdSum === 133 || wasdSum === 170) wasdSum = 0;\n        if (wasdSum !== 0 && !this.player.stateLock) this.player.dir = wasdSum;\n        if (wasdSum === 0) {\n            this.player.changeState(\"idle\");\n        } else {\n            this.player.changeState(\"moving\");\n        }\n        if (this.player.state === \"moving\") {\n            this.cameraDir = wasdSum;\n        } else {\n            this.cameraDir = 0;\n        }\n    }\n\n    moveObjects(dt) {\n        this.gameObjects.forEach((go) => {\n            go.move(dt);\n        })\n    }\n\n    translateObjects(dt) {\n        this.backgroundStatic.forEach((bg) => {\n            bg.pos.x += (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(this.cameraDir).x * this.player.speed * dt;\n            bg.pos.y += (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(this.cameraDir).y * this.player.speed * dt;\n        })\n        this.gameObjects.forEach((go) => {\n            go.pos.x += (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(this.cameraDir).x * this.player.speed * dt;\n            go.pos.y += (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(this.cameraDir).y * this.player.speed * dt;\n        })\n        this.foregroundStatic.forEach((fg) => {\n            fg.pos.x += (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(this.cameraDir).x * this.player.speed * dt;\n            fg.pos.y += (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dirToVector)(this.cameraDir).y * this.player.speed * dt;\n        })\n    }\n\n    hitDetection() {\n        this.gameObjects.forEach((go) => {\n            this.hitboxes.forEach((hb) => {\n                if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dist)(go.pos, hb.pos) < go.r + hb.r) {\n                    go.hit(hb);\n                }\n            })\n        })\n    }\n\n    checkCollisions() {\n\n    }\n\n    drawObjects(ctx) {\n        //clear screen\n        ctx.clearRect(0, 0, this.game.dimx, this.game.dimy);\n        ctx.fillStyle = \"black\";\n        ctx.fillRect(0, 0, this.game.dimx, this.game.dimy);\n        //draw bg elements\n        this.backgroundStatic.forEach((go) => {\n            go.draw(ctx);\n        })\n        //draw actors based off y pos\n        let actors = [...this.gameObjects, this.player]; //actors = all game objects including player\n        actors = actors.sort((a,b) => (a.pos.y > b.pos.y) ? 1 : -1); //sort based off y-pos\n        for (let i = 0; i < actors.length; i++) { //loop thru actors, render furthest back FIRST\n            actors[i].draw(ctx);\n        }\n        //draw fg elements\n        this.foregroundStatic.forEach((go) => {\n            go.draw(ctx);\n        })\n    }\n\n    drawHitboxes(ctx) {\n        this.hitboxes.forEach((hb) => {\n            hb.draw(ctx);\n        })\n    }\n\n    addBackgroundStatic() {\n        let offset = {x:100,y:57}; //Proper spacing between tiles\n        let wallStart = {x:this.game.dimx / 2, y: offset.y * -2}; //Start point for wall tiles\n        let rightWall = {x:wallStart.x, y:wallStart.y};\n        for (let i = 0; i < 11; i++) { //Render right side wall\n            let randomJitter = (Math.random() * 20);\n            let wall = new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n                pos: {\n                    x: rightWall.x,\n                    y: rightWall.y + randomJitter\n                },\n                img: bgSprites['wall1']\n            });\n            this.backgroundStatic.push(wall); //lower level\n            wall = new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n                pos: {\n                    x: rightWall.x,\n                    y: rightWall.y - 128 + randomJitter\n                },\n                img: bgSprites['wall1']\n            });\n            this.backgroundStatic.push(wall); //upper level\n            rightWall.x += offset.x;\n            rightWall.y += offset.y;\n        }\n        let leftWall = {x:wallStart.x - offset.x, y:wallStart.y + offset.y};\n        for (let i = 0; i < 10; i++) { //Render left side wall\n            let randomJitter = (Math.random() * 20);\n            let wall = new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n                pos: {\n                    x: leftWall.x,\n                    y: leftWall.y + randomJitter\n                },\n                img: bgSprites['wall1']\n            });\n            this.backgroundStatic.push(wall); //lower level\n            wall = new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n                pos: {\n                    x: leftWall.x,\n                    y: leftWall.y - 128 + randomJitter\n                },\n                img: bgSprites['wall1']\n            });\n            this.backgroundStatic.push(wall); //upper level\n            leftWall.x -= offset.x;\n            leftWall.y += offset.y;\n        }\n        let initialPos = {x:this.game.dimx / 2, y: 0}; //Start point for floor tiles\n        let rowStart = {x:initialPos.x, y:initialPos.y};\n        for (let i = 0; i < 10; i++) { //Render floor tiles\n            let column = {x:rowStart.x, y:rowStart.y};\n            for (let j = 0; j < 10; j++) {\n                let tile = new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n                    pos: {\n                        x: column.x,\n                        y: column.y + (Math.random() * 20)\n                    },\n                    img: bgSprites['ground1']\n                });\n                this.backgroundStatic.push(tile);\n                column.x += offset.x;\n                column.y += offset.y;\n            }\n            rowStart.x -= offset.x;\n            rowStart.y += offset.y;\n        }\n    }\n\n    addObjects() {\n        this.gameObjects.push(new _enemy_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\n            {\n                x: this.game.dimx / 2 - 100,\n                y: this.game.dimy / 2 + 50\n            },\n            this\n        ));\n    }\n}\n\n//# sourceURL=webpack://js_project/./src/scene.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Sprite)\n/* harmony export */ });\nclass Sprite {\n    constructor({ vel, pos, r, img, }) {\n        if (!vel) { this.vel = {x:0, y:0}; }\n        else {this.vel = vel;}\n        if (!pos) { this.pos = {x:0,y:0};}\n        else {this.pos = pos;}\n        if (!r) { this.r = 20;}\n        else {this.r = r;}\n        this.img = img;\n        // this.sprite = new Image(); \n        // this.sprite.src = this.img;\n        if (img) {\n            this.anchor = {\n                x: this.pos.x - (this.img.width / 2),\n                y: this.pos.y - (this.img.height / 2)\n            };\n        }\n    }\n\n    draw(ctx) {\n        if (!this.img) {\n            ctx.fillStyle = \"green\";\n            ctx.beginPath();\n            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);\n            ctx.fill();\n        } else {\n            ctx.fillStyle = \"blue\";\n            ctx.beginPath();\n            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);\n            ctx.fill();\n\n            this._updateAnchor();\n            ctx.drawImage(this.img, this.anchor.x, this.anchor.y);\n        }\n    }\n\n    _updateAnchor() {\n        this.anchor = {\n            x: this.pos.x - (this.img.width / 2),\n            y: this.pos.y - (this.img.height / 2)\n        };\n    }\n\n    move(dt) {\n        this.pos.x += (this.vel.x * dt);\n        this.pos.y += (this.vel.y * dt);\n    }\n}\n\n//# sourceURL=webpack://js_project/./src/sprite.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dirToVector\": () => (/* binding */ dirToVector),\n/* harmony export */   \"dist\": () => (/* binding */ dist),\n/* harmony export */   \"dot\": () => (/* binding */ dot),\n/* harmony export */   \"intersect\": () => (/* binding */ intersect),\n/* harmony export */   \"mag\": () => (/* binding */ mag),\n/* harmony export */   \"norm\": () => (/* binding */ norm),\n/* harmony export */   \"scaleVector\": () => (/* binding */ scaleVector)\n/* harmony export */ });\nconst norm = (vector) => {\n    let mag = dist(vector, {x:0,y:0});\n    return {\n        x: vector.x / mag,\n        y: vector.y / mag\n    }\n};\n\nconst dot = (v1, v2) => {\n    return (\n        (v1.x * v2.x) + (v1.y * v2.y)\n    ) / (mag(v1) * mag(v2));\n};\n\nconst mag = (vector) => {\n    return dist(vector, {x:0,y:0});\n};\n\nconst intersect = (arr1, arr2) => {\n    let set1 = new Set(arr1);\n    let set2 = new Set(arr2);\n    let res = new Set([...set1].filter(i => set2.has(i)));\n    return Array.from(res);\n};\n\nconst scaleVector = (vector, c) => {\n    return {\n        x: vector.x * c,\n        y: vector.y * c\n    }\n};\n\nconst dist = (v1, v2) => {\n    return Math.sqrt(\n        (v1.x - v2.x)**2 + (v1.y-v2.y)**2\n    );\n};\n\nconst dirToVector = (dirCode) => {\n    // const directionVectors = { //Octagonal\n    //     87: {x: 0, y: 1}, //w\n    //     65: {x: 1, y: 0}, //a\n    //     83: {x: 0, y: -1}, //s\n    //     68: {x: -1, y: 0}, //d\n    //     155: {x: -0.707, y: 0.707}, //wd\n    //     152: {x: 0.707, y: 0.707}, //wa\n    //     151: {x: -0.707, y: -0.707}, //sd\n    //     148: {x: 0.707, y: -0.707}, //sa\n    //     0: {x: 0, y: 0}\n    // };\n    const directionVectors = { //Isometric-accurate\n        87: {x: 0, y: 1}, //w\n        65: {x: 1, y: 0}, //a\n        83: {x: 0, y: -1}, //s\n        68: {x: -1, y: 0}, //d\n        155: {x: -0.866, y: 0.5}, //wd\n        152: {x: 0.866, y: 0.5}, //wa\n        151: {x: -0.866, y: -0.5}, //sd\n        148: {x: 0.866, y: -0.5}, //sa\n        0: {x: 0, y: 0}\n    };\n    return directionVectors[dirCode];\n};\n\n//# sourceURL=webpack://js_project/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;