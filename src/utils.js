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
    ) / (mag(v1) * mag(v2));
};

export const mag = (vector) => {
    return dist(vector, {x:0,y:0});
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
        87: {x: 0, y: 1}, //w
        65: {x: 1, y: 0}, //a
        83: {x: 0, y: -1}, //s
        68: {x: -1, y: 0}, //d
        155: {x: -0.866, y: 0.5}, //wd
        152: {x: 0.866, y: 0.5}, //wa
        151: {x: -0.866, y: -0.5}, //sd
        148: {x: 0.866, y: -0.5}, //sa
        0: {x: 0, y: 0}
    };
    return directionVectors[dirCode];
};

export const dirScaleFactor = (dirCode) => {
    if (dirCode === 87 || dirCode === 83) return 0.577;
    if (dirCode === 65 || dirCode === 68) return 1;
    return mag({x:0.707,y:0.408});
};