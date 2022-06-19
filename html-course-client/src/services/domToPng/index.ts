import {svgToCanvas} from './svgToCanvas';
import {cloneNodeAsSvg} from './cloneNodeAsSvg';
import {getStylesDefs} from './createStylesDefs';
import { getSizes } from './getSizes';

export async function domToPng(node: HTMLElement | SVGElement, width?: number, height?: number) {
    const svgStyles = await getStylesDefs(node.ownerDocument);

    const svg = await cloneNodeAsSvg(node, svgStyles, width, height);

    const {width: svgWidth, height: svgHeight} = getSizes(node, width, height);

    const canvas = await svgToCanvas(svg, svgWidth, svgHeight);

    return canvas?.toDataURL('image/png');
}
