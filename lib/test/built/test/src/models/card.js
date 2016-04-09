"use strict";
var Card = (function () {
    function Card(suit, number, isOpened) {
        if (isOpened === void 0) { isOpened = false; }
        this.suit = suit;
        this.number = number;
        this.isOpened = isOpened;
    }
    Card.prototype.open = function () {
        this.isOpened = true;
    };
    Card.prototype.close = function () {
        this.isOpened = false;
    };
    return Card;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Card;
//# sourceMappingURL=card.js.map