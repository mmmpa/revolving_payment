"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var constants_1 = require("../constants/constants");
var player_1 = require("../models/player");
var GameSelectorContext = (function (_super) {
    __extends(GameSelectorContext, _super);
    function GameSelectorContext() {
        _super.apply(this, arguments);
    }
    GameSelectorContext.prototype.initialState = function () {
        return {
            players: ['あなた', 'ふつうのCPU', 'つよいCPU']
        };
    };
    GameSelectorContext.prototype.activate = function () {
        this.dispatch('message:right', 'ゲームを選択してください');
    };
    GameSelectorContext.prototype.generatePlayer = function (name) {
        switch (true) {
            case name.indexOf('CPU') !== -1:
                return new player_1.default(name, true);
            default:
                return new player_1.default(name);
        }
    };
    GameSelectorContext.prototype.recipe = function (firstName, secondName) {
        var eachSuitNumber = 13;
        var suits = [constants_1.Suit.Spade, constants_1.Suit.Dia, constants_1.Suit.Club, constants_1.Suit.Heart];
        var first = this.generatePlayer(firstName);
        var second = this.generatePlayer(secondName);
        if (firstName === secondName) {
            second.name += '2';
        }
        return { eachSuitNumber: eachSuitNumber, suits: suits, players: [first, second] };
    };
    GameSelectorContext.prototype.listen = function (to) {
        var _this = this;
        to('select', function (first, second) {
            _this.dispatch('start:game', _this.recipe(first, second));
        });
    };
    return GameSelectorContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameSelectorContext;
//# sourceMappingURL=game-selector-context.js.map