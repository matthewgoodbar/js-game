window.bgSprites = {};
window.playerSprites = {};
window.enemySprites = {};

export const loadAssets = async () => {
    await loadBackgroundSprites();
    await loadPlayerSprites();
};

const loadBackgroundSprites = async () => {
    let path = '../assets/background';
    let names = [
        'ground1'
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