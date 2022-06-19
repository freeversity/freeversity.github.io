export async function svgToCanvas(
    svg: SVGElement,
    width: number,
    height: number,
): Promise<HTMLCanvasElement | null> {
    const svgString = new XMLSerializer()
        .serializeToString(svg);

    const canvas = document.createElement('canvas');

    canvas.height = height;
    canvas.width = width;

    const canvasCtx = canvas.getContext('2d');

    const debugContainer = document.body.querySelector('#debug-screenshots');

    if (debugContainer) {
        debugContainer.innerHTML = '';
        // debugContainer.append(svg, canvas);
    }

    if (!canvasCtx) return null;

    const image = new Image();
    const svg64 = btoa(unescape(encodeURIComponent(svgString)));
    const imageUrl = `data:image/svg+xml;base64,${svg64}`;

    image.src = imageUrl;
    image.width = width;
    image.height = height;

    await new Promise((res) => {
        image.onload = () => {
            /*
                Safari needs some async timeout to load embedded fonts for image.
                Otherwise fonts won't be drawn on the canvas.
            */
            requestAnimationFrame(res);
        };
    });

    canvasCtx.drawImage(image, 0, 0);

    return canvas;
}
