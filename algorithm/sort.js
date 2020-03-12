/**
 * description:排序算法
 * date:2020-03-11
 * */
class Sort{
    /* 时间复杂度——固定的：
            (arr.length-1)+(arr.length-2)+...+1
            (首项+末项)*项数/2
     *  */
    bubbleMinToMax1(arr=[]){
        for(let i=0;i<arr.length-1;i++){
            for(let j=i+1;j<arr.length;j++){
                // 循环一次可以找到最大值
                if(arr[i]>arr[j]){
                    arr[i]^=arr[j];
                    arr[j]^=arr[i];
                    arr[i]^=arr[j];
                }
            }
        }
        return arr;
    }
    /* 时间复杂度:
            最大为:arr.length+(arr.length-1)+...+1
            最小为：arr.length
     */
    bubbleMinToMax2(arr=[]){
        let i=arr.length-1;
        while(i>0){
            let lastChangeIndex=0;
            // 循环一次可以找出最大值
            for(let j=0;j<i;j++){
                if(arr[j]>arr[j+1]){
                    lastChangeIndex=j;// 记录最后一次换数据的位置
                    arr[j]^=arr[j+1];
                    arr[j+1]^=arr[j];
                    arr[j]^=arr[j+1];
                }
            }
            i=lastChangeIndex;
        }
        return arr;
    }
    /* todo 最优冒泡：正向循环取最大值，反向循环取最小值，处理循环startIndex与endIndex，减少时间复杂度 */
    bubbleMinToMax3(arr=[]){
        let loopStart=0,loopEnd=arr.length-1;
        let lastChangeIndex=0;
        while(loopStart<loopEnd){
            // 正向循环找最大值
            for(let i=loopStart;i<loopEnd;i++){
                if(arr[i]>arr[i+1]){
                    lastChangeIndex=i;
                    arr[i]^=arr[i+1];
                    arr[i+1]^=arr[i];
                    arr[i]^=arr[i+1];
                }
            }
            loopEnd=lastChangeIndex;
            // 反向循环找最小值
            for(let j=loopEnd;j>loopStart;j--){
                if(arr[j-1]>arr[j]){
                    lastChangeIndex=j;
                    arr[j]^=arr[j-1];
                    arr[j-1]^=arr[j];
                    arr[j]^=arr[j-1];
                }
            }
            loopStart=lastChangeIndex;
        }
        return arr;
    }
}

export default new Sort();