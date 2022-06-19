export function getSizes(node: SVGElement | HTMLElement, outputWidth?: number, outputHeight?: number) {
    const isSvg = node.tagName === 'svg';
    const win = node.ownerDocument.defaultView as Window;

    const styles = win.getComputedStyle(node);

    const {
        boxSizing, 
        height, 
        width, 
        borderTopWidth, 
        borderBottomWidth, 
        borderLeftWidth, 
        borderRightWidth,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
    } = styles;

    if (!isSvg) {
        return {
            width: outputWidth || parseInt(node.getAttribute('width') || node.style.width || width) || 0,
            height: outputHeight|| parseInt(node.getAttribute('height') || node.style.height || height) || 0,
        }
    }

    if (boxSizing === 'border-box') return {
        height: parseInt(height),
        width: parseInt(width),
    }

    return {
        height: parseInt(height) + parseInt(borderTopWidth) + parseInt(borderBottomWidth) + parseInt(paddingTop) + parseInt(paddingBottom),
        width: parseInt(width) + parseInt(borderLeftWidth) + parseInt(borderRightWidth) + parseInt(paddingLeft) + parseInt(paddingRight),
    }
}