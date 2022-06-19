export function stylePlugin(
    chai: Chai.ChaiStatic, 
    utils: Chai.ChaiUtils
): void {
    utils.addMethod(
        chai.Assertion.prototype, 
        'style', 
        function (this: any, prop: string, value: string) {
            const elem = utils.flag(this, 'object') as HTMLElement | SVGElement;
            const win = elem?.ownerDocument.defaultView as Window;

            const testElem = elem.cloneNode() as HTMLElement | SVGElement;
            testElem.style[prop as any] = value;

            const testContainer = win.document.createElement('div');
            testContainer.style.display = 'none';

            testContainer.append(testElem);
            win.document.body.append(testContainer);

            const expected = testElem.style[prop as any];
            const actual = elem.style[prop as any];

            testContainer.remove();

            this.assert(
                actual === expected, 
                `expected #{this} to have "${value}" as "${prop}"`, 
                `expected #{this} to not have "${value}" as "${prop}"`,
                expected,
                actual,
            );
    });
}
