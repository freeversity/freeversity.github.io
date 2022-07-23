import { getCssValue } from "./getCssValue";

export function computedCssPlugin(
    chai: Chai.ChaiStatic, 
    utils: Chai.ChaiUtils
): void {
    utils.addMethod(
        chai.Assertion.prototype, 
        'css', 
        function (this: any, prop: string, value: string) {
            const elemsObject = utils.flag(this, 'object') as HTMLElement | SVGElement | NodeList;

            let elems: Array<HTMLElement | SVGElement>;

            if (!elemsObject || 'ownerDocument' in elemsObject) {
                elems = [elemsObject];
            } else {
                elems = [...elemsObject] as Array<HTMLElement | SVGElement>;
            }

            elems.forEach((elem) => {
                const doc = elem.ownerDocument;
                const win = elem.ownerDocument.defaultView!;

                const originalExpected = value;
                const originalActual = win.getComputedStyle(elem)[prop as any];

                const expected = getCssValue(prop, value, doc);
                const actual = getCssValue(prop, originalActual, doc);
    
                this.assert(
                    originalExpected === originalActual || actual === expected, 
                    `expected #{this} to have "${value}" as "${prop}"`, 
                    `expected #{this} to not have "${value}" as "${prop}"`,
                    expected,
                    actual,
                );
            })
    });
}
