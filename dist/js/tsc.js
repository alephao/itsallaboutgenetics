/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var City_1 = __webpack_require__(5);
	var Generation_1 = __webpack_require__(3);
	var theCities = [];
	var generation = new Generation_1.Generation();
	var best = null;
	var numberOfGenerations = 1;
	var tsp = function (p) {
	    p.setup = function () {
	        p.createCanvas(800, 500);
	        p.fill(255);
	        p.stroke(255);
	        p.textSize(16);
	    };
	    p.draw = function () {
	        p.background(0);
	        for (var i = 0; i < theCities.length; i++) {
	            var city = theCities[i];
	            p.ellipse(city.x, city.y, 4, 4);
	        }
	        p.text("Cities: " + theCities.length, 15, 25);
	        if (generation.populations.length > 0) {
	            if (generation.populations[0].cities.length > 3) {
	                generation = generation.nextGeneration();
	                numberOfGenerations += 1;
	                p.text("Generations: " + numberOfGenerations, 100, 25);
	                var tb = generation.getBestPopulation(true);
	                if (best == null) {
	                    best = tb;
	                }
	                best = tb.fullDistance < best.fullDistance ? tb : best;
	                p.text("Distance: " + best.fullDistance, 250, 25);
	                var bestCities = best.cities;
	                if (bestCities != null) {
	                    for (var i = 0; i < bestCities.length - 1; i++) {
	                        var p1 = bestCities[i];
	                        var p2 = bestCities[i + 1];
	                        p.line(p1.x, p1.y, p2.x, p2.y);
	                    }
	                }
	            }
	        }
	    };
	    p.mousePressed = function () {
	        theCities.push(new City_1.City(p.mouseX, p.mouseY));
	        generation = new Generation_1.Generation();
	        generation.populate(theCities);
	        best = null;
	        numberOfGenerations = 1;
	    };
	};
	var tspp5 = new p5(tsp);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Population_1 = __webpack_require__(4);
	var Helper_1 = __webpack_require__(6);
	var Generation = (function () {
	    function Generation(populations) {
	        if (populations === void 0) { populations = []; }
	        this.populations = [];
	        this.populations = populations;
	    }
	    Generation.prototype.populate = function (points) {
	        for (var i = 0; i < 5; i++) {
	            var newPopulation = new Population_1.Population(Helper_1.Helper.shuffle(points.slice()));
	            this.populations.push(newPopulation);
	        }
	    };
	    Generation.prototype.getBestPopulation = function (copy) {
	        if (copy === void 0) { copy = false; }
	        if (this.populations.length < 3) {
	            return null;
	        }
	        var bestPopulation = this.populations[0];
	        for (var _i = 0, _a = this.populations; _i < _a.length; _i++) {
	            var pop = _a[_i];
	            var tmp = pop.fullDistance < bestPopulation.fullDistance ? pop : bestPopulation;
	            bestPopulation = tmp;
	        }
	        if (copy) {
	            return new Population_1.Population(bestPopulation.cities);
	        }
	        else {
	            return bestPopulation;
	        }
	    };
	    // Crossover
	    //
	    // DAD:   [A, B, C, D, E, F, G]
	    // MOM:   [B, D, C ,F ,G, A, E]
	    // CHILD: [B, D, C, D, E, F, E] 
	    // STEP 1
	    // Create a random range (2...5) 
	    // And get the chromosomes in this range
	    // RANGE DAD: [C, D, E ,F]
	    // RANGE MOM: [C, F, G, A]
	    // STEP 2
	    // We get rid of the cities that are inside of both arrays (C, F)
	    // RANGE DAD: [D, E]
	    // RANGE MOM: [G, A]
	    // STEP 3
	    // Than, we swap the position on mom's arrays with the equivalent in dad's array
	    // SWAP G and D
	    // MOM:   [B, (D), C, F, (G), A, E]
	    // MOM:   [B, (G), C, F, (D), A, E] - SWAP (1, 4)
	    // SWAP A and E
	    // MOM:   [B, G, C , F, D, (A), (E)]
	    // MOM:   [B, G, C , F, D, (E), (A)] - SWAP (5, 6)
	    // CHILD = MOM
	    Generation.prototype.crossover = function (dad, mom) {
	        var child = new Population_1.Population(mom.cities.slice());
	        // STEP 1
	        var randomPosition_1 = Math.floor((Math.random() * dad.size));
	        var randomPosition_2 = Math.floor((Math.random() * dad.size));
	        var startRange = Math.min(randomPosition_1, randomPosition_2);
	        var endRange = Math.max(randomPosition_1, randomPosition_2);
	        // if (startRange === 0 && endRange === dad.size) {
	        //     if (dad.size > 5) {
	        //         startRange += 2;
	        //         endRange -= 2;
	        //     }
	        // }
	        // STEP 2
	        var rangeSize = endRange - startRange;
	        var dadSwaps = dad.cities.slice();
	        dadSwaps.splice(startRange, rangeSize);
	        var momSwaps = mom.cities.slice();
	        momSwaps.splice(startRange, rangeSize);
	        for (var i = 0; i < rangeSize; i++) {
	            var dadPoint = dadSwaps[i];
	            var momIndex = momSwaps.indexOf(dadPoint);
	            if (momIndex > -1) {
	                dadSwaps.splice(i, 1);
	                momSwaps.splice(momIndex, 1);
	            }
	        }
	        // Step 3
	        for (var i = 0; i < dadSwaps.length; i++) {
	            var momIndex = mom.cities.indexOf(momSwaps[i]);
	            var dadIndex = dad.cities.indexOf(dadSwaps[i]);
	            child.swap(momIndex, dadIndex);
	        }
	        return child;
	    };
	    Generation.prototype.nextGeneration = function () {
	        var best = this.getBestPopulation(true);
	        var newPopulations = [best];
	        for (var i = 1; i < this.populations.length; i++) {
	            var randomIndex = Math.floor((Math.random() * this.populations.length));
	            while (randomIndex == i) {
	                randomIndex = Math.floor((Math.random() * this.populations.length));
	            }
	            var newPopulation = this.crossover(this.populations[randomIndex], this.populations[i]);
	            newPopulation.randomMutation();
	            newPopulations.push(newPopulation);
	        }
	        return new Generation(newPopulations);
	    };
	    return Generation;
	}());
	exports.Generation = Generation;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Helper_1 = __webpack_require__(6);
	var Population = (function () {
	    function Population(pointsList) {
	        this.cities = Helper_1.Helper.shuffle(pointsList);
	    }
	    Object.defineProperty(Population.prototype, "size", {
	        get: function () {
	            return this.cities.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Population.prototype.swap = function (i, j) {
	        if (this.cities[i] && this.cities[j]) {
	            var tmp = this.cities[i];
	            this.cities[i] = this.cities[j];
	            this.cities[j] = tmp;
	        }
	    };
	    // Mutation
	    Population.prototype.randomMutation = function () {
	        var rand = (Math.random() * 100) + 1;
	        if (rand <= 5) {
	            this.fullMutation();
	        }
	        else if (rand > 5 && rand <= 25) {
	            this.singleMutation();
	        }
	    };
	    // Swap cities from 2 random positions
	    Population.prototype.singleMutation = function () {
	        var pointsLength = this.cities.length;
	        var randomPosition_1 = Math.floor((Math.random() * pointsLength));
	        var randomPosition_2 = Math.floor((Math.random() * pointsLength));
	        var tempPoints = [
	            this.cities[randomPosition_1],
	            this.cities[randomPosition_2],
	        ];
	        this.cities[randomPosition_2] = tempPoints[0];
	        this.cities[randomPosition_1] = tempPoints[1];
	    };
	    // Shuffle cities array
	    Population.prototype.fullMutation = function () {
	        this.cities = Helper_1.Helper.shuffle(this.cities);
	    };
	    Object.defineProperty(Population.prototype, "fullDistance", {
	        get: function () {
	            var fullDistance = 0;
	            for (var i = 0; i < this.cities.length - 1; i++) {
	                fullDistance += this.cities[i].distanceTo(this.cities[i + 1]);
	            }
	            return fullDistance;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Population;
	}());
	exports.Population = Population;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var City = (function () {
	    function City(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    // Get distance between self and other point
	    City.prototype.distanceTo = function (otherPoint) {
	        return Math.sqrt(Math.pow((this.x - otherPoint.x), 2) + Math.pow((this.y - otherPoint.y), 2));
	    };
	    return City;
	}());
	exports.City = City;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var Helper = (function () {
	    function Helper() {
	    }
	    Helper.shuffle = function (array) {
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
	    };
	    return Helper;
	}());
	exports.Helper = Helper;


/***/ }
/******/ ]);