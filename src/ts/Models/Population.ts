import { City } from './City';
import { Helper } from './Helper';

export class Population {
    cities: Array<City>;
    constructor(pointsList: Array<City>) {
        this.cities = Helper.shuffle(pointsList);
    }

    get size() {
        return this.cities.length;
    }

    swap(i, j) {
        if (this.cities[i] && this.cities[j]) {
            let tmp = this.cities[i];
            this.cities[i] = this.cities[j];
            this.cities[j] = tmp;
        }
    }

    // Mutation
    randomMutation() {
       let rand = (Math.random() * 100) + 1;
       if (rand <= 5) {
           this.fullMutation();
       } else if (rand > 5 && rand <= 25) {
           this.singleMutation();
       }
    }

    // Swap cities from 2 random positions
    singleMutation() {
        let pointsLength = this.cities.length;
        
        let randomPosition_1 = Math.floor((Math.random() * pointsLength));
        let randomPosition_2 = Math.floor((Math.random() * pointsLength));

        let tempPoints = [
            this.cities[randomPosition_1],
            this.cities[randomPosition_2],
        ];

        this.cities[randomPosition_2] = tempPoints[0];
        this.cities[randomPosition_1] = tempPoints[1];
    }

    // Shuffle cities array
    fullMutation() {
        this.cities = Helper.shuffle(this.cities)
    }

    get fullDistance() {
        let fullDistance: number = 0;

        for (let i = 0; i < this.cities.length - 1; i++) {
            fullDistance += this.cities[i].distanceTo(this.cities[i + 1]);
        }

        return fullDistance;
    }

}