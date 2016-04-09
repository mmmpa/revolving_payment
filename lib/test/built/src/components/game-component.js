"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var React = require("react");
var card_module_1 = require("../mods/card-module");
var card_engine_1 = require("../models/card-engine");
var result_module_1 = require("../mods/result-module");
var GameComponent = (function (_super) {
    __extends(GameComponent, _super);
    function GameComponent() {
        _super.apply(this, arguments);
    }
    GameComponent.prototype.writeResult = function () {
        var _this = this;
        if (this.props.state === card_engine_1.CardState.Finish) {
            var result = this.props.result;
            return React.createElement(result_module_1.default, React.__spread({}, {
                result: result,
                back: function () { return _this.dispatch('back'); },
                retry: function () { return _this.dispatch('retry'); }
            }));
        }
    };
    GameComponent.prototype.writeCards = function () {
        var _this = this;
        var cards = this.props.cards;
        return cards.map(function (card, key) {
            return React.createElement(card_module_1.default, React.__spread({}, { key: key, card: card, onClick: function (card) { return _this.dispatch('choose:card', card); } }));
        });
    };
    GameComponent.prototype.render = function () {
        return React.createElement("article", {className: "game-field"}, this.writeResult(), React.createElement("section", {className: "card-table"}, this.writeCards()));
    };
    return GameComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameComponent;
//# sourceMappingURL=game-component.js.map