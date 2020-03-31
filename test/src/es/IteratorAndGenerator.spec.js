/**
 * description:遍历器测试
 * date:2020/03/30
 * author:wangqingqing
 * */
import addIterator from '../../../es/IteratorAndGenerator'

describe('Test IteratorAndGenerator',()=>{
    it('make object iterator',()=>{
        let obj={name:'wqq',age:24};
        addIterator.makeObjectIterator(obj);
        for(let value of obj){
            console.log('makeObjectIterator',value);
        }
    });
});