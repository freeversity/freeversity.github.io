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
    await embedNodeRemoteSource(node, clonedNode);
}