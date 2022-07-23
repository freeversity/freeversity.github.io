import { getCssValue } from "./getCssValue";

export function stylePlugin(
    chai: Chai.ChaiStatic, 
    utils: Chai.ChaiUtils
): void {
    utils.addMethod(
        chai.Assertion.prototype, 
        'style', 
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

                const expected = getCssValue(prop, value, doc);
                const actual = getCssValue(prop, elem.style[prop as any], doc);
    
    
                this.assert(
                    actual === expected, 
                    `expected #{this} to have "${value}" as "${prop}"`, 
                    `expected #{this} to not have "${value}" as "${prop}"`,
                    expected,
                    actual,
                );
            });
    });
}
