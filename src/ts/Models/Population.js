"use strict";
function shuffle(array) {
    var arrayClone = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        arrayClone.push(item);
    }
    var counter = arrayClone.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = arrayClone[counter];
        arrayClone[counter] = arrayClone[index];
        arrayClone[index] = temp;
    }
    return arrayClone;
}
var Population = (function () {
    function Population(pointsList) {
        this.points = shuffle(pointsList);
    }
    Object.defineProperty(Population.prototype, "size", {
        get: function () {
            return this.points.length;
        },
        enumerable: true,
        configurable: true
    });
    Population.prototype.swap = function (i, j) {
        if (this.points[i] && this.points[j]) {
            var tmp = this.points[i];
            this.points[i] = this.points[j];
            this.points[j] = tmp;
        }
    };
    // Mutation
    Population.prototype.singleMutation = function () {
        var pointsLength = this.points.length;
        var randomPosition_1 = Math.floor((Math.random() * pointsLength));
        var randomPosition_2 = Math.floor((Math.random() * pointsLength));
        var tempPoints = [
            this.points[randomPosition_1],
            this.points[randomPosition_2]];
        this.points[randomPosition_2] = tempPoints[0];
        this.points[randomPosition_1] = tempPoints[1];
    };
    Population.prototype.fullMutation = function () {
        this.points = shuffle(this.points);
    };
    Object.defineProperty(Population.prototype, "fullDistance", {
        get: function () {
            var fullDistance = 0;
            for (var i = 0; i < this.points.length - 1; i++) {
                fullDistance += this.points[i].distanceTo(this.points[i + 1]);
            }
            return fullDistance;
        },
        enumerable: true,
        configurable: true
    });
    return Population;
}());
exports.Population = Population;
//# sourceMappingURL=Population.js.map