"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var React = require("react");
var fa_1 = require("../mods/fa");
var plain_select_1 = require("../mods/plain-select");
var GameSelectorComponent = (function (_super) {
    __extends(GameSelectorComponent, _super);
    function GameSelectorComponent() {
        _super.apply(this, arguments);
    }
    GameSelectorComponent.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        this.setState({
            first: this.props.players[0],
            second: this.props.players[1]
        });
    };
    GameSelectorComponent.prototype.render = function () {
        var _this = this;
        var players = this.props.players;
        var _a = this.state, first = _a.first, second = _a.second;
        return React.createElement("article", {className: "game-player"}, React.createElement("section", {className: "game-selector"}, React.createElement("div", {className: "game-first"}, React.createElement("h1", null, "先手"), React.createElement(plain_select_1.default, React.__spread({}, {
            values: players,
            selected: first,
            onChange: function (first) { return _this.setState({ first: first }); }
        }))), React.createElement("div", {className: "game-second"}, React.createElement("h1", null, "後手"), React.createElement(plain_select_1.default, React.__spread({}, {
            values: players,
            selected: second,
            onChange: function (second) { return _this.setState({ second: second }); }
        }))), React.createElement("div", {className: "game-start"}, React.createElement("button", {onClick: function () { return _this.dispatch('select', first, second); }}, React.createElement(fa_1.default, {icon: "paw"}), "対戦開始"))));
    };
    return GameSelectorComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameSelectorComponent;
//# sourceMappingURL=game-selector-component.js.map