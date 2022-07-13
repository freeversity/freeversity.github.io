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
                const win = elem?.ownerDocument.defaultView as Window;

                const testElem = elem.cloneNode() as HTMLElement | SVGElement;
                testElem.style[prop as any] = value;
    
                const testContainer = win.document.createElement('div');
                testContainer.style.display = 'none';
    
                testContainer.append(testElem);
                win.document.body.append(testContainer);
    
                const expected = win.getComputedStyle(testElem)[prop as any];

                testContainer.remove();
                
                const actual = win.getComputedStyle(elem)[prop as any];
    
    
                this.assert(
                    actual === expected, 
                    `expected #{this} to have "${value}" as "${prop}"`, 
                    `expected #{this} to not have "${value}" as "${prop}"`,
                    expected,
                    actual,
                );
            })
    });
}
