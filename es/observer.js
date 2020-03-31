/**
 * describe:观察者模式(observer mode)，即数据对象监听，一旦对象有所变化，就作出相应反应。用es6的Proxy/Reflect/Decorator
 * date:2020/03/25
 * */
import {autobind} from 'core-decorators';

class Observer{
    constructor(){
        this.queuedObservers=new Set();
    }
    // 返回可监听数据变化的对象，即set value时，执行其他操作
    observable(obj){
        return new Proxy(obj,{set:this.set});
    }
    // observable返回对象变化时，执行的函数
    observe(fn){
        this.queuedObservers.add(fn);
    }
    @autobind
    set(target,key,value,receiver){
        const result=Reflect.set(target,key,value,receiver);
        this.queuedObservers.forEach(observer=>observer());
        return result;
    }
}

export default new Observer();