/**
 * description:virtual diff 结果应用在真实dom上
 * date：2020-03-19
 * */
import el from '../../../VirtualDiff/lib/element';
import diff from '../../../VirtualDiff/lib/diff';
import patch from '../../../VirtualDiff/lib/patch'

describe('Test patch',()=>{
    it('Attributes adding',()=>{
        var root = el('div',{id: 'content'}, [
            el('p', ['I love you']),
            el('div', ['I love you']),
            el('section', ['I love you'])
        ]);

        var root2 = el('div',{id: 'content'}, [
            el('p',['I love yo']),
            el('div', {name: 'Jerry'}, ['I love you']),
            el('section', ['I love you'])
        ]);

        var dom = root.render();
        console.log(dom);
        var patches = diff(root, root2);
        patch(dom, patches);
        console.log(dom);
        console.log(patches[0]);
    });
});
