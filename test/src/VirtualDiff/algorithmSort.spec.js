/**
 * description:算法之排序
 * date:2020-03-11
 * */
import sort from '../../../algorithm/sort';

describe('排序算法测试',function(){
    it('冒泡排序:',function(){
        checkMinToMax(sort.bubbleMinToMax1([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,33]),'bubbleMinToMax1');
        checkMinToMax(sort.bubbleMinToMax2([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,33]),'bubbleMinToMax2');
        checkMinToMax(sort.bubbleMinToMax3([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,33]),'bubbleMinToMax3');
    });
    function checkMinToMax(sortArr,errorMessage){
        console.log(errorMessage,sortArr);
        for(let i=0;i<sortArr.length-1;i++){
            for(let j=i+1;j<sortArr.length;j++){
                expect(sortArr).satisfy((sortArr)=>{
                    return sortArr[i]<=sortArr[j];
                },`${errorMessage}排序错误`);
            }
        }
    }
});