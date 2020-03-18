/**
 * description:virtual diff test
 * */
import el from '../../../VirtualDiff/lib/element';
import diff from '../../../VirtualDiff/lib/diff';

describe('Test Diff',()=>{
    it('test props diff',()=>{
        let oldRoot = el('div', null,[el('p'), el('div'), el('section')]);
        let newRoot = el('div', null,[el('p'), el('span'), el('section')]);

        let patches = diff(oldRoot, newRoot);
        expect(patches).is.a('object').and.has.property(2);
        expect(patches[2][0].type).is.equal(0);
    })
});