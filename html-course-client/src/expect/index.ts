
import chai from 'chai';
import chaiDom from 'chai-dom';
import { computedCssPlugin } from './computedCssPlugin';
import { cssRulePlugin } from './cssRulePlugin';

chai.use(chaiDom);
chai.use(computedCssPlugin);
chai.use(cssRulePlugin);

export const expect = chai.expect;