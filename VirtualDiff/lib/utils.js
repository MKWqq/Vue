/**
 * description:常用公共方法
 * date:2020/03/02
 * */

// isArray slice truthy isString each toArray setAttr
Array.prototype.forEach=function(fn){
    for(let i=0;i<this.length;i++){
        fn(this[i],i,this);
    }
};
Array.prototype.push=function(value){
    this[this.length]=value;
};
class Utils{
    type(value){
        return Object.prototype.toString.call(value).replace(/\[object\s|\]/g,'');
    }
    isArray(value){
        return this.type(value).toLowerCase()==='array';
    }
    isObject(value){
        return this.type(value).toLowerCase()==='object';
    }
    slice(arrayLike,index){
        return Array.prototype.slice.call(arrayLike,index);
    }
    truthy(value){
        return !!value;
    }
    isString(value){
        return this.type(value).toLowerCase()==='string';
    }
    each(array=[],fn){
        for(let i=0,len=array.length;i<len;i++){
            fn(array[i],i,array);
        }
    }
    toArray(arrayLike){
        let arr=[];
        if(this.type(arrayLike).toLowerCase().indexOf('array object')>=0&&arrayLike.length){
            return arr;
        }
        for(let i=0;i<arrayLike.length;i++){
            arr.push(arrayLike[i]);
        }
        return arr;
    }
    /*  todo 设置DOM属性
        description：设置属性——特殊处理style与value
        @params：
            node：真实DOM
            key：属性名
            value：属性值
     */
    setAttr(node,key,value){
        switch(key){
            case 'style':
                node.style.cssText=value;
                break;
            case 'value':
                let tagName=node.tagName||'';
                tagName=tagName.toLowerCase();
                if(tagName.indexOf('input textarea')>=0){
                    node[key]=value;
                }else{
                    node.setAttribute(key,value);
                }
                break;
            default:
                node.setAttribute(key,value);
                break;
        }
    }
}
export default new Utils();