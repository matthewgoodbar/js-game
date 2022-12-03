window.sprites = [];

export const loadAssets = async (arr) => {
    let loadedImageCount = 0;
    for (let i = 0; i < arr.length; i++) {
        let img = new Image();
        img.onload = imageLoaded;
        img.src = arr[i];
        window.sprites.push(img);
    }

    function imageLoaded(e) {
        loadedImageCount++;
        if (loadedImageCount >= arr.length) return;
    }
};