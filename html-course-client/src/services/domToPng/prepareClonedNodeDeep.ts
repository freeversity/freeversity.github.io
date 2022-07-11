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

        let relatedRules: CSSStyleRule[] | undefined;

        for (let styleProp of node.style) {
            const styleValue = node.style[styleProp as any];
            
            relatedRules = relatedRules ?? [...node.ownerDocument.styleSheets].reduce<CSSStyleRule[]>((rules, styleSheet) => {
                if (!('cssRules' in styleSheet)) return rules;

                for (let rule of styleSheet.cssRules) {
                    if (!('selectorText' in rule) || !('style' in rule)) continue;

                    if (node.matches((rule as CSSStyleRule).selectorText)) {
                        rules.push(rule as CSSStyleRule);
                    }
                }

                return rules;
            }, []);

            const shouldRemoveProp = relatedRules.some((rule) => {
                return rule.style[styleProp as any] !== styleValue && rule.style.getPropertyPriority(styleProp) === 'important';
            })

            if (shouldRemoveProp) {
                clonedNode.style[styleProp as any] = '';
            }

        }

        clonedNode.style.color = styles.color;

        switch (node.tagName) {
            case 'A': {
                clonedNode.style.textDecoration = styles.textDecoration;
            }
        }
    }