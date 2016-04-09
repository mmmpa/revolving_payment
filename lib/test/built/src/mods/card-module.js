"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var constants_1 = require('../constants/constants');
var CardModule = (function (_super) {
    __extends(CardModule, _super);
    function CardModule() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CardModule.prototype, "isOpened", {
        get: function () {
            return this.props.card.isOpened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardModule.prototype, "number", {
        get: function () {
            return this.props.card.number;
        },
        enumerable: true,
        configurable: true
    });
    CardModule.prototype.suitClass = function () {
        switch (this.props.card.suit) {
            case constants_1.Suit.Spade:
                return 'spade';
            case constants_1.Suit.Dia:
                return 'dia';
            case constants_1.Suit.Club:
                return 'club';
            case constants_1.Suit.Heart:
                return 'heart';
        }
    };
    CardModule.prototype.writeClass = function () {
        var base = this.isOpened ? 'card opened ' : 'card closed ';
        return base + this.suitClass();
    };
    CardModule.prototype.write = function () {
        if (!this.isOpened) {
            return '';
        }
        switch (this.number) {
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                return this.number + '';
        }
    };
    CardModule.prototype.render = function () {
        var _this = this;
        return React.createElement("div", {className: this.writeClass(), onMouseDown: function () { return _this.props.onClick(_this.props.card); }}, this.write());
    };
    return CardModule;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CardModule;
//# sourceMappingURL=card-module.js.map