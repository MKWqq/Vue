/**
 * description:virtual dom diff
 * date:2020-03-11
 * */
/*
    思路：查找diff，虚拟dom tree由上往下查找不同。
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
import utils from '../../utils';
import patch from './patch';
import listDiff from './list-diff';

function diff(oldTree, newTree) {
    let index = 0, patches = {};
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}

/* todo 确定的新旧Node一一对比 */
function dfsWalk(oldNode, newNode, index, patches) {
    if (!oldNode || !newNode) return false;
    let currentPatch=[];// 不直接patches[index]原因：如果没有变化就不存在有空数组情况
    if (utils.isString(oldNode) && utils.isString(newNode)) {
        if (newNode !== oldNode) {
            currentPatch.push({ type: patch.TEXT, content: newNode })
        }
        // Nodes are the same, diff old node's props and children
    } else if (oldNode.tag !== newNode.tag || (oldNode.props.key && oldNode.props.key !== newNode.props.key)) {
        currentPatch.push({type: patch.REPLACE, node: newNode});
    } else {
        // 对比props
        let propsPatches = diffProps(oldNode, newNode);
        propsPatches && currentPatch.push({type: patch.PROPS, props: propsPatches});
        // 对比子节点
        if(oldNode.children.length&&newNode.children.length&&!isIgnoreChildren(newNode)) diffChildren(oldNode.children, newNode.children, index, patches,currentPatch);
    }
    if(currentPatch.length) patches[index]=currentPatch;
}

/* todo 对比子节点 */
function diffChildren(oldChildren, newChildren, index, patches,currentPatch) {
    let diffs = listDiff(oldChildren, newChildren, 'key');
    newChildren = diffs.children;
    diffs.moves.length && currentPatch.push({type: patch.REORDER, moves: diffs.moves});
    /* leftNode为左边的节点。leftNode为null，表明这是子节点循环的第一个节点，执行到该节点已经执行了多少次，由父节点传递的index确定。leftNode不为null，currentNodeIndex为执行到leftNode时已经执行了N次，leftNode.count来确定leftNode子节点已经执行了好多次，currentNodeIndex与leftNode.count确定执行到当前节点已经执行了N次。 */
    let leftNode = null;
    let currentNodeIndex = index;
    utils.each(oldChildren, (child, i) => {
        currentNodeIndex = (leftNode && leftNode.count) ? (++currentNodeIndex + leftNode.count) : ++currentNodeIndex;
        dfsWalk(child, newChildren[i], currentNodeIndex, patches);
        leftNode = child;
    });
}

/* todo diffProps:相同位置新旧节点，对比props */
function diffProps(oldNode, newNode) {
    let oldProps = oldNode.props || {}, newProps = newNode.props || {};
    let propsPatches = {}, count = 0;
    /* 找有改动的属性 */
    for (let key in oldProps) {
        if (oldProps[key] !== newProps[key]) {
            count++;
            propsPatches[key] = newProps[key];
        }
    }
    /* 找新增属性 */
    for (let key in newProps) {
        if (!oldNode.hasOwnProperty(key)) {
            count++;
            propsPatches[key] = newProps[key];
        }
    }
    if (!count) return null;
    return propsPatches;
}

/* todo 判断是否不对比该Node的子节点 */
function isIgnoreChildren(node) {
    return node.props && node.props.hasOwnProperty('ignore');
}

export default diff;