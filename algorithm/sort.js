/**
 * description:排序算法
 * date:2020-03-11
 * */
import utils from '../utils';

class Sort {
    // TODO 冒泡排序——替换的为值：两两对比，立马换位置，循环一次可以冒泡出最大值或最小值，值在循环完最后面
    /* 时间复杂度:
        最差情况:T{n}=O(n^2)
        最好情况:T{n}=O(n)
        平均情况:T{n}=O(n^2)
    */
    bubbleMinToMax1(arr = []) {
        if (!utils.isArray(arr)) return [];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                // 循环一次可以找到最大值
                if (arr[i] > arr[j]) {
                    arr[i] ^= arr[j];
                    arr[j] ^= arr[i];
                    arr[i] ^= arr[j];
                }
            }
        }
        return arr;
    }

    bubbleMinToMax2(arr = []) {
        if (!utils.isArray(arr)) return [];
        let i = arr.length - 1;
        while (i > 0) {
            let lastChangeIndex = 0;
            // 循环一次可以找出最大值
            for (let j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    lastChangeIndex = j;// 记录最后一次换数据的位置
                    arr[j] ^= arr[j + 1];
                    arr[j + 1] ^= arr[j];
                    arr[j] ^= arr[j + 1];
                }
            }
            i = lastChangeIndex;
        }
        return arr;
    }

    /* todo 最优冒泡：正向循环取最大值，反向循环取最小值，处理循环startIndex与endIndex，减少时间复杂度 */
    bubbleMinToMax3(arr = []) {
        if (!utils.isArray(arr)) return [];
        let loopStart = 0, loopEnd = arr.length - 1;
        let lastChangeIndex = 0;
        while (loopStart < loopEnd) {
            // 正向循环找最大值
            for (let i = loopStart; i < loopEnd; i++) {
                if (arr[i] > arr[i + 1]) {
                    lastChangeIndex = i;
                    arr[i] ^= arr[i + 1];
                    arr[i + 1] ^= arr[i];
                    arr[i] ^= arr[i + 1];
                }
            }
            loopEnd = lastChangeIndex;
            // 反向循环找最小值
            for (let j = loopEnd; j > loopStart; j--) {
                if (arr[j - 1] > arr[j]) {
                    lastChangeIndex = j;
                    arr[j] ^= arr[j - 1];
                    arr[j - 1] ^= arr[j];
                    arr[j] ^= arr[j - 1];
                }
            }
            loopStart = lastChangeIndex;
        }
        return arr;
    }

    // TODO 选择排序——替换的为下标：两两对比，记录最小值/最大值下标，循环完一次后，再替换当前下标的值
    /* 时间复杂度：
        最差情况:T{n}=O(n^2)
        最好情况:T{n}=O(n^2)
        平均情况:T{n}=O(n^2) */
    selectionSort(arr = []) {
        if (!utils.isArray(arr)) return [];
        let minIndex;
        for (let i = 0; i < arr.length - 1; i++) {
            minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[minIndex] > arr[j]) {
                    minIndex = j;
                }
            }
            if (i === minIndex) continue;
            arr[i] ^= arr[minIndex];
            arr[minIndex] ^= arr[i];
            arr[i] ^= arr[minIndex];
        }
        return arr;
    }

    // TODO 插入排序
    /**/
    insertionSort(arr = []) {
        if (!utils.isArray(arr)) return [];
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i], j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];// 换位
                j--;
            }
            arr[j + 1] = key;
        }
        return arr;
    }

    // 查找插入位置使用二分查找法
    binaryInsertionSort(arr = []) {
        if (!utils.isArray(arr)) return [];
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i], left = 0, right = i - 1;
            while (left <= right) {
                let middle = parseInt((left + right) / 2);
                if (arr[middle] >= key) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (let j = i - 1; j >= left; j--) {
                arr[j + 1] = arr[j];
            }
            arr[left] = key;
        }
        return arr;
    }
}

export default new Sort();