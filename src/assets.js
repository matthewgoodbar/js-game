window.bgSprites = {};
window.playerSprites = {};
window.enemySprites = {};
window.effectSprites = {};

export const loadAssets = async () => {
    await loadBackgroundSprites();
    await loadPlayerSprites();
    await loadEnemySprites();
    await loadEffectSprites();
    return true;
};

const loadBackgroundSprites = async () => {
    let path = '../assets/background';
    let names = [
        'ground0', 'ground1', 'archway0', 'wall0', 'totem_1', 'totem_2'
    ];
    names.forEach((name) => {
        let img = new Image();
        img.src = `${path}/${name}.png`;
        bgSprites[name] = img;
    })
};

const loadPlayerSprites = async () => {
    let path = '../assets/player';
    let dirs = [148, 65, 152, 87, 155, 68, 151, 83];
    let frames = [
        'attack_1', 'attack_2', 'attack_3', 
        'idle', 
        'move_1', 'move_2', 'move_3', 'move_4',
        'strafe_1', 'strafe_2', 'strafe_3',
        'heal_1', 'heal_2', 'heal_3', 'heal_4'
    ];
    dirs.forEach((dir) => {
        playerSprites[dir] = {};
        frames.forEach((frame) => {
            let img = new Image();
            img.src = `${path}/${dir}/${frame}.png`;
            playerSprites[dir][frame] = img;
        })
    })
};

const loadEnemySprites = async () => {
    let path = '../assets/enemy';
    let dirs = [148, 65, 152, 87, 155, 68, 151, 83];
    let frames = [
        'attack_1', 'attack_2', 'attack_3', 'attack_4',
        'idle',
        'move_1', 'move_2',
        'death_1', 'death_2', 'death_3', 'death_4'
    ];
    dirs.forEach((dir) => {
        enemySprites[dir] = {};
        frames.forEach((frame) => {
            let img = new Image();
            img.src = `${path}/${dir}/${frame}.png`;
            enemySprites[dir][frame] = img;
        })
    })
};

const loadEffectSprites = async () => {
    let path = '../assets/effects';
    let names = [
        'spawn_1', 'spawn_2', 'spawn_3',
        'block_1', 'block_2', 'block_3',
        'hit_1', 'hit_2', 'hit_3'
    ];
    names.forEach((name) => {
        let img = new Image();
        img.src = `${path}/${name}.png`;
        effectSprites[name] = img;
    })
};