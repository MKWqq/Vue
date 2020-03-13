/**
 * description:create virtual dom and switch virtual dom to actual dom
 * date:2020/03/09
 * @return：createVirtualDOM(tagName,props:{},children:[Text/VNode])
 * */
/* todo:创建虚拟dom，并含render方法，将虚拟dom转为真实dom */
import utils from './utils'
class VNode{
    constructor(tag='',props,children=[]){
        this.tag=tag;
        this.children=children;
        this.props=props||{};
        this.key=props?props.key:void 666;
        this.count=children.reduce((accumValue,child)=>{
            if(child instanceof VNode){
                return (++accumValue)+child.count;
            }
            return ++accumValue;
        },0);
    }
    /*
        虚拟DOM转为真实DOM
        真实DOM创建过程：
            创建Node(document.createElement)
            给Node添加属性，setAttribute
            创建childNode
            childNode添加到Node中，appendChild
     *  */
    render(){
        let ANode=document.createElement(this.tag);
        for(let propName in this.props){
            utils.setAttr(ANode,propName,this.props[propName]);
        }
        this.children.forEach(child=>{
            (child instanceof VNode)?ANode.appendChild(child.render()):ANode.appendChild(document.createTextNode(child));
        });
        return ANode;
    }
}

/* 模拟vue render的createElement */
export default function createElement(tag,props={},children=[]){
    /* 将子节点处理为数组 */
    if(!utils.isArray(children)){
        children=utils.slice(arguments,2).filter(utils.truthy);
    }
    return new VNode(tag,props,children);
}