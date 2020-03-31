/**
 * description:用iterator与generator实现对象的遍历器，使得可以使用for...of
 * date：2020/03/30
 * author：wangqingqing
 * */
import utils from '../utils';

function* objectGenerator(){
    for(let key in this){
        yield this[key];
    }
}

export default{
    // TODO make object iterator
    makeObjectIterator(){
        // object新增遍历器接口，可使用for...of
        Object.prototype[Symbol.iterator]=objectGenerator;
    }
}