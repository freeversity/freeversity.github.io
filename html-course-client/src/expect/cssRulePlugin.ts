export function cssRulePlugin(
    chai: Chai.ChaiStatic, 
    utils: Chai.ChaiUtils
): void {
    utils.addMethod(
        chai.Assertion.prototype, 
        'cssRule', 
        function (this: any, selector: string, prop?: string, value?: string) {
            const doc = utils.flag(this, 'object') as Document;

            const styleSheets = doc.styleSheets;

            if (!prop) {
                const actual =  [...styleSheets].some((styleSheet) => {
                    return [...styleSheet.cssRules].some((rule) => {
                        if ('selectorText' in rule) {
                            return (rule as CSSStyleRule).selectorText === selector;
                        }

                        return false;
                    });
                });
                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a rule for "${selector}"`, 
                    `expected #{this} to not have a rule for "${selector}"`,
                    expected,
                    actual,
                );
            } else if (!value) {
                const actual =  [...styleSheets].some((styleSheet) => {
                    const rule = [...styleSheet.cssRules].find((rule) => {
                        if ('selectorText' in rule) {
                            return (rule as CSSStyleRule).selectorText === selector;
                        }

                        return false;
                    }) as CSSStyleRule;

                    return rule?.style[prop as any] !== '';
                });
                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a rule for "${selector}" with "${prop}" property`, 
                    `expected #{this} to not have a rule for "${selector}" with "${prop}" property`, 
                    expected,
                    actual,
                );

            } else {

                const win = doc.defaultView as Window;

                const testElem = doc.createElement('div') as HTMLElement | SVGElement;

                const testContainer = doc.createElement('div');
                testContainer.style.display = 'none';

                testContainer.append(testElem);
                doc.body.append(testContainer);

                testElem.style[prop as any] = value;

                const expectedValue = win.getComputedStyle(testElem)[prop as any];

                testContainer.remove();

                const actual =  [...styleSheets].some((styleSheet) => {
                    const rule = [...styleSheet.cssRules].find((rule) => {
                        if ('selectorText' in rule) {
                            return (rule as CSSStyleRule).selectorText === selector;
                        }

                        return false;
                    }) as CSSStyleRule;

                    return rule?.style[prop as any] === expectedValue;
                });
                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a rule for "${selector}" selector with "${prop}: ${value}"`, 
                    `expected #{this} to not have a rule for "${selector}" selector with "${prop}: ${value}"`, 
                    expected,
                    actual,
                );
            }
    });
}
