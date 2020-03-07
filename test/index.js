/**
 * 测试用例入口文件——默认跑完全部测试用例的场景
 * */
const testsContext=require.context('./src',true,/\.spec.js$/);
testsContext.keys().forEach(testsContext);

const VirtualDiffContext=require.context('../VirtualDiff',true,/\.js$/);
VirtualDiffContext.keys().forEach(VirtualDiffContext);
