/**
 * File created bu Philip Hoang 12.02.18
 */

///<reference path="eventManager.ts"/>
///<reference path="view.ts"/>
///<reference path="initArray.ts"/>

let sortArray: number[] = [];
let copyArray: number[] = [];
const n = 10;
let running = true;


function checkIfAlreadyRunning(){
    if (running) {
        manager.clear();
        viewer.pause();
    }
    else {
        running = true;

    }
}

function startMergeSort() {
    checkIfAlreadyRunning();

    copyArray = returnArray();
    mergesort(returnArray());
}

function mergesort(array: number[]) {
    if (array.length  < 2) {
        //viewer.deselectPivotElement(sortArray.indexOf(array[0]));
        //viewer.liftElements(copyArray.indexOf(array[0]), copyArray.indexOf(array[0]));
        return array;

    } else {

        let mid: number;
        let left: number[];
        let right: number[];

        mid = Math.floor(array.length * 0.5);
        viewer.setPivotElement(copyArray.indexOf(array[mid-1]));


        left = array.slice(0, mid);
        viewer.lowerElements(copyArray.indexOf(left[0]), copyArray.indexOf(left[left.length-1]));


        right = array.slice(mid);
        viewer.lowerElements(copyArray.indexOf(right[0]), copyArray.indexOf(right[right.length-1]));

        //Split until there is only 1 element left
        return merge(mergesort(left), mergesort(right));
    }
}


function merge(left: number[], right: number[]) {
    console.log("MERGE her med " + left + " : " + right);

    let result: number[] = [];
    let indexLeft : number = 0;
    let indexRight :number = 0;

    while(indexLeft < left.length && indexRight < right.length) {
        //Compare the elements from each array
        if(left[indexLeft] < right[indexRight]) {
            console.log("merge " + left[indexLeft] + " mindre enn " + right[indexRight]);

            result.push(left[indexLeft]);

            viewer.liftElements(copyArray.indexOf(left[indexLeft]), copyArray.indexOf(left[indexLeft]));

            indexLeft++;

        } else {
            console.log("------------");
            console.log("merge (L>R) " + left[indexLeft] + " større enn " + right[indexRight]);
            console.log("SWAP " + copyArray.indexOf(left[indexLeft]), copyArray.indexOf(right[indexRight]));
            console.log(copyArray);


            result.push(right[indexRight]);
            console.log("For Swap array " + copyArray[copyArray.indexOf(left[indexLeft])] + " " + copyArray[copyArray.indexOf(right[indexRight])]);
            viewer.swapElements(copyArray.indexOf(left[indexLeft]), copyArray.indexOf(right[indexRight]));
            swapInArray(copyArray.indexOf(left[indexLeft]), copyArray.indexOf(right[indexRight]));

            console.log("etter " + copyArray[copyArray.indexOf(left[indexLeft])] + " " + copyArray[copyArray.indexOf(right[indexRight])])

            console.log("etter viewer swap " + copyArray[copyArray.indexOf(left[indexLeft])] + " " + copyArray[copyArray.indexOf(right[indexRight])])

            viewer.liftElements(copyArray.indexOf(left[indexLeft]), copyArray.indexOf(left[indexLeft]));
            viewer.liftElements(copyArray.indexOf(right[indexRight]), copyArray.indexOf(right[indexRight]));


            indexRight++;

        }
    }


    if (right.length > 0) {
        console.log("right slice = " + right.slice(indexRight));
        for (let i = 0; i < right.slice(indexRight).length; i++) {
            viewer.liftElements(copyArray.indexOf(right.slice(indexRight)[i]), copyArray.indexOf(right.slice(indexRight)[i]));
            viewer.deselectPivotElement(copyArray.indexOf(right.slice(indexRight)[i]));
        }
    }
    if (left.length > 0) {
        console.log("left slice = " + left.slice(indexLeft));
        for (let i = 0; i < left.slice(indexLeft).length; i++) {
            viewer.liftElements(copyArray.indexOf(left.slice(indexLeft)[i]), copyArray.indexOf(left.slice(indexLeft)[i]));
            viewer.deselectPivotElement(copyArray.indexOf(left.slice(indexLeft)[i]));
        }
    }
    console.log(copyArray + "right slice = " + right.slice(indexRight) + "left slice = " + left.slice(indexLeft));
    console.log("result : " + result.concat(left.slice(indexLeft)).concat(right.slice(indexRight)));
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));

}

function swapInArray(a : number, b : number) {
    var tempVal = copyArray[a];
    copyArray[a] = copyArray[b];
    copyArray[b] = tempVal;
}


function delay() {
    try {
        setTimeout(0);
    } catch (e) {
        e.printStackTrace();
    }
}


function getThisArray() {
    return sortArray;
}

function setRandomMyArray() {
    for (let i: number = 0; i < n; i++) {
        sortArray[i] = randomInt(0, 100);
    }

    return sortArray;
}

function setSortedArray(){
    let arr: number[] = setRandomMyArray();
    return arr.sort((n1, n2) => n1 - n2);
}

function setInvSortedArray() {

    return setSortedArray().reverse();
}

function isSorted(arr: number[]) {

    return arr.forEach((n1, n2) => n1 <= n2);
}

function setAlmostSortedArray(): number[] {
    let arr: number[] = setSortedArray();
    for (let i: number = 1; i < arr.length - 1; i++) {
        if (Math.random() < 0.70) {
            if (Math.random() < 0.5) {
                let temp: number = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            } else {
                let temp: number = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = temp;
            }
        }
    }

    //If sorted array, try again.
    if (isSorted(arr)) {
        return setAlmostSortedArray();
    }

    return arr;
}


function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}