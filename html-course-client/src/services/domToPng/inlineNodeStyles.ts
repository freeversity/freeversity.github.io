export async function inlineStylesDeepAsync(
    node: HTMLElement | SVGElement,
    clonedNode: HTMLElement | SVGElement,
    container: HTMLElement,
    dummyStyles: {[key: string]: CSSStyleDeclaration | undefined},
    canLoadDataUrls?: boolean,
): Promise<void> {
    const children = [...node.children] as Array<HTMLElement | SVGElement>;
    const clonedChildren = [...clonedNode.children] as Array<HTMLElement | SVGElement>;
    const win = node.ownerDocument.defaultView as Window;

    for (let i = 0, len = children.length; i < len; i += 1) {
        const child = children[i];
        const clonedChild = clonedChildren[i];
        if (children[i].tagName === 'svg') {
            const {width, height} = win.getComputedStyle(child);

            clonedChild.setAttribute('width', width);
            clonedChild.setAttribute('height', height);

            // const styleDefs = await getSvgEmbededStyles();

            // clonedChild.prepend(styleDefs.cloneNode(true));
        } else {
            await inlineStylesDeepAsync(child, clonedChild, container, dummyStyles, canLoadDataUrls);
        }
    }

    return new Promise((res) => {
        requestAnimationFrame(() => {
            inlineAppliedStyles(node, clonedNode, container, dummyStyles);

            res();
        });
    });
}

export async function inlineStylesOnce(
    node: SVGElement | HTMLElement,
    clonedNode: SVGElement | HTMLElement,
) {
    const doc = node.ownerDocument;
    const container = doc.createElement('div');
    const dummyStyles: {[key: string]: CSSStyleDeclaration | undefined} = {};

    container.style.height = '0';
    container.style.width = '0';
    container.style.overflow = 'hidden';

    document.body.appendChild(container);

    await inlineStylesDeepAsync(node, clonedNode , container, dummyStyles)

    // inlineAppliedStyles(node, clonedNode, container, dummyStyles);

    container.remove();
}

function inlineAppliedStyles(
    node: HTMLElement | SVGElement,
    clonedNode: HTMLElement | SVGElement,
    container: HTMLElement,
    dummyStyles: {[key: string]: CSSStyleDeclaration | undefined},
): void {
    /*
        We should compare element styles with some dummy element to filter out
        default browser styles. Otherwise we get to many of them.
    */
    const doc = node.ownerDocument;
    const win = doc.defaultView as Window;

    let dummyStyle = dummyStyles[node.tagName];

    if (!dummyStyle) {
        const dummyElement = doc.createElement(node.tagName);

        // Computed styles of detached elements are empty. So we can't compare them.
        container.appendChild(dummyElement);
        dummyStyle = win.getComputedStyle(dummyElement);

        // We need dummy styles caching to avoid frequent forced reflows
        dummyStyles[node.tagName] = dummyStyle;
    }

    const styles = win.getComputedStyle(node);
    const stylesLen = styles.length;

    let styleString = '';

    // Object.keys returns wrongs styles properties in Edge.
    for (let i = 0; i < stylesLen; i += 1) {
        const prop = styles.item(i);
        const value = styles.getPropertyValue(prop);
        const dummyValue = dummyStyle.getPropertyValue(prop);

        if (value === dummyValue && prop !== 'color') continue;

        styleString = `${styleString} ${prop}: ${value};`;
    }

    clonedNode.setAttribute('style', styleString);

    const height = styles.height;

    if (!!height && height !== 'auto') {
        const attrHeight = node.style.height;
        node.style.height = 'auto';
    
        if (win.getComputedStyle(node).height === height) {
            clonedNode.style.height = 'auto';
        }

        node.style.height = attrHeight;
    }

    // SVG elements font is not rendered correctly without inline font-family prop.
    if (node instanceof SVGElement) {
        clonedNode.style.fontFamily = styles.fontFamily;

        // font-size correction for Edge.
        clonedNode.style.fontSize = styles.fontSize;
    }

    // SVG has wrong size in Edge without these attributes on canvas.
    if (node.tagName.toLowerCase() === 'svg') {
        clonedNode.setAttribute('width', `${parseInt(styles.width)}`);
        clonedNode.setAttribute('height', `${parseInt(styles.height)}`);
    }
}