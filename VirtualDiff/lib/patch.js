/**
 * description:定义Node修改类型及类型对应代码。并将差异应用在真实DOM上
 * date:2020-03-13
 * */
let REPLACE=0,REORDER=1,PROPS=2,TEXT=3;

function patch(){}

patch.REPLACE=REPLACE;// currentNode
patch.REORDER=REORDER;// 当前元素子级删除元素情况：新增type:1或删除type:0
patch.PROPS=PROPS;// currentNode
patch.TEXT=TEXT;// currentNode

export default patch;