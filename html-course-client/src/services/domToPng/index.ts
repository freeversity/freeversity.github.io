import {svgToCanvas} from './svgToCanvas';
import {cloneNodeAsSvg} from './cloneNodeAsSvg';
import {getStylesDefs} from './createStylesDefs';

export async function domToPng(node: HTMLElement | SVGElement, width?: number, height?: number) {
    const svgStyles = await getStylesDefs(node.ownerDocument);

    const svg = await cloneNodeAsSvg(node, svgStyles, width, height);

    const canvas = await svgToCanvas(svg);

    return canvas?.toDataURL('image/png');
}
