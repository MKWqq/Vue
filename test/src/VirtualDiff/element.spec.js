/**
 * 虚拟DOM测试用例
 * 测试关注点：
 *      创建虚拟DOM方法是否可用：
 *          create virtual dom方法，返回值检测
 *          缺省参数，缺省情况是否正常
 *      虚拟DOM转为真实DOM是否可用，且正确无误
 * */
let expect = require('chai').expect;
// import utils from '../../../VirtualDiff/lib/utils';
import el from '../../../VirtualDiff/lib/element';

describe('Test el', function () {
    let liArr = ['面包', '辣子鸡', '冷吃兔', '关东煮'];
    let childrenNode = liArr.map((childNode, index) => {
        return el('li', {dataIndex: index}, childNode);
    });
    it('Element\'s count is the sum of its children\'s count',()=>{
        let rootVNode = el('ul', null, childrenNode);
        expect(rootVNode.count).is.equal(8);
    });
    it('Element should have a key property if it\`s passed',()=>{
        let rootVNode=el('ul',{key:'uuid'},null);
        expect(rootVNode.key).is.equal('uuid');
    });
    it('Passing dynamic parameters: `props` is optional',function(){
        let rootVNode = el('ul', null, childrenNode);
        expect(rootVNode.tag).is.equal('ul');
        expect(rootVNode.children).is.a('array').and.has.lengthOf(liArr.length);
        expect(rootVNode.children[0].count).is.equal(1);
        expect(rootVNode.props).is.a('object').is.not.null;
    });
    it('test create vNode:', function () {
        let rootVNode = el('ul', {id: 'ul'}, childrenNode);
        // todo 测试tag是否赋值成功
        expect(rootVNode.tag).is.a('string', 'tag数据类型应为string').is.equal('ul');
        expect(rootVNode.children).be.a('array', 'children数据类型应为array').lengthOf(liArr.length);
        // todo 测试配置属性是否赋值成功
        expect(rootVNode.props).is.a('object', 'props数据类型为object').has.property('id');
    });
    it('test childrenNode item',function(){
        // todo 测试有child，无children虚拟dom创建情况
        expect(childrenNode[0]).is.a('object','childrenNode[0]数据类型应为object');
        expect(childrenNode[0].children[0]).is.equal(liArr[0]);
        expect(childrenNode[0].count).is.equal(1);
    });
    it('has props,test virtual element render:',function(){
        let rootVNode = el('ul', {id: 'ul'}, childrenNode);
        let rootNode=rootVNode.render();
        // todo 测试vNode render方法
        expect(rootNode.tagName.toLowerCase()).is.equal('ul');
        expect(rootNode.id).is.equal('ul');
        expect(rootNode.childNodes).has.lengthOf(liArr.length,'render childNodes数量错误').satisfy(nodes=>{
            expect(nodes[0]).is.not.null.and.is.not.undefined;
            expect(nodes[0].tagName.toLowerCase()).is.equal('li');
            expect(nodes[0].getAttribute('dataIndex')).is.equal('0');
            expect(nodes[0].innerText).is.equal(liArr[0]);
            return true;
        },'render childNodes[0]测试子元素转换是否成功');
    });
});