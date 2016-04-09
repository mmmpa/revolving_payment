"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var GameSelectorContext = (function (_super) {
    __extends(GameSelectorContext, _super);
    function GameSelectorContext() {
        _super.apply(this, arguments);
    }
    GameSelectorContext.prototype.initialState = function () {
        return {};
    };
    GameSelectorContext.prototype.listen = function (to) {
        to('route:game', function () {
            console.log('click');
        });
    };
    return GameSelectorContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameSelectorContext;
//# sourceMappingURL=game-selector-context.js.map