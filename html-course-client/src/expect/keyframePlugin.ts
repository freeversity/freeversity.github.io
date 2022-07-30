import { getCssValue } from "./getCssValue";

declare global {
    interface Window {
        CSSKeyframesRule: typeof CSSKeyframesRule;
    }
}

export function keyframesPlugin(
    chai: Chai.ChaiStatic, 
    utils: Chai.ChaiUtils
): void {
    utils.addMethod(
        chai.Assertion.prototype, 
        'keyframes', 
        function (this: any, keyframesName: string, breakPoint?: string, prop?: string | {[prop: string]: string}, value?: string) {
            const subj = utils.flag(this, 'object') as Document | HTMLElement;

            const doc = 'tagName' in subj ? subj.ownerDocument : subj;
            const win = doc.defaultView as Window;
            const owner = 'tagName' in subj ? subj : undefined;

            const styleSheets = [...doc.styleSheets].filter(({ownerNode}) => {
                if (owner) return ownerNode === owner;

                return true;
            });

            const keyframesRule = styleSheets.reduce<null | CSSKeyframesRule>((keyframeRule, stylesheet) => {
                if (keyframeRule) return keyframeRule;

                return [...(stylesheet.cssRules ?? [])]
                    .find(
                        (cssRule) => cssRule instanceof win.CSSKeyframesRule && cssRule.name === keyframesName
                    ) as CSSKeyframesRule ?? null;
            }, null);

            if (!breakPoint) {
                const actual = !!keyframesRule;
                const expected = !keyframesRule;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a keyframe rule with name ${keyframesName}`, 
                    `expected #{this} to not have a keyframe rule with name ${keyframesName}`, 
                    expected,
                    actual,
                );

                return;
            }


            const keyframeRule = ([...(keyframesRule!.cssRules ?? [])] as CSSKeyframeRule[])
                .find((keyframeRule) => keyframeRule.keyText === breakPoint);

            if (!prop) {
                const actual = !!keyframeRule;
                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a keyframe ${breakPoint} breakpoint rule with name ${keyframesName}`, 
                    `expected #{this} to not have a keyframe ${breakPoint} breakpoint rule with name ${keyframesName}`, 
                    expected,
                    actual,
                );

                return;
            }

            if (!value && typeof prop === 'object') {
                const actual = !!keyframeRule && Object.keys(prop).length === keyframeRule.style.length && Object.entries(prop).every(([prop, value]) => {
                    const expectedValue = getCssValue(prop, value, doc);
                    const actual = getCssValue(prop, keyframeRule.style[prop as any], doc);
    
                    return actual === expectedValue;
                });

                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a keyframe ${breakPoint} breakpoint rule with name ${keyframesName}`, 
                    `expected #{this} to not have a keyframe ${breakPoint} breakpoint rule with name ${keyframesName}`, 
                    expected,
                    actual,
                );

                return;
            }

            if (!value) {

                const actual = !!keyframeRule && keyframeRule.style[prop as any] !== '';
                const expected = true;

                this.assert(
                    actual === expected,
                    `expected #{this} to have a keyframe ${breakPoint} breakpoint rule with name ${keyframesName}`, 
                    `expected #{this} to not have a keyframe ${breakPoint} breakpoint rule with name ${keyframesName}`, 
                    expected,
                    actual,
                );

                return;
            }

                const expectedValue = getCssValue(prop as string, value, doc);
                const actual =  keyframeRule && getCssValue(prop as string, keyframeRule.style[prop as any], doc)

                const expected = true;

                this.assert(
                    actual === expectedValue,
                    `expected #{this} to have a keyframe ${breakPoint} breakpoint rule with name ${keyframesName}`, 
                    `expected #{this} to not have a keyframe ${breakPoint} breakpoint rule with name ${keyframesName}`, 
                    expected,
                    actual,
                );
    });
}
