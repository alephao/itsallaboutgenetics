export class City {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // Get distance between self and other point
  distanceTo(otherPoint: City): number {
    return Math.sqrt(Math.pow((this.x - otherPoint.x), 2) + Math.pow((this.y - otherPoint.y), 2));
  }
}