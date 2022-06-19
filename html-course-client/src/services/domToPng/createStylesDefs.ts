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
    let result: Record<string, string[]> = {};

    if (!cssRule.style) return '';

    for (let prop of cssRule.style) {
        const value = cssRule.style[prop as any];
        switch(prop) {
            case 'border-image-source':
            case 'background-image': {
                const urls = value.split(',').map((value) => {
                    const match = /url\(["']?(.*)['"]g?\)/.exec(value);

                    if (!match) return null;
                    
                    return baseUrl ? new URL(match[1], baseUrl).href : match[1];
                });

                const embedImgs = await Promise.all(urls.map((url) => url ? fileToBase64(url) : Promise.resolve(null)));

                const embedValue = value.split(',').map((value, index) => {
                    if (!embedImgs[index]) return value;

                    return `url("${embedImgs[index]}")`
                });

                result[prop] = embedValue;
                break;
            }
            case 'background-repeat-x':{
                const valueSplitted = value.split(',').map((value) => value.trim());
                result['background-repeat'] = result['background-repeat']
                    ?.map((value, index) => valueSplitted[index] + ' ' + value) 
                    ?? valueSplitted;
                break;
            }
            case 'background-repeat-y':{
                const valueSplitted = value.split(',').map((value) => value.trim());
                result['background-repeat'] = result['background-repeat']
                    ?.map((value, index) => value + ' ' + valueSplitted[index]) 
                    ?? valueSplitted;
                break;
            }
            case 'background-position-x':{
                const valueSplitted = value.split(',').map((value) => value.trim());
                result['background-position'] = result['background-position']
                    ?.map((value, index) => valueSplitted[index] + ' ' + value) 
                    ?? valueSplitted;
                break;
            }
            case 'background-position-y':{
                const valueSplitted = value.split(',').map((value) => value.trim());
                result['background-position'] = result['background-position']
                    ?.map((value, index) => value + ' ' + valueSplitted[index]) 
                    ?? valueSplitted;
                break;
            }
            default:
                result[prop] = [value];
        }
    }

    return `${cssRule.selectorText} {${Object.entries(result).map(([prop, value]) => `${prop}: ${value.join(',')};`).join('\n')}}`;
}