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
import createElement from '../../../VirtualDiff/lib/element';

describe('Test createElement', function () {
    let liArr = ['面包', '辣子鸡', '冷吃兔', '关东煮'];
    let childrenNode = liArr.map((childNode, index) => {
        return createElement('li', {attrs: {dataIndex: index}}, childNode);
    });
    it('Element\'s count is the sum of its children\'s count',()=>{
        let rootVNode = createElement('ul', null, childrenNode);
        expect(rootVNode.count).is.equal(8);
    });
    it('has props,test create vNode:', function () {
        let rootVNode = createElement('ul', {attrs: {id: 'ul'}}, childrenNode);
        // todo 测试tag是否赋值成功
        expect(rootVNode.tag).is.a('string', 'tag数据类型应为string').is.equal('ul');
        expect(rootVNode.children).be.a('array', 'children数据类型应为array').lengthOf(liArr.length);
        // todo 测试配置属性是否赋值成功
        expect(rootVNode.props).is.a('object', 'props数据类型为object').has.property('attrs');
        expect(rootVNode.props.attrs).is.a('object','props.attrs数据类型为object').satisfy(function (value) {
            return value.id && value.id === 'ul';
        }, '根元素props测试');
    });
    it('Passing dynamic parameters: `props` is optional',function(){
        let rootVNode = createElement('ul', null, childrenNode);
        expect(rootVNode.tag).is.equal('ul');
        expect(rootVNode.children).is.a('array').and.has.lengthOf(liArr.length);
        expect(rootVNode.props).is.not.null;
    });
    it('test childrenNode item',function(){
        // todo 测试有child，无children虚拟dom创建情况
        expect(childrenNode[0]).is.a('object','childrenNode[0]数据类型应为object');
        expect(childrenNode[0].children[0]).is.equal(liArr[0]);
    });
    it('has props,test virtual element render:',function(){
        let rootVNode = createElement('ul', {attrs: {id: 'ul'}}, childrenNode);
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