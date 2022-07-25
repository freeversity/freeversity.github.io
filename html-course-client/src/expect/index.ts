
import chai from 'chai';
import chaiDom from 'chai-dom';
import { computedCssPlugin } from './computedCssPlugin';
import { cssRulePlugin } from './cssRulePlugin';
import { keyframesPlugin } from './keyframePlugin';
import { stylePlugin } from './stylePlugin'

chai.use(chaiDom);
chai.use(computedCssPlugin);
chai.use(cssRulePlugin);
chai.use(stylePlugin)
chai.use(keyframesPlugin)

export const expect = chai.expect;