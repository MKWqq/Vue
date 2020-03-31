import observe from '../../../es/observer'

describe('Test Observer',()=>{
    it('observe',()=>{
        let proxyA=observe.observable({});
        observe.observe(()=>{
            // console.log(proxyA.name,proxyA.age);
        });
        proxyA.name=123;
        proxyA.age=23;
    });
});