/**
 * description:virtual dom diff
 * date:2020-03-11
 * */
/*
    疑问:
        新旧虚拟DOM树对比时，对比唯一key是什么？怎么赋值？默认key是什么？常用的key有哪些？
        VNode count属性作用：记录当前节点的所有子节点数量
        VNode key作用：防止复用；便于同级VNode对比时，找到相应的VNode，可以判断VNode是删除，还是移动了位置，还是新增的节点；
        patches key:唯一标识与count关系
 */
/*
    解答：
        patches为存放新、旧virtual dom diff后的差异，patches结构：
        patches:{
            执行到某处的执行次数:[变化]
        }
        变化类型：
            REPLACE = 0 替换节点
            REORDER = 1 新插入节点
            PROPS = 2 属性修改
            TEXT = 3 修改文本节点
        patches[key],key的确定：
            leftNode为左边的节点。leftNode为null，表明这是子节点循环的第一个节点，执行到该节点已经执行了多少次，由父节点传递的index确定。
            leftNode不为null，currentNodeIndex为执行到leftNode时已经执行了N次，leftNode.count来确定leftNode子节点已经执行了好多次，currentNodeIndex与leftNode.count确定执行到当前节点已经执行了N次。
 **/

export default{};