/**
 * description:定义Node修改类型及类型对应代码。并将差异应用在真实DOM上
 * date:2020-03-13
 * */
/*
 * 思路：真实dom树由下往上应用不同点
 * REPLACE：当前节点节点替换。比较方式：同一位置新旧节点一一对比。结构：{type:0,node:newNode}。
REORDER：子节点集合中新增、删除的子节点。比较方式：子节点集合同级对比。结构：{type:1,moves:[{type:0——删除,index:该子节点在子节点集合中的下标},{type:1——新增,index:该子节点在子节点集合中的下标,item:newVNode}]}。
PROPS：当前节点属性变化。比较方式：同一位置新旧节点一一对比。结构：{type:2,props:[{修改propKey:undefined——删除该属性,propKey:newPropValue}]}。
TEXT：当前节点文本节点变化。比较方式：同一位置新旧节点一一对比。结构：{type:3,content:newText}。
 * */

import utils from '../../utils';

let REPLACE=0,REORDER=1,PROPS=2,TEXT=3;

function patch(node,patches){
    let walker={index:0};
    dfsWalk(node,walker,patches);
}

/* todo 递归找差异 */
function dfsWalk(node,walker,patches){
    let currentPatches=patches[walker.index];
    let currentChildNodes=node.childNodes||[];
    utils.each(currentChildNodes,(child)=>{
        walker.index++;
        dfsWalk(child,walker,patches);
    });
    if(currentPatches){
        applyPatches(node,currentPatches);
    }
}

function applyPatches(node,patches){
    utils.isArray(patches)&&utils.each(patches,(patch)=>{
        switch(patch.type){
            case REPLACE:
                // 确定新节点是文本节点还是元素节点
                let newNode=utils.isString(patch.node)
                    ? document.createTextNode(patch.node)
                    :patch.node.render();
                node.parentNode.replaceChild(newNode,node);
                break;
            case REORDER:
                reorderChildren(node,patch.moves);
                break;
            case PROPS:
                setProps(node,patch.props);
                break;
            case TEXT:
                if(node.textContent){
                    // node为元素标签，代表修改node标签的文本节点
                    node.textContent=patch.node;
                }else{
                    // node为文本标签
                    node.nodeValue=patch.node;
                }
                break;
            default:
                throw new Error(`Unknown patch type:${patch.type}`);
        }
    });
}
/*
* propPatches:{type:2,props:{style:undefined(删除该属性),class:'new-class'(新属性值)}}
* */
function setProps(node,props){
    for(let propKey in props){
        if(props[propKey]===void 666){
            node.removeAttribute(propKey);
        }else{
            utils.setAttr(node,propKey,props[propKey]);
        }
    }
}
/*
 * 记录的是子节点的删除与新增
 * movePatches:{type:1,moves:[
 *      {type:1(新增),index:childNodesIndex,item:newNode},
 *      {type:0(删除),index:childNodesIndex}]}
  * */
function reorderChildren(node,moves){
    let staticChildNodes=utils.toArray(node.childNodes)||[];// 修改前childNodes快照
    let maps={};
    // 记录含有key属性的所有节点，结构{key:node}
    utils.each(staticChildNodes,(node)=>{
        if(node.nodeType===1){
            let nodeKey=node.getAttribute(node.key);
            if(nodeKey){
                maps[nodeKey]=node;
            }
        }
    });

    utils.each(moves,(move)=>{
        let index=move.index;
        if(move.type===0){
            // 删除节点
            // 可能已被删除，以进行插入
            if(staticChildNodes[index]===node.childNodes[index]){
                node.removeChild(staticChildNodes[index]);
            }
            staticChildNodes.splice(index,1);
        }else{
            // 新增节点
            let insertNode=maps[move.item.key]
                ?maps[move.item.key].cloneNode(true)// reuse old node
                :(utils.isString(move.item)
                    ?document.createTextNode(move.item)
                    :move.item.render());
            staticChildNodes.splice(index,0,insertNode);
            node.insertBefore(insertNode,node.childNodes[index]||null);
        }
    });
}

patch.REPLACE=REPLACE;// currentNode
patch.REORDER=REORDER;// 当前元素子级删除、新增节点情况：moves:[index:该子节点在子节点集合中的下标,type:0/1——新增type:1或删除type:0]
patch.PROPS=PROPS;// currentNode
patch.TEXT=TEXT;// currentNode

export default patch;