"use strict";
var Population_1 = require('./Population');
var Generation = (function () {
    function Generation() {
        this.populations = [];
    }
    Generation.prototype.populate = function (points) {
        for (var i = 0; i < 5; i++) {
            var newPopulation = new Population_1.Population(points);
            this.populations.push(newPopulation);
        }
        console.log("populations");
        console.log(this.populations);
    };
    Generation.prototype.getBestPopulation = function () {
        var bestPopulation = this.populations[0];
        for (var _i = 0, _a = this.populations; _i < _a.length; _i++) {
            var pop = _a[_i];
            bestPopulation = bestPopulation.fullDistance < pop.fullDistance ? bestPopulation : pop;
        }
        return bestPopulation;
    };
    // Crossover
    //
    // DAD:   [A, B, C, D, E, F, G]
    // MOM:   [B, D, C ,F ,G, A, E]
    // CHILD: [B, D, C, D, E, F, E] 
    // Create a random range (2...5) 
    // And get the cromossomes in this range
    // RANGE DAD: [C, D, E ,F]
    // RANGE MOM: [C, F, G, A]
    // We get rid of the points that are inside of both arrays (C, F)
    // RANGE DAD: [D, E]
    // RANGE MOM: [G, A]
    // Than, we swap the position on mom's arrays with the equivalent in dad's array
    // SWAP G and D
    // MOM:   [B, D, C ,F ,G, A, E]
    // MOM:   [B, G, C ,F ,D, A, E] - SWAP (1, 4)
    // SWAP A and E
    // MOM:   [B, G, C ,F ,D, A, E] 
    // MOM:   [B, G, C ,F ,D, E, A] - SWAP (5, 6)
    // CHILD = MOM
    Generation.prototype.crossover = function (dad, mom) {
        console.log("DAD == MOM: " + (dad === mom));
        var child = mom.points;
        var randomPosition_1 = Math.floor((Math.random() * dad.size));
        var randomPosition_2 = Math.floor((Math.random() * dad.size));
        var startRange = Math.min(randomPosition_1, randomPosition_2);
        var endRange = Math.max(randomPosition_1, randomPosition_2);
        if (startRange === 0 && endRange === dad.size) {
            if (dad.size > 5) {
                startRange += 2;
                endRange -= 2;
            }
        }
        var specialIndexes = [];
        for (var i = startRange; i < endRange; i++) {
            child[i] = dad.points[i];
            if (!(dad.points.indexOf(mom.points[i]) >= startRange && dad.points.indexOf(mom.points[i]) <= endRange)) {
                specialIndexes.push(i);
            }
        }
        console.log(startRange + "..." + endRange);
        console.log("Dad");
        console.log(dad);
        console.log("Mom");
        console.log(mom);
        console.log(specialIndexes);
    };
    return Generation;
}());
exports.Generation = Generation;
//# sourceMappingURL=Generation.js.map