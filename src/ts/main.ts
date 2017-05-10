import { Drawer } from './Models/Drawer';
import { City } from './Models/City';
import { Generation } from './Models/Generation';
import { Population } from './Models/Population';

let theCities: Array<City> = [];

let generation = new Generation();

let best: Population = null;

let numberOfGenerations: number = 1;

let tsp = function( p ) {

    p.setup = function() {
        p.createCanvas(800, 500);
        p.fill(255);
        p.stroke(255);
        p.textSize(16);
    };

    p.draw = function() {
        p.background(0);

        for (let i = 0; i < theCities.length; i++) {
            let city = theCities[i];
            p.ellipse(city.x, city.y, 4, 4);
        }

        p.text("Cities: " + theCities.length, 15, 25);

        if (generation.populations.length > 0) {
            if (generation.populations[0].cities.length > 3) {
                generation = generation.nextGeneration();
                numberOfGenerations += 1;
                p.text("Generations: " + numberOfGenerations, 100, 25);
                let tb = generation.getBestPopulation(true);
                if (best == null) { best = tb; }
                best = tb.fullDistance < best.fullDistance ? tb : best;
                p.text("Distance: " + best.fullDistance, 250, 25);
                let bestCities = best.cities;
                if (bestCities != null) {
                    for (let i = 0; i < bestCities.length - 1; i++) {
                        let p1 = bestCities[i];
                        let p2 = bestCities[i+1];

                        p.line(p1.x, p1.y, p2.x, p2.y);
                    }
                }
            }
        }
    };

    p.mousePressed = function() {
        theCities.push(new City(p.mouseX, p.mouseY));
        generation = new Generation();
        generation.populate(theCities);
        best = null;
        numberOfGenerations = 1;
    };
};

let tspp5 = new p5(tsp);

