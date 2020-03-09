/**
 * 虚拟DOM测试用例
 * */
let assert=require('chai').assert;
import utils from '../../../VirtualDiff/lib/utils';
import createElement from '../../../VirtualDiff/lib/element';

describe('karma start',function(){
    it('karma',function(){
        console.log('hello karma9');
        let liArr=['面包','辣子鸡','冷吃兔','关东煮'];
        let childrenVNode=liArr.map((liText,idx)=>{
            return createElement('li',{attrs:{class:`li${idx}`}},liText)
        });
        let ulVNode=createElement('ul',{attrs:{id:'test'}},childrenVNode);
        console.log(ulVNode.render());
        document.body.appendChild(ulVNode.render());
        utils.isArray([]);
    });
});
describe('karma start333',function(){
    it('karma',function(){
        console.log('hello karma3339');
    });
});