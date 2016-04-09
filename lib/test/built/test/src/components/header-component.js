"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var React = require("react");
var HeaderComponent = (function (_super) {
    __extends(HeaderComponent, _super);
    function HeaderComponent() {
        _super.apply(this, arguments);
    }
    HeaderComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("header", {className: "game-header"}, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {onClick: function () { return _this.dispatch('route:selector'); }}, "Selector")), React.createElement("li", null, React.createElement("a", {onClick: function () { return _this.dispatch('route:game'); }}, "Game"))));
    };
    return HeaderComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderComponent;
//# sourceMappingURL=header-component.js.map