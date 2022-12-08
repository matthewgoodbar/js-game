(()=>{"use strict";const t=t=>{let s=a(t,{x:0,y:0});return{x:t.x/s,y:t.y/s}},s=(t,s)=>t.x*s.x+t.y*s.y,e=t=>a(t,{x:0,y:0}),i=(t,i)=>s(t,i)/(e(t)*e(i)),h=(t,s)=>({x:t.x*s,y:t.y*s}),a=(t,s)=>Math.sqrt((t.x-s.x)**2+(t.y-s.y)**2),o=t=>Math.floor(Math.random()*t),r=t=>({87:{x:0,y:1},65:{x:1,y:0},83:{x:0,y:-1},68:{x:-1,y:0},155:{x:-.866,y:.5},152:{x:.866,y:.5},151:{x:-.866,y:-.5},148:{x:.866,y:-.5},0:{x:0,y:0}}[t]),l=t=>87===t||83===t?.577:65===t||68===t?1:e({x:.707,y:.408});class c{constructor({pos:t,delta:s,normal:e}){this.pos=t,t||(this.pos={x:0,y:0}),this.delta=s,s||(this.delta={x:50,y:50}),this.normal=e}distToObj(t){let i=this.pos,a=this.delta,o={x:t.pos.x-i.x,y:t.pos.y-i.y},r=s(o,a)/e(a)**2,l=h({x:a.x,y:a.y},r);return e({x:t.pos.x-(l.x+i.x),y:t.pos.y-(l.y+i.y)})}draw(t){let s=this.pos,e=this.delta;t.strokeStyle="yellow",t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(s.x+e.x,s.y+e.y),t.stroke()}}class n{constructor({vel:t,pos:s,r:e,img:i,color:h}){this.vel=t||{x:0,y:0},this.pos=s||{x:0,y:0},this.r=e||20,this.color=h||"white",this.img=i,i&&(this.anchor={x:this.pos.x-this.img.width/2,y:this.pos.y-this.img.height/2})}draw(t){this.img?(this._updateAnchor(),t.drawImage(this.img,this.anchor.x,this.anchor.y)):(t.fillStyle=this.color,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI),t.fill())}_updateAnchor(){this.anchor={x:this.pos.x-this.img.width/2,y:this.pos.y-this.img.height/2}}move(t){this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}}class d extends n{constructor({vel:t,pos:s,r:e,owner:i,dir:h}){super({vel:t,pos:s,r:e}),this.owner=i,this.dir=h}draw(t){t.fillStyle="red",t.beginPath(),t.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI),t.fill()}}class p{constructor(t,s,e){this.pos=t,this.scene=s,this.type=e?"block":"hit",this.setSprite(`${this.type}_1`),this.img&&(this.anchor={x:this.pos.x-this.img.width/2,y:this.pos.y-this.img.height/2}),this.scene.addEffect(this),this.timeSpawned=Date.now()}draw(t){let s=Date.now()-this.timeSpawned;s<100?(this.setSprite(`${this.type}_1`),t.drawImage(this.img,this.anchor.x,this.anchor.y)):s<200?(this.setSprite(`${this.type}_2`),t.drawImage(this.img,this.anchor.x,this.anchor.y)):s<300?(this.setSprite(`${this.type}_3`),t.drawImage(this.img,this.anchor.x,this.anchor.y)):this.scene.removeEffect(this)}setSprite(t){this.img=effectSprites[t]}}class y extends n{constructor({vel:t,pos:s,r:e,health:i,speed:h,img:a,dir:o,state:r},l){super({vel:t,pos:s,r:e,img:a}),this.health=i||5,this.speed=h||60,this.dir=o||148,this.state=r||"idle",this.stateLock=!1,this.timeEnteredState=new Date,this.scene=l,this.hitbox=void 0,this.hitBy=void 0,this.timeHit=void 0,this.states={idle:["attack","moving","death"],attack:["idle","death"],moving:["idle","attack","death"],death:[]}}tick(t){switch(this.state){case"idle":this.idle();break;case"attack":this.attack();break;case"moving":this.moving();break;case"death":this.death()}this.hitBy&&this._hit(t)}changeState(t){this.stateLock&&"death"!==t||this.states[this.state].includes(t)&&(this.hitbox&&(this.scene.removeHitbox(this.hitbox),this.hitbox=void 0),this.state=t,this.timeEnteredState=new Date)}idle(){}attack(){}moving(){}death(){}hit(t){this.hitBy||(this.hitBy=t,this.timeHit=Date.now(),this.blockCheck(t))}blockCheck(t){this.health>0&&this.health--,this.addHitEffect(t)}addHitEffect(t){let s=h(r(t.dir),20);new p({x:s.x+this.pos.x,y:s.y+this.pos.y},this.scene,!1),this.scene.sound&&new Audio("../assets/sounds/hit1.wav").play()}_hit(t){let s=Date.now()-this.timeHit;s<400?(this.pushBack(400-s,t),this.color="red"):(this.vel={x:0,y:0},this.hitBy=void 0,this.color="white")}pushBack(t,s){let e=r(this.hitBy.dir);e=h(e,-1),this.pos.x+=e.x*t*s,this.pos.y+=e.y*t*s}createHitbox(t=1.2){let s=this.r*t,e=h(r(this.dir),(s+this.r+4)*l(this.dir)*-1);return new d({pos:{x:this.pos.x+e.x,y:this.pos.y+e.y},r:s,owner:this,dir:this.dir})}collisionHandle(t){let s=Math.abs(t.distToObj(this)-this.r),e=h({x:t.normal.x,y:t.normal.y},-1*s);this.pos.x+=e.x,this.pos.y+=e.y}disperse(){}}class x extends y{constructor(t,s){super({vel:{x:0,y:0},pos:t,r:40,img:void 0,health:3,speed:60,state:"moving"},s),this.player=this.scene.player,this.absoluteSpeed=this.speed,this.velVector={x:0,y:0},setInterval((()=>{this.stateLock||(this._setDirFromAngle(),this._setVelAndSpeed())}),500)}tick(t){this.health<=0&&this.changeState("death"),this.setSprite("idle"),super.tick(t)}idle(){this.stateLock=!1,a(this.player.pos,this.pos)<120?this.changeState("attack"):this.changeState("moving")}attack(){this._setDirFromAngle(),this.stateLock=!0,this.vel={x:0,y:0};let t=Date.now()-this.timeEnteredState;t<400?(this.setSprite("attack_1"),this.color="white",this.scene.sound&&(this.attackSoundPlayed||(this.attackSoundPlayed=!0,new Audio("../assets/sounds/attack2.wav").play()))):t<800?(this.setSprite("attack_2"),this.hitbox||(this.hitbox=this.createHitbox(),this.scene.addHitbox(this.hitbox))):t<1e3?(this.setSprite("attack_3"),this.hitbox&&(this.scene.removeHitbox(this.hitbox),this.hitbox=void 0)):t<1200?this.setSprite("attack_4"):(this.stateLock=!1,this.color="green",this.changeState("idle"),this.attackSoundPlayed=void 0)}death(){let t=Date.now()-this.timeEnteredState;this.stateLock=!0,this.color="black",t<600?this.setSprite("death_1"):t<800?this.setSprite("death_2"):t<1e3?this.setSprite("death_3"):t<1200?this.setSprite("death_4"):(this.scene.removeGameObject(this),this.scene.score+=200,this.player.killCount++)}moving(){this.stateLock=!1;let t=(Date.now()-this.timeEnteredState)%800;t<400?this.setSprite("idle"):t<600?this.setSprite("move_1"):t<800&&this.setSprite("move_2"),this.vel.x=this.velVector.x*this.speed,this.vel.y=this.velVector.y*this.speed,a(this.player.pos,this.pos)<120&&this.changeState("attack")}setSprite(t){this.img=enemySprites[this.dir][t]}_setVelAndSpeed(){this.velVector=h(r(this.dir),-1),this.speed=this.absoluteSpeed*l(this.dir)}_setDirFromAngle(){if(this.stateLock)return;let s=t({x:this.player.pos.x-this.pos.x,y:this.player.pos.y-this.pos.y}),e=i(s,{x:0,y:-1}),a=2;s.x<0?[87,152,65,148,83].forEach((t=>{let s=h(r(t),-1),o=i(s,{x:0,y:-1}),l=Math.abs(o-e);l<a&&(a=l,this.dir=t)})):[87,155,68,151,83].forEach((t=>{let s=h(r(t),-1),o=i(s,{x:0,y:-1}),l=Math.abs(o-e);l<a&&(a=l,this.dir=t)}))}disperse(s,e){let i=Math.abs(a(s.pos,this.pos)-(s.r+this.r-e)),o=h(t({x:this.pos.x-s.pos.x,y:this.pos.y-s.pos.y}),i),r=h(o,-1);this.pos.x+=o.x,this.pos.y+=o.y,s.pos.x+=r.x,s.pos.y+=r.y}}class m extends y{constructor(t,s){super({vel:{x:0,y:0},pos:t,r:40,img:playerSprites[148].idle,health:5,speed:400,color:"white"},s),this.mockPush={x:0,y:0},this.collisionCorrection={x:0,y:0},this.unscaledSpeed=this.speed,this.strafe=!1,this.potions=3,this.killCount=0,this.states={idle:["attack","moving","death","heal"],attack:["idle","death"],moving:["idle","attack","death","heal"],death:[],heal:["idle","death"]}}blocking(){return("idle"===this.state||"moving"===this.state)&&this.strafe}tick(t){super.tick(t),"heal"===this.state&&this.heal(),this.strafe&&(this.speed=.3*this.unscaledSpeed)}idle(){this.stateLock=!1,this.setSprite("idle"),this.strafe&&this.setSprite("strafe_1")}heal(){this.stateLock=!0;let t=Date.now()-this.timeEnteredState;t<800?this.setSprite("heal_1"):t<900?(this.usedPotion||(this.usedPotion=!0,this.usePotion()),this.setSprite("heal_2")):t<1e3?this.setSprite("heal_3"):t<1200?this.setSprite("heal_4"):(this.usedPotion=void 0,this.stateLock=!1,this.changeState("idle"))}attack(){let t=Date.now()-this.timeEnteredState;this.stateLock=!0,t<200?(this.setSprite("attack_1"),this.hitbox||(this.scene.sound&&sounds.attack1.play(),this.hitbox=this.createHitbox(),this.scene.addHitbox(this.hitbox))):t<300?this.setSprite("attack_2"):t<400?(this.setSprite("attack_3"),this.hitbox&&(this.scene.removeHitbox(this.hitbox),this.hitbox=void 0)):(this.stateLock=!1,this.changeState("idle"))}hit(t){super.hit(t),this.health<=0&&this.scene.endGame()}blockCheck(t){this.blocking()&&((t,s)=>{let e=!1;switch(t){case 87:e=[83,151,148].includes(s);break;case 155:e=[65,83,148].includes(s);break;case 68:e=[65,148,152].includes(s);break;case 151:e=[152,87,65].includes(s);break;case 83:e=[87,155,152].includes(s);break;case 148:e=[155,87,68].includes(s);break;case 65:e=[68,155,151].includes(s);break;case 152:e=[151,83,68].includes(s)}return e})(this.dir,t.dir)?(this.addHitEffect(t,!0),this.successfulBlock=!0):(this.health>0&&this.health--,this.addHitEffect(t,!1),this.successfulBlock=void 0)}addHitEffect(t,s){let e=h(r(t.dir),20);new p({x:e.x+this.pos.x,y:e.y+this.pos.y},this.scene,s),this.scene.sound&&(s||new Audio("../assets/sounds/hit1.wav").play())}_hit(t){let s=Date.now()-this.timeHit;s<400?(this.pushBack(400-s,t),this.successfulBlock||(this.color="red"),this.img.style.opacity=0):(this.mockPush={x:0,y:0},this.hitBy=void 0,this.color="white")}pushBack(t,s){let e=r(this.hitBy.dir);e=h(e,-1),this.mockPush.x=e.x*t*s*-1,this.mockPush.y=e.y*t*s*-1}moving(){this.speed=this.unscaledSpeed*l(this.dir),this.stateLock=!1;let t=(Date.now()-this.timeEnteredState)%800;t<200?(this.setSprite("move_1"),this.strafe&&this.setSprite("strafe_3")):t<400?(this.setSprite("move_2"),this.strafe&&this.setSprite("strafe_2")):t<600?(this.setSprite("move_3"),this.strafe&&this.setSprite("strafe_1")):(this.setSprite("move_4"),this.strafe&&this.setSprite("strafe_2"))}death(){}addHealth(t){this.health+=t,this.health>=5&&(this.health=5)}addPotion(){this.potions++,this.potions>=3&&(this.potions=3)}usePotion(){this.potions>0&&(this.addHealth(3),this.potions--)}collisionHandle(t){let s=Math.abs(t.distToObj(this)-this.r),e=h({x:t.normal.x,y:t.normal.y},s);this.collisionCorrection.x+=e.x,this.collisionCorrection.y+=e.y}setSprite(t){this.img=playerSprites[this.dir][t]}}class f{constructor({pos:t},s){this.pos=t,t||(this.pos={x:0,y:0}),this.scene=s,this.spawning=!1,this.enemy=void 0}tick(t){if(this.spawning){let t=Date.now()-this.timeActivated;t<200?this.setSprite("spawn_3"):t<400?this.setSprite("spawn_2"):t<600?this.setSprite("spawn_1"):t<700?this.enemy||(this.enemy=new x({x:this.pos.x,y:this.pos.y},this.scene),this.scene.addGameObject(this.enemy)):t<800?this.setSprite("spawn_2"):t<1e3?this.setSprite("spawn_3"):(this.img=void 0,this.spawning=!1,this.enemy=void 0)}}spawnEnemy(){this.timeActivated=Date.now(),this.spawning=!0}setSprite(t){this.img=effectSprites[t]}draw(t){this.img&&t.drawImage(this.img,this.pos.x-this.img.width/2,this.pos.y-this.img.height/2)}}class g{constructor(t){this.scene=t,this.dim={x:this.scene.game.dimx,y:this.scene.game.dimy},this.player=this.scene.player}draw(t){if(this.scene.gameOver)return void this._gameOverScreen(t);let s=this.dim,e=40,i=`Health: ${this.player.health}`,h=`Score: ${this.scene.score}`,a=`Potions: ${this.player.potions}`;t.font="italic 40px Times New Roman",t.textAlign="left",t.strokeStyle="black",t.lineWidth=4,t.fillStyle=this.player.color,t.strokeText(i,e,50),t.fillText(i,e,50),t.fillStyle="white",t.strokeText(a,e,100),t.fillText(a,e,100),t.strokeText(h,e,s.y-50),t.fillText(h,e,s.y-50)}_gameOverScreen(t){this._shadowOverlay(t);let s=this.dim,e=80;t.font=`italic ${e}px Times New Roman`,t.textAlign="center",t.strokeStyle="black",t.lineWidth=4,t.fillStyle="white";let i=s.y/2-40,h="GAME OVER";t.strokeText(h,s.x/2,i-40),t.fillText(h,s.x/2,i-40),e=40,t.font=`italic ${e}px Times New Roman`,t.strokeText("~",s.x/2,i),t.fillText("~",s.x/2,i);let a=`You scored ${this.scene.score} points`;t.strokeText(a,s.x/2,i+40),t.fillText(a,s.x/2,i+40);let o=`and defeated ${this.player.killCount} enemies.`;t.strokeText(o,s.x/2,i+100),t.fillText(o,s.x/2,i+100),e=30,t.font=`italic ${e}px Times New Roman`;let r="Press r to restart.";t.strokeText(r,s.x/2,i+160),t.fillText(r,s.x/2,i+160)}_shadowOverlay(t){let s=this.dim;t.globalAlpha=.5,t.fillStyle="black",t.fillRect(0,0,s.x,s.y),t.globalAlpha=1}}class w extends y{constructor(t,s){super({pos:t}),this.scene=s,this.img=bgSprites.totem_1}hit(t){this.whacked||(this.whacked=!0,this.scene.startGame(),this.img=bgSprites.totem_2),super.hit(t)}}class u{constructor(t){this.game=t,this.ctx=this.game.ctx,this.center=t.center,this.cameraDir=0,this.boundaries=[],this.spawnPoints=[],this.backgroundStatic=[],this.gameObjects=[],this.effects=[],this.hitboxes=[],this.player=new m(this.center,this),this.foregroundStatic=[],this.floorTileOffset={x:100,y:57},this.addBackgroundStatic(),this.addBoundaries(),this.addSpawnPoints(),this.gameStart=!1,this.gameOver=!1,this.score=0,this.sound=!1,this.hud=new g(this),this.gameObjects.push(new w({x:this.terrainOrigin.x+2*this.floorTileOffset.x,y:this.terrainOrigin.y+5*this.floorTileOffset.y},this))}run(t){this.gameOver?(key.getPressedKeyCodes().includes(82)&&this.game.restart(),this.drawObjects(this.ctx),this.drawHud(this.ctx)):(this.gameStart&&this.incrementScore(t),this.tickStateMachines(t),this.getInputs(),this.checkCollisions(),this.moveObjects(t),this.translateObjects(t),this.hitDetection(),this.drawObjects(this.ctx),this.drawHud(this.ctx))}startGame(){this.gameStart||(this.gameStart=!0,this.spawnInterval=setInterval((()=>{this.spawnPoints[o(this.spawnPoints.length)].spawnEnemy()}),2500))}endGame(){this.gameOver=!0,clearInterval(this.spawnInterval)}addGameObject(t){this.gameObjects.includes(t)||this.gameObjects.push(t)}removeGameObject(t){this.gameObjects.splice(this.gameObjects.indexOf(t),1)}addHitbox(t){this.hitboxes.includes(t)||this.hitboxes.push(t)}removeHitbox(t){this.hitboxes.splice(this.hitboxes.indexOf(t),1)}addEffect(t){this.effects.includes(t)||this.effects.push(t)}removeEffect(t){this.effects.splice(this.effects.indexOf(t),1)}incrementScore(t){this.score+=Math.floor(100*t)}tickStateMachines(t){this.player.tick(t),[...this.gameObjects,...this.spawnPoints].forEach((s=>s.tick(t)))}getInputs(){let t=key.getPressedKeyCodes();this.processWasd(t),t.includes(74)&&this.player.changeState("attack"),t.includes(73)?this.player.strafe=!0:this.player.strafe=!1,t.includes(79)&&this.player.potions>0&&this.player.changeState("heal")}processWasd(t){let s=((t,s)=>{let e=new Set([87,65,83,68]),i=new Set(s),h=new Set([...e].filter((t=>i.has(t))));return Array.from(h)})(0,t).slice(0,2).reduce(((t,s)=>t+s),0);133!==s&&170!==s||(s=0),0===s||this.player.stateLock||this.player.strafe||(this.player.dir=s),0===s?this.player.changeState("idle"):this.player.changeState("moving"),"moving"===this.player.state?this.cameraDir=s:this.cameraDir=0}moveObjects(t){this.gameObjects.forEach((s=>{s.move(t)}))}translateObjects(t){let s=r(this.cameraDir),e=this.player.speed,i=h(s,e*t);i={x:i.x+this.player.mockPush.x+this.player.collisionCorrection.x,y:i.y+this.player.mockPush.y+this.player.collisionCorrection.y},this.player.collisionCorrection.x=0,this.player.collisionCorrection.y=0,[this.backgroundStatic,this.gameObjects,this.effects,this.hitboxes,this.spawnPoints,this.boundaries,this.foregroundStatic].forEach((t=>{t.forEach((t=>{t.pos.x+=i.x,t.pos.y+=i.y}))}))}hitDetection(){this.gameObjects.forEach((t=>{this.hitboxes.forEach((s=>{a(t.pos,s.pos)<t.r+s.r&&s.owner===this.player&&t.hit(s)}))})),this.hitboxes.forEach((t=>{a(this.player.pos,t.pos)<this.player.r+t.r&&t.owner!==this.player&&this.player.hit(t)}))}checkCollisions(){this.boundaries.forEach((t=>{this.gameObjects.forEach((s=>{t.distToObj(s)<s.r&&s.collisionHandle(t)})),t.distToObj(this.player)<this.player.r&&this.player.collisionHandle(t)}));for(let t=1;t<this.gameObjects.length;t++)for(let s=0;s<t;s++){let e=this.gameObjects[t],i=this.gameObjects[s];a(e.pos,i.pos)<e.r+i.r-20&&e.disperse(i,20)}}drawObjects(t){t.clearRect(0,0,this.game.dimx,this.game.dimy),t.fillStyle="black",t.fillRect(0,0,this.game.dimx,this.game.dimy),this.backgroundStatic.forEach((s=>{s.draw(t)}));let s=[...this.gameObjects,...this.spawnPoints,this.player];s=s.sort(((t,s)=>t.pos.y>s.pos.y?1:-1));for(let e=0;e<s.length;e++)s[e].draw(t);this.effects.forEach((s=>{s.draw(t)})),this.foregroundStatic.forEach((s=>{s.draw(t)}))}drawHud(t){this.hud.draw(t)}drawHitboxes(t){this.hitboxes.forEach((s=>{s.draw(t)}))}drawBoundaries(t){this.boundaries.forEach((s=>{s.draw(t)}))}drawSpawnPoints(t){this.spawnPoints.forEach((s=>{s.draw(t)}))}addBackgroundStatic(){let t=this.floorTileOffset,s={x:this.game.dimx/2,y:-2*t.y},e={x:s.x,y:s.y};for(let s=0;s<11;s++){let s=20*Math.random(),i=new n({pos:{x:e.x,y:e.y+s},img:bgSprites.wall0});this.backgroundStatic.push(i),i=new n({pos:{x:e.x,y:e.y-128+s},img:bgSprites.wall0}),this.backgroundStatic.push(i),e.x+=t.x,e.y+=t.y}let i={x:s.x-t.x,y:s.y+t.y};for(let s=0;s<10;s++){let s=20*Math.random(),e=new n({pos:{x:i.x,y:i.y+s},img:bgSprites.wall0});this.backgroundStatic.push(e),e=new n({pos:{x:i.x,y:i.y-128+s},img:bgSprites.wall0}),this.backgroundStatic.push(e),i.x-=t.x,i.y+=t.y}let h={x:this.game.dimx/2,y:0};this.terrainOrigin={x:h.x,y:h.y};let a={x:h.x,y:h.y};for(let s=0;s<10;s++){let s={x:a.x,y:a.y};for(let e=0;e<10;e++){let e=new n({pos:{x:s.x,y:s.y+20*Math.random()},img:bgSprites[`ground${o(2)}`]});this.backgroundStatic.push(e),s.x+=t.x,s.y+=t.y}a.x-=t.x,a.y+=t.y}}addBoundaries(){let t=new c({pos:{x:this.terrainOrigin.x-10*this.floorTileOffset.x,y:8*this.floorTileOffset.y},delta:{x:10*this.floorTileOffset.x,y:10*-this.floorTileOffset.y},normal:r(151)});this.boundaries.push(t);let s=new c({pos:{x:this.terrainOrigin.x+10*this.floorTileOffset.x,y:8*this.floorTileOffset.y},delta:{x:10*-this.floorTileOffset.x,y:10*-this.floorTileOffset.y},normal:r(148)});this.boundaries.push(s);let e=new c({pos:{x:this.terrainOrigin.x+10*this.floorTileOffset.x,y:8.6*this.floorTileOffset.y},delta:{x:10*-this.floorTileOffset.x,y:10*this.floorTileOffset.y},normal:r(152)});this.boundaries.push(e);let i=new c({pos:{x:this.terrainOrigin.x-10*this.floorTileOffset.x,y:8.6*this.floorTileOffset.y},delta:{x:10*this.floorTileOffset.x,y:10*this.floorTileOffset.y},normal:r(155)});this.boundaries.push(i)}addSpawnPoints(){let t=this.terrainOrigin,s=this.floorTileOffset;[{x:t.x,y:t.y-s.y},{x:t.x-9*s.x,y:t.y+8*s.y},{x:t.x+9*s.x,y:t.y+8*s.y},{x:t.x,y:t.y+17*s.y},{x:t.x-4.5*s.x,y:t.y+3.5*s.y},{x:t.x+4.5*s.x,y:t.y+3.5*s.y},{x:t.x+4.5*s.x,y:t.y+12.5*s.y},{x:t.x-4.5*s.x,y:t.y+12.5*s.y}].forEach((t=>{let s=new f({pos:t},this);this.spawnPoints.push(s)}))}addObjects(){this.gameObjects.push(new x({x:this.game.dimx/2-100,y:this.game.dimy/2+50},this)),this.gameObjects.push(new x({x:this.game.dimx/2+100,y:this.game.dimy/2+50},this)),this.gameObjects.push(new x({x:this.game.dimx/2+50,y:this.game.dimy/2+150},this))}}class S{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.dimx=t.width,this.dimy=t.height,this.center={x:this.dimx/2,y:this.dimy/2},this.scene=new u(this),this.prevTime=Date.now(),this.dt=0,this.run()}run=()=>{let t=Date.now();this.dt=(t-this.prevTime)/1e3,this.prevTime=t,this.scene.run(this.dt),requestAnimationFrame(this.run)};restart(){this.scene=new u(this)}}window.bgSprites={},window.playerSprites={},window.enemySprites={},window.effectSprites={},window.sounds={};const b=document.getElementById("game-canvas"),k=b.getContext("2d"),v={s:[640,480],m:[800,600],l:[960,720],s169:[800,450],l169:[1280,720]};b.width=v.l169[0],b.height=v.l169[1],k.fillStyle="black",k.fillRect(0,0,b.width,b.height),(async()=>{await(async()=>(await(async()=>{["ground0","ground1","archway0","wall0","totem_1","totem_2"].forEach((t=>{let s=new Image;s.src=`./assets/background/${t}.png`,bgSprites[t]=s}))})(),await(async()=>{let t=["attack_1","attack_2","attack_3","idle","move_1","move_2","move_3","move_4","strafe_1","strafe_2","strafe_3","heal_1","heal_2","heal_3","heal_4"];[148,65,152,87,155,68,151,83].forEach((s=>{playerSprites[s]={},t.forEach((t=>{let e=new Image;e.src=`./assets/player/${s}/${t}.png`,playerSprites[s][t]=e}))}))})(),await(async()=>{let t=["attack_1","attack_2","attack_3","attack_4","idle","move_1","move_2","death_1","death_2","death_3","death_4"];[148,65,152,87,155,68,151,83].forEach((s=>{enemySprites[s]={},t.forEach((t=>{let e=new Image;e.src=`./assets/enemy/${s}/${t}.png`,enemySprites[s][t]=e}))}))})(),await(async()=>{["spawn_1","spawn_2","spawn_3","block_1","block_2","block_3","hit_1","hit_2","hit_3"].forEach((t=>{let s=new Image;s.src=`./assets/effects/${t}.png`,effectSprites[t]=s}))})(),!0))(),new S(b)})()})();