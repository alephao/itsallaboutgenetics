"use strict";
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.distanceTo = function (otherPoint) {
        return Math.sqrt(Math.pow((this.x - otherPoint.x), 2) + Math.pow((this.y - otherPoint.y), 2));
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=Point.js.map