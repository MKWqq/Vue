/**
 * description:线性结构与树形结构
 * date:2020/03/17
 * */
import utils from '../utils'

export default{
    /*
     * description:根节点为多个，即多个树集合
     * 步骤一：list转为key(parentId):value[含该parentId的数据集合]。
     * 步骤二：从parentId为null/undefined/''开始，逐渐组成树结构
      * */
    lineConvertToTree(list=[]) {
        let rootArr = [],childListToKeyValue={};
        if (!utils.isArray(list)) return rootArr;
        // 组装根节点
        for(let i=0;i<list.length;i++){
            if(list[i].parentId===null||list[i].parentId===undefined&&list[i].parentId===''){
                rootArr.push(...list.splice(i,1));
                i--;
            }
        }
        // 将子节点转为key:value对象
        for(let i=0;i<list.length;i++){
            if(!childListToKeyValue[list[i].parentId]){
                childListToKeyValue[list[i].parentId]=[];
            }
            childListToKeyValue[list[i].parentId].push(list[i]);
        }
        // 多个树集合
        for(let i=0;i<rootArr.length;i++){
            // todo 递归：借助一个数组，将相关数据集合在一起、循环，达到递归作用
            let currentChildren=[rootArr[i]];
            // 通过id与parentId对应关系，组成tree结构
            while(currentChildren.length>0){
                let currentNode=currentChildren.shift();
                currentNode.children=childListToKeyValue[currentNode.id]?childListToKeyValue[currentNode.id]:[];
                currentChildren=[...currentChildren,...currentNode.children];
            }
        }
        return rootArr;
    },
    /*
     * @param:root{}
      * */
    treeCovertToLine(root={}){
        let list=[],queue=[];
        if(!utils.isObject(root)) return list;
        queue.push(root);
        while(queue.length>0){
            let currentNode=queue.shift();
            if(currentNode.children&&currentNode.children.length>0){
                queue=[...queue,...currentNode.children];
            }
            delete currentNode.children;
            list.push(currentNode);
        }
        return list;
    }
};