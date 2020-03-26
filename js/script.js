/*
 * @Author: Tianyi Lu
 * @Description: 
 * @Date: 2020-03-24 14:30:24
 * @LastEditors: Tianyi Lu
 * @LastEditTime: 2020-03-26 09:00:57
 */


const gamePage = `
    <h5 style="padding-top: 70px;">Press "E" to choose left, Press "I" to choose right, Press "Space" to start</h5>
    <div class="row" style="padding-top: 200px;">
        <div class="col px-3 py-5" id="left">
            <h4>High Cal</h4>
        </div>
        <div class="col px-3 py-5" id="word">
        </div>
        <div class="col px-3 py-5" id="right">
            <h4>Low Cal</h4>
        </div>
    </div>`;

let rightSound = new Audio("audio/right.mp3");
let wrongSound = new Audio("audio/wrong.mp3");

var userName = "anonymous";

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

let oPage = document.getElementById("page");

var result = {};

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
        oPage.innerHTML = `<h4 style="padding-top: 300px">Finished</h4>
                           <input type="button" value="check results" onclick="showResults()"/>`;
        return ["Finished", -1];
    }

    let randIndex = randomNum(0, 1);

    if (data1[0].items.length == 0) {
        randIndex = 1;
    }

    if (data1[1].items.length == 0) {
        randIndex = 0;
    }

    let res = data1[randIndex].items.pop();

    return [res, randIndex];
}

function getName(){
    userName = document.getElementById("name").value;
    oPage.innerHTML = `<h4 style="padding-top: 300px">Hi ${userName}! If you are prepared, press 'start'</h4>
                       <input type="button" value="start" onclick="startGame()"/>`;
}

function startGame(){
    oPage.innerHTML = gamePage;
    let oLeft = document.getElementById("left");
    let oRight = document.getElementById("right");
    let oWord = document.getElementById("word");
    
    let wordChoice = getRandomItemFromData();

    let prevTime, currTime;
    
    let hasStart = false;

    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 69) { // 按 E or e
            if (hasStart) {
                if (wordChoice[1] == 0) {

                    currTime = new Date();
                    let duration = currTime - prevTime;
                    result[wordChoice[0]] = duration;
                    
                    rightSound.play();
                    oLeft.style.background = "green";
                    document.onkeyup = function () {oLeft.style.background = "white"};
                    wordChoice = getRandomItemFromData();
                    oWord.innerHTML = "<h4>" + wordChoice[0] + "</h4>";

                    prevTime = currTime;
                } 
                else if (wordChoice[1] == 1) {
                    wrongSound.play();
                    oLeft.style.background = "red";
                    document.onkeyup = function () {oLeft.style.background = "white"};                
                }
            }
        }
        if (e && e.keyCode == 73) { // 按 I or i
            if (hasStart) {
                if (wordChoice[1] == 1) {

                    currTime = new Date();
                    let duration = currTime - prevTime;
                    result[wordChoice[0]] = duration;

                    rightSound.play();
                    oRight.style.background = "green";
                    document.onkeyup = function () {oRight.style.background = "white"};
                    wordChoice = getRandomItemFromData();
                    oWord.innerHTML = "<h4>" + wordChoice[0] + "</h4>";

                    prevTime = currTime;
                } 
                else if (wordChoice[1] == 0) {
                    wrongSound.play();
                    oRight.style.background = "red";
                    document.onkeyup = function () {oRight.style.background = "white"};                
                }
            }
        }
        if (e && e.keyCode == 32) { // space
            if (!hasStart) {
                oWord.innerHTML = "<h4>" + wordChoice[0] + "</h4>";
                prevTime = new Date();
                hasStart = true;
            }
        }
    };
}

function showResults(){
    oPage.innerHTML = `<div id="res" style="padding-top: 300px"></div>`
    oRes = document.getElementById("res");
    for (let key in result) {
        oRes.innerHTML += `<h5>${key}: ${result[key]}</h5>`;
    }
}