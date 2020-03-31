/**
 * description:遍历器测试
 * date:2020/03/30
 * author:wangqingqing
 * */
import addIterator from '../../../es/IteratorAndGenerator'

describe('Test IteratorAndGenerator',()=>{
    it('make object iterator',()=>{
        addIterator.makeObjectIterator();
        let obj={name:'wqq',age:24};
        // 检测for...of返回的value是否为obj[key]
        let objValues=Object.values(obj),i=0;
        for(let value of obj){
            expect(value).is.equal(objValues[i++]);
        }
    });
});