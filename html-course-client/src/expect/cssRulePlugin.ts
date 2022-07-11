declare global {
    interface Window {
        CSSFontFaceRule: typeof CSSFontFaceRule;
    }
}

export function cssRulePlugin(
    chai: Chai.ChaiStatic, 
    utils: Chai.ChaiUtils
): void {
    utils.addMethod(
        chai.Assertion.prototype, 
        'cssRule', 
        function (this: any, selector: string, prop?: string | {[prop: string]: string}, value?: string, ownerSelector?: string) {
            const subj = utils.flag(this, 'object') as Document | HTMLElement;

            const doc = 'tagName' in subj ? subj.ownerDocument : subj;
            const win = doc.defaultView as Window;
            const owner = 'tagName' in subj ? subj : undefined;

            const styleSheets = [...doc.styleSheets].filter(({ownerNode}) => {
                if (owner) return ownerNode === owner;

                if (ownerSelector) return (ownerNode as Element)?.matches?.(ownerSelector);

                return true;
            });

            const filterFunc = (rule: CSSRule) => {
                if (selector === '@font-face') {
                    return rule instanceof win.CSSFontFaceRule;
                }

                if (!('selectorText' in rule)) return false;
                
                return (
                    (rule as CSSStyleRule).selectorText === selector
                ) && (
                    typeof prop !== 'string' || (
                        (rule as CSSStyleRule).style[prop as any] !== ''
                    )
                )
            }

            if (!prop) {
                const actual =  [...styleSheets].some((styleSheet) => {
                    return [...styleSheet.cssRules].some(filterFunc);
                });
                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a rule for "${selector}"`, 
                    `expected #{this} to not have a rule for "${selector}"`,
                    expected,
                    actual,
                );
            } else if (!selector && typeof prop === 'object') {

                const actual =  [...styleSheets].some((styleSheet) => {
                    return [...styleSheet.cssRules].some((rule) => {
                        const style = (rule as CSSStyleRule).style;

                        return Object.keys(prop).length === style.length && Object.entries(prop).every(([prop, value]) => {
                            const testElem = doc.createElement('div') as HTMLElement | SVGElement;
                            const testContainer = doc.createElement('div');
                            testContainer.style.display = 'none';
            
                            testContainer.append(testElem);
                            doc.body.append(testContainer);
            
                            testElem.style[prop as any] = value;
            
                            const expectedValue = win.getComputedStyle(testElem)[prop as any];
            
                            testContainer.remove();
            
                            testElem.style[prop as any] = style[prop as any];
            
                            const actual = style[prop as any];
        
                            return actual === expectedValue;
                        });
                    }) ;
                });
                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a rule for "${selector}" with "${prop}" property`, 
                    `expected #{this} to not have a rule for "${selector}" with "${prop}" property`, 
                    expected,
                    actual,
                );
            } else if (typeof prop === 'object') {
                const actual =  [...styleSheets].some((styleSheet) => {
                    const rule = [...styleSheet.cssRules].find(filterFunc) as CSSStyleRule;

                    return !!rule && Object.keys(prop).length === rule.style.length && Object.entries(prop).every(([prop, value]) => {
                        const testElem = doc.createElement('div') as HTMLElement | SVGElement;
                        const testContainer = doc.createElement('div');
                        testContainer.style.display = 'none';
        
                        testContainer.append(testElem);
                        doc.body.append(testContainer);
        
                        testElem.style[prop as any] = value;
        
                        const expectedValue = win.getComputedStyle(testElem)[prop as any];
        
                        testContainer.remove();
        
                        testElem.style[prop as any] = rule.style[prop as any];
        
                        const actual = rule.style[prop as any];
    
                        return actual === expectedValue;
                    });
                });
                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a rule for "${selector}" with "${prop}" property`, 
                    `expected #{this} to not have a rule for "${selector}" with "${prop}" property`, 
                    expected,
                    actual,
                );
            } else if (!value) {
                const actual =  [...styleSheets].some((styleSheet) => {
                    const rule = [...styleSheet.cssRules].find(filterFunc) as CSSStyleRule;

                    return !!rule && rule.style[prop as any] !== '';
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
                    const rules = [...styleSheet.cssRules].filter(filterFunc).reverse() as CSSStyleRule[];

                    if (!rules.length) return false;

                    const testContainer = doc.createElement('div');
                    testContainer.style.display = 'none';
    
                    testContainer.append(testElem);
                    doc.body.append(testContainer);
    
                    testElem.style[prop as any] = rules[0].style[prop as any];
    
                    const actual = win.getComputedStyle(testElem)[prop as any];

                    return actual === expectedValue;
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
