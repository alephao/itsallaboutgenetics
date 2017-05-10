"use strict";
var Drawer_1 = require('./Models/Drawer');
var Point_1 = require('./Models/Point');
var Generation_1 = require('./Models/Generation');
var canvas = document.getElementById('drawBoard');
var drawer = new Drawer_1.Drawer(canvas);
var points = [];
var generation = new Generation_1.Generation();
document.querySelector('#drawBoard').addEventListener('click', function (ev) {
    var x = ev.pageX - canvas.offsetLeft;
    var y = ev.pageY - canvas.offsetTop;
    var newPoint = new Point_1.Point(x, y);
    points.push(newPoint);
    drawer.drawPoint(newPoint);
});
document.querySelector('#draw').addEventListener('click', function () {
    drawer.drawPath(points);
    generation.populate(points);
    console.log("DA POPULATIONS");
    console.log(generation.populations);
    var p1 = generation.populations[0];
    var p2 = generation.populations[1];
    console.log(p1);
    console.log(p2);
    generation.crossover(p1, p2);
});
// /* Initializers */
// var totalPoints = 0;
// var pointsArray = [];
// $('canvas').click(function(e){
//     if (totalPoints >= maxPoints) return false;
//     var x = e.pageX - $(canvas).offset().left;
//     var y = e.pageY - $(canvas).offset().top;
//     pointsArray[totalPoints] = new Point(x, y);
//     drawPoint(x - pointRadius, y - pointRadius);
//     totalPoints++;
//     console.log("Point generated!");
// });
// /****************/
// /* GA Functions */
// /****************/
// /* Simple Mutation */
// // Explanation:
// // Ramdonly choose 2 positions on pointsArray
// // [C, B, (D), F, G, (A), H, E]
// // tmp = D;
// // set [C, B, (A), F, G, (A), H, E]
// // set [C, B, A, F, G, (tmp), H, E]
// function simpleMutation(generation) {
//     var firstRand = Math.floor(Math.random() * pointsArray.length);
//     var secondRand = Math.floor(Math.random() * pointsArray.length);
//     var tmp = generation[firstRand];
//     generation[firstRand] = generation[secondRand];
//     generation[secondRand] = tmp;
//     console.log("Simple Mutation !");
//     return generation;
// }
// /* Full Mutation */
// // Explanation:
// // Shuffle the array
// function fullMutation(generation) {
//     for (var j, x, i = generation.length; i; j = Math.floor(Math.random() * i), x = generation[--i], generation[i] = generation[j], generation[j] = x);
//     console.log("Full Mutation!");
//     return generation;
// }
// /* Crossing Over */
// // Explanation: 
//# sourceMappingURL=main.js.map