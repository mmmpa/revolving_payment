"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var GameContext = (function (_super) {
    __extends(GameContext, _super);
    function GameContext() {
        _super.apply(this, arguments);
    }
    GameContext.prototype.initialState = function () {
        return {};
    };
    GameContext.prototype.listen = function (to) {
    };
    return GameContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameContext;
//# sourceMappingURL=game-context.js.map