"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var React = require("react");
var card_module_1 = require("../test/src/mods/card-module");
var GameComponent = (function (_super) {
    __extends(GameComponent, _super);
    function GameComponent() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(GameComponent.prototype, "engine", {
        get: function () {
            return this.props.engine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameComponent.prototype, "cards", {
        get: function () {
            return this.engine.cards;
        },
        enumerable: true,
        configurable: true
    });
    GameComponent.prototype.writeCards = function () {
        this.cards.map(function (card) {
            return React.createElement(card_module_1.default, React.__spread({}, { card: card }));
        });
    };
    GameComponent.prototype.render = function () {
        return React.createElement("article", null, this.writeCards());
    };
    return GameComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameComponent;
//# sourceMappingURL=game-component.js.map