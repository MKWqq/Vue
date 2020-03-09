/**
 * description:create virtual dom and switch virtual dom to actual dom
 * date:2020/03/09
 * @return：createVirtualDOM(tagName,props:{},child/children)
 * */
/* todo:创建虚拟dom，并含render方法，将虚拟dom转为真实dom */
import utils from './utils'
class VNode{
    constructor(vNodeConfig){
        let {tag='',child=null,children=[],props}=vNodeConfig;
        this.tag=tag;
        this.child=child;
        this.children=children;
        this.attrsProps=props;
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
        let {attrs=null}=this.attrsProps;
        if(attrs&&utils.isObject(attrs)){
            Object.keys(attrs).forEach(attrKey=>{
                ANode.setAttribute(attrKey,attrs[attrKey]);
            });
        }
        this.child&&ANode.appendChild(document.createTextNode(this.child));
        this.children.forEach(child=>{
            child instanceof VNode&&ANode.appendChild(child.render());
        });
        return ANode;
    }
}

/* 模拟vue render的createElement */
export default function createElement(tag,props={},childNode){
    let children=[],child='';
    if(childNode&&utils.isArray(childNode)){
        children=childNode;
    }else{
        child=childNode;
    }
    return new VNode({tag,props,children,child});
}