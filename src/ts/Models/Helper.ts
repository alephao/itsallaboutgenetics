export class Helper {
    static shuffle<T>(array: Array<T>): Array<T> {
        let arrayClone: Array<T> = [];
        for (let item of array) {
            arrayClone.push(item);
        }

        let counter = arrayClone.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = arrayClone[counter];
            arrayClone[counter] = arrayClone[index];
            arrayClone[index] = temp;
        }

        return arrayClone;
    }
}