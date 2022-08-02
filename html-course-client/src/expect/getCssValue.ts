export function getCssValue(prop: string, value: string, doc: Document = document) {
    const win = doc.defaultView as Window;

    const testElem = doc.createElement('div') as HTMLElement | SVGElement;
    const testContainer = doc.createElement('div');

    testElem.style.height = '200px';
    testElem.style.width = '200px';

    testContainer.style.height = '0';
    testContainer.style.overflow= 'hidden';
    testContainer.style.visibility= 'hidden';

    testContainer.append(testElem);
    doc.body.append(testContainer);

    testElem.style[prop as any] = value;

    const expectedValue = win.getComputedStyle(testElem)[prop as any];

    testContainer.remove();

    return expectedValue;
}


export function ignoreCssValueTranspiling(prop: string) {
    return {
        'borderWidth': true,
        'borderTopWidth': true,
        'borderBottomWidth': true,
        'borderLeftWidth': true,
        'borderRightWidth': true,
    }[prop];
}