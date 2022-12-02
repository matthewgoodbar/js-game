export const norm = (vector) => {

};

export const intersect = (arr1, arr2) => {
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);
    let res = new Set([...set1].filter(i => set2.has(i)));
    return Array.from(res);
};