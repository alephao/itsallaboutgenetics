import { Population } from './Population';
import { City } from './City';
import { Helper } from './Helper';

export class Generation {
    populations: Array<Population> = [];

    constructor(populations: Array<Population> = []) {
        this.populations = populations;
    }

    populate(points: Array<City>) {
        for (let i = 0; i < 5; i++) {
            let newPopulation = new Population(Helper.shuffle(points.slice()));
            this.populations.push(newPopulation);
        }
    }

    getBestPopulation(copy: boolean = false): Population {
        if (this.populations.length < 3) {
            return null;
        }

        let bestPopulation: Population = this.populations[0];
        for (let pop of this.populations) {
            let tmp = pop.fullDistance < bestPopulation.fullDistance ? pop : bestPopulation;
            bestPopulation = tmp;
        }

        if (copy) {
            return new Population(bestPopulation.cities);
        } else {
            return bestPopulation;
        }
    }

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

    crossover(dad: Population, mom: Population): Population {

        let child: Population = new Population(mom.cities.slice());

        // STEP 1
        let randomPosition_1: number = Math.floor((Math.random() * dad.size));
        let randomPosition_2: number = Math.floor((Math.random() * dad.size));
        
        let startRange: number = Math.min(randomPosition_1, randomPosition_2);
        let endRange:  number = Math.max(randomPosition_1, randomPosition_2); 

        // if (startRange === 0 && endRange === dad.size) {
        //     if (dad.size > 5) {
        //         startRange += 2;
        //         endRange -= 2;
        //     }
        // }

        // STEP 2
        let rangeSize: number = endRange - startRange;
        let dadSwaps: Array<City> = dad.cities.slice();
        dadSwaps.splice(startRange, rangeSize);
        let momSwaps: Array<City> = mom.cities.slice();
        momSwaps.splice(startRange, rangeSize);
        
        for (let i = 0; i < rangeSize; i++) {
            let dadPoint = dadSwaps[i];
            let momIndex = momSwaps.indexOf(dadPoint);


            if (momIndex > -1) {
                dadSwaps.splice(i, 1);
                momSwaps.splice(momIndex, 1);
            }
        }

        // Step 3
        for (let i = 0; i < dadSwaps.length; i++) {
            let momIndex = mom.cities.indexOf(momSwaps[i]);
            let dadIndex = dad.cities.indexOf(dadSwaps[i]);

            child.swap(momIndex, dadIndex);
        }

        return child;
    }

    nextGeneration(): Generation {
        let best = this.getBestPopulation(true);
        let newPopulations: Array<Population> = [best];

        for (let i = 1; i < this.populations.length; i++) {

            let randomIndex = Math.floor((Math.random() * this.populations.length));

            while (randomIndex == i) {
                randomIndex = Math.floor((Math.random() * this.populations.length));
            }

            let newPopulation = this.crossover(this.populations[randomIndex], this.populations[i]);
            newPopulation.randomMutation();
            newPopulations.push(newPopulation);
        }

        return new Generation(newPopulations);
    }
    
}
