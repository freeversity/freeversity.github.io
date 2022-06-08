import pixelmatch from 'pixelmatch';

export function imageDiff(imageA: HTMLImageElement, imageB: HTMLImageElement, width: number, height: number) {
    const canvasA = convertImageToCanvas(imageA);
    const canvasB = convertImageToCanvas(imageB, width, height);

    const ctxA = canvasA.getContext("2d");
    const ctxB = canvasB.getContext("2d");

    let imgDataBefore = ctxA?.getImageData(0,0,canvasA.width, canvasA.height);
    let imgDataAfter = ctxB?.getImageData(0,0, canvasA.width, canvasA.height);   

    const imgDataOutput = new ImageData(width, height);

    const diffPixels = pixelmatch(
        imgDataBefore!.data, 
        imgDataAfter!.data, 
        imgDataOutput.data, 
        width, 
        height, 
        {includeAA: true}
    );

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx!.putImageData(imgDataOutput, 0, 0);
    
    return {diffUrl: canvas!.toDataURL('image/png'), match: 1 - (diffPixels / (width * height))};
}

function convertImageToCanvas(image: HTMLImageElement, width?: number, height?: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width ?? image.width;
    canvas.height = height ?? image.height;
    canvas.getContext("2d")?.drawImage(image, 0, 0);

    return canvas;
}
