/*
 * @Author: Tianyi Lu
 * @Description: 
 * @Date: 2020-03-24 14:30:24
 * @LastEditors: Tianyi Lu
 * @LastEditTime: 2020-03-25 21:31:34
 */
let data1 = [
    {
        "cat_name": "High",
        "items": ["chocolate", "hotdog", "cheesecake", "fries"],
    },
    {
        "cat_name": "Low",
        "items": ["apple", "lettuce", "chicken breast", "boiled fish"],
    }
]

let oLeft = document.getElementById("left");
let oRight = document.getElementById("right");
let oWord = document.getElementById("word");

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

function getRandomItemFromData(){
    if (data1[0].items.length == 0 && data1[1].items.length == 0) {
        return "Finished";
    }

    let randIndex = randomNum(0, 1);

    if (data1[0].items.length == 0) {
        randIndex = 1;
    }

    if (data1[1].items.length == 0) {
        randIndex = 0;
    }

    let res = data1[randIndex].items.pop();

    return res;
}

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 69) { // 按 E or e
        //TODO
    }
    if (e && e.keyCode == 73) { // 按 I or i
        //TODO
    }
    if (e && e.keyCode == 32) { // space
        oWord.innerHTML = "<h4>" + getRandomItemFromData() + "</h4>";
    }
};