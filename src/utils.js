export const norm = (vector) => {
    let mag = dist(vector, {x:0,y:0});
    return {
        x: vector.x / mag,
        y: vector.y / mag
    }
};

export const dot = (v1, v2) => {
    return (
        (v1.x * v2.x) + (v1.y * v2.y)
    ) // / (mag(v1) * mag(v2));
};

export const mag = (vector) => {
    return dist(vector, {x:0,y:0});
};

export const cos = (v1, v2) => {
    return dot(v1, v2) / (mag(v1) * mag(v2));
};

export const intersect = (arr1, arr2) => {
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);
    let res = new Set([...set1].filter(i => set2.has(i)));
    return Array.from(res);
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

export const randInt = (max) => {
    return Math.floor(Math.random() * max);
}

export const dirToVector = (dirCode) => {
    // const directionVectors = { //Octagonal
    //     87: {x: 0, y: 1}, //w
    //     65: {x: 1, y: 0}, //a
    //     83: {x: 0, y: -1}, //s
    //     68: {x: -1, y: 0}, //d
    //     155: {x: -0.707, y: 0.707}, //wd
    //     152: {x: 0.707, y: 0.707}, //wa
    //     151: {x: -0.707, y: -0.707}, //sd
    //     148: {x: 0.707, y: -0.707}, //sa
    //     0: {x: 0, y: 0}
    // };
    const directionVectors = { //Isometric-accurate
        87: {x: 0, y: 1}, //w N
        65: {x: 1, y: 0}, //a W
        83: {x: 0, y: -1}, //s S
        68: {x: -1, y: 0}, //d E
        155: {x: -0.866, y: 0.5}, //wd NE
        152: {x: 0.866, y: 0.5}, //wa NW
        151: {x: -0.866, y: -0.5}, //sd SE
        148: {x: 0.866, y: -0.5}, //sa SW
        0: {x: 0, y: 0}
    };
    return directionVectors[dirCode];
};

export const dirScaleFactor = (dirCode) => {
    if (dirCode === 87 || dirCode === 83) return 0.577;
    if (dirCode === 65 || dirCode === 68) return 1;
    return mag({x:0.707,y:0.408});
};

export const blockedFromDir = (blockDir, attackDir) => {
    let res = false;
    switch (blockDir) {
        case 87: //N
            res = [83, 151, 148].includes(attackDir);
            break;
        case 155: //NE
            res = [65, 83, 148].includes(attackDir);
            break;
        case 68: //E
            res = [65, 148, 152].includes(attackDir);
            break;
        case 151: //SE
            res = [152, 87, 65].includes(attackDir);
            break;
        case 83: //S
            res = [87, 155, 152].includes(attackDir);
            break;
        case 148: //SW
            res = [155, 87, 68].includes(attackDir);
            break;
        case 65: //W
            res = [68, 155, 151].includes(attackDir);
            break;
        case 152: //NW
            res = [151, 83, 68].includes(attackDir);
            break;
    }
    return res;
};