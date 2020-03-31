/**
 * description:用iterator与generator实现对象的遍历器，使得可以使用for...of
 * date：2020/03/30
 * author：wangqingqing
 * */
import utils from '../utils';

export default{
    // TODO make object iterator
    makeObjectIterator(obj){
        if (!utils.isObject(obj)) {
            throw new Error('数据类型必须为object');
        }
        function* objectGenerator() {
            if (!utils.isObject(obj)) {
                throw new Error('数据类型必须为object');
            }
            for (let key in obj) {
                yield obj[key];
            }
        }
        obj[Symbol.iterator] = objectGenerator;
    }
}