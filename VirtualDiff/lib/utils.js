/**
 * description:常用公共方法
 * date:2020/03/02
 * */

export default {
    type(value){
        return Object.prototype.toString.call(value).replace(/\[object\s|\]/g,'');
    }
};