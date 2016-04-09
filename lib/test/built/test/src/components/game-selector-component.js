"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var React = require("react");
var GameSelectorComponent = (function (_super) {
    __extends(GameSelectorComponent, _super);
    function GameSelectorComponent() {
        _super.apply(this, arguments);
    }
    GameSelectorComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null, React.createElement("a", {onClick: function () { return _this.dispatch('route:game'); }}, "game selector component"));
    };
    return GameSelectorComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameSelectorComponent;
//# sourceMappingURL=game-selector-component.js.map