import { embedNodeRemoteSource } from "./embedRemoteSources";

export async function prepareClonedNodeDeep(
    node: SVGElement | HTMLElement,
    clonedNode: SVGElement | HTMLElement,
) {
    const children = [...node.children] as Array<HTMLElement | SVGElement>;
    const clonedChildren = [...clonedNode.children] as Array<HTMLElement | SVGElement>;

    await Promise.all([
        ...children.map((node, index) => prepareClonedNodeDeep(node, clonedChildren[index])),
        applyPreparation(node, clonedNode)
    ]);
}

async function applyPreparation(
    node: HTMLElement | SVGElement,
    clonedNode: HTMLElement | SVGElement,
): Promise<void> {
    await Promise.all([
        embedNodeRemoteSource(node, clonedNode),
        applyNodeEmbedStyles(node, clonedNode)
    ])
}

async function applyNodeEmbedStyles(
    node: SVGElement | HTMLElement,
    clonedNode: SVGElement | HTMLElement,) {
        const doc = node.ownerDocument;
        const win = doc.defaultView as Window;

        const styles = win.getComputedStyle(node);

        clonedNode.style.color = styles.color;

        switch (node.tagName) {
            case 'A': {
                clonedNode.style.textDecoration = styles.textDecoration;
            }
        }
    }