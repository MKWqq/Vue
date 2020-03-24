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
    it('选择排序',()=>{
        expect(sort.selectionSort('')).is.a('array').and.is.empty;
        checkMinToMax(sort.selectionSort([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,33]),'selectionSort');
    });
    it('插入排序',()=>{
        expect(sort.insertionSort('')).is.a('array').and.is.empty;
        checkMinToMax(sort.insertionSort([44,3,38,5,47,15,36,26,27,2,46,4,19,50,48,33]),'insertionSort');
        checkMinToMax(sort.binaryInsertionSort([11,12,13,14,15,16,3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,33]),'binaryInsertionSort');
    });
    it('希尔排序',()=>{
        checkMinToMax(sort.shellSort([44, 3, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48, 33]), 'shellSort');
    });
    function checkMinToMax(sortArr,errorMessage){
        // console.log(errorMessage,sortArr);
        for(let i=0;i<sortArr.length-1;i++){
            for(let j=i+1;j<sortArr.length;j++){
                expect(sortArr).satisfy((sortArr)=>{
                    return sortArr[i]<=sortArr[j];
                },`${errorMessage}排序错误`);
            }
        }
    }
});