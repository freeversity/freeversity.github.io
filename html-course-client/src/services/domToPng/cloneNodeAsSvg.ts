import { prepareClonedNodeDeep } from './prepareClonedNodeDeep';

export async function cloneNodeAsSvg(
    node: HTMLElement | SVGElement,
    embeddedStyles: SVGDefsElement,
    outputWidth?: number,
    outputHeight?: number,
): Promise<SVGElement> {
    const clonedNode = node.cloneNode(true) as HTMLElement | SVGElement;
    const doc = node.ownerDocument;
    const win = doc.defaultView as Window;
    const isSvg = node.tagName === 'svg';

    if (!isSvg && outputWidth) {
        clonedNode.style.width = `${outputWidth}px`;
    }

    if (!isSvg && outputHeight) {
        clonedNode.style.height = `${outputHeight}px`;
    }

    await prepareClonedNodeDeep(node, clonedNode);

    const styles = clonedNode.querySelectorAll('style, link[rel=stylsheet]');

    for (let style of styles) {
        style.remove();
    }

    if (node.tagName === 'svg') {
        clonedNode.prepend(embeddedStyles);

        return clonedNode as SVGElement;
    }

    const {width, height, fontFamily, fontSize} = win.getComputedStyle(node);

    const widthNum = outputWidth ?? parseInt(width);
    const heightNum = outputHeight ?? parseInt(height);

    const foreignObject = doc.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

    foreignObject.style.height = `${heightNum}px`;
    foreignObject.style.width = `${widthNum}px`;

    const heightAttr = `${heightNum}`;
    const widthAttr = `${widthNum}`;

    /*
        FireFox does not recognize height and width as NS-attributes,
        but requires them for proper foreignObject displaying
    */

    foreignObject.setAttribute('height', heightAttr);
    foreignObject.setAttribute('width', widthAttr);

    const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.style.height = `${heightNum}px`;
    svg.style.width = `${widthNum}px`;
    svg.style.fontFamily = fontFamily;
    svg.style.fontSize = fontSize;

    /*
        FireFox requires height and width on SVG-element
        for proper drawing svg on canvas
    */

    svg.setAttribute('height',  `${heightNum}`);
    svg.setAttribute('width',  `${widthNum}`);

    foreignObject.appendChild(clonedNode);
    svg.appendChild(embeddedStyles.cloneNode(true));
    svg.appendChild(foreignObject);

    return svg;
}