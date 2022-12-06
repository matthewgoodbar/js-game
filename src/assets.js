window.bgSprites = {};
window.playerSprites = {};
window.enemySprites = {};

export const loadAssets = async () => {
    await loadBackgroundSprites();
    await loadPlayerSprites();
    await loadEnemySprites();
    return true;
};

const loadBackgroundSprites = async () => {
    let path = '../assets/background';
    let names = [
        'ground0', 'ground1', 'archway0', 'wall0'
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
        'move_1', 'move_2', 'move_3', 'move_4'
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
        'attack_1', 'attack_2', 'attack_3',
        'idle',
        'move_1', 'move_2'
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