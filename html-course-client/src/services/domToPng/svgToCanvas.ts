export async function svgToCanvas(
    svg: SVGElement,
): Promise<HTMLCanvasElement | null> {
    const svgString = new XMLSerializer()
        .serializeToString(svg);
    const height = svg.getAttributeNS('http://www.w3.org/2000/svg', 'height') || svg.style.height;
    const width = svg.getAttributeNS('http://www.w3.org/2000/svg', 'width') || svg.style.width;

    const canvas = document.createElement('canvas');

    canvas.height = parseInt(height);
    canvas.width = parseInt(width);

    const canvasCtx = canvas.getContext('2d');

    if (!canvasCtx) return null;

    const image = new Image();
    const svg64 = btoa(unescape(encodeURIComponent(svgString)));
    const imageUrl = `data:image/svg+xml;base64,${svg64}`;

    image.src = imageUrl;
    image.width = parseInt(width);
    image.height = parseInt(height);

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
