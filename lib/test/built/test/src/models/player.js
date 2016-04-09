"use strict";
var Player = (function () {
    function Player(name, isCpu) {
        if (name === void 0) { name = 'no name'; }
        if (isCpu === void 0) { isCpu = false; }
        this.name = name;
        this.isCpu = isCpu;
    }
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=player.js.map