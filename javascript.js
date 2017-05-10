"use strict";

/* Program Vars */
var maxPoints = 100;

/* Get Canvas Context */
var canvas = document.getElementById("drawBoard");
var drawer = new Drawer(canvas);

/* Context Properties */
var pointRadius = 3;


/* Context Functions*/
function clearContext() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPoint(x, y) {
    context.fillRect(x, y, pointRadius*2, pointRadius*2);
}

function drawLineBetweenPoints(p1, p2) {
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
}

function drawPath() {
    for (i = 0; i < pointsArray.length - 1; i++) {
        drawLine(pointsArray[i], pointsArray[i+1]);
    }

    drawLine(pointsArray[0], pointsArray[pointsArray.length - 1]);
}

/* Initializers */
var totalPoints = 0;
var pointsArray = [];

function initPop() {
    pop = new Population;
    pop.generation = 0;
    pop.arr = pointsArray.slice(0);
}

function initGen() {

}

/* Object: City */
function Point(x, y) {
    this.index = pointsArray.length;
    this.x = x;
    this.y = y;

    pointsArray.push(this);
}

/* Object: Population */
function Population() {
    this.index = 0;
    this.generation = 0;
    this.arr = [];
}

/* Object: Generation */
function Generation() {
    this.index = 0;
    this.arr = [];
    this.best = 0;
}



$('canvas').click(function(e){

    if (totalPoints >= maxPoints) return false;

    var x = e.pageX - $(canvas).offset().left;
    var y = e.pageY - $(canvas).offset().top;

    pointsArray[totalPoints] = new Point(x, y);

    drawPoint(x - pointRadius, y - pointRadius);

    totalPoints++;

    console.log("City generated!");

});

/****************/
/* GA Functions */
/****************/

/* Simple Mutation */
// Explanation:
// Ramdonly choose 2 positions on pointsArray
// [C, B, (D), F, G, (A), H, E]
// tmp = D;
// set [C, B, (A), F, G, (A), H, E]
// set [C, B, A, F, G, (tmp), H, E]


function simpleMutation(generation) {
    var firstRand = Math.floor(Math.random() * pointsArray.length);
    var secondRand = Math.floor(Math.random() * pointsArray.length);

    var tmp = generation[firstRand];
    generation[firstRand] = generation[secondRand];
    generation[secondRand] = tmp;

    console.log("Simple Mutation !");
    return generation;
}

/* Full Mutation */
// Explanation:
// Shuffle the array

function fullMutation(generation) {
    for (var j, x, i = generation.length; i; j = Math.floor(Math.random() * i), x = generation[--i], generation[i] = generation[j], generation[j] = x);
    console.log("Full Mutation!");
    return generation;
}

/* Crossing Over */
// Explanation:
