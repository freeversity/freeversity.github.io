import { fileToBase64 } from "./embedRemoteSources";

export async function getStylesDefs(
    document: Document,
): Promise<SVGDefsElement> {
    const svgStyles = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    const baseUrl = document.querySelector('base')?.href;
    
    const styleSheets = await Promise.all(
        [...document.styleSheets].map((styleSheet) =>stringifyStyleSheet(styleSheet, baseUrl))
    );

    const stylesElem = document.createElementNS('http://www.w3.org/2000/svg', 'style');

    stylesElem.innerHTML = styleSheets.join('\n');

    svgStyles.appendChild(stylesElem);

    return svgStyles;
}

export async function stringifyStyleSheet(styleSheet: CSSStyleSheet, baseUrl?: string) {
    const rules = await Promise.all(
        ([...styleSheet.cssRules] as CSSStyleRule[]).map((cssRule) => stringifyCssRule(cssRule, baseUrl))
    );

    return rules.join(' ');
}

export async function stringifyCssRule(cssRule: CSSStyleRule, baseUrl?: string): Promise<string> {
    let result = '';

    for (let prop of cssRule.style) {
        const value = cssRule.style[prop as any];
        switch(prop) {
            case 'background-image': {
                const match = /url\(["']?(.*)['"]g?\)/.exec(value);

                let imgValue = value;

                if (match)  {
                    const url = baseUrl ? new URL(match[1], baseUrl).href : match[1];

                    const base64Url = await fileToBase64(url);

                    imgValue = `url("${base64Url}")`;
                }

                result += `${prop}: ${imgValue};`;
                break;
            }
            default:
                result += `${prop}: ${value};`
        }
    }

    return `${cssRule.selectorText} {${result}}`;
}