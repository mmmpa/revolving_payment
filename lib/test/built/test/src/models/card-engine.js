"use strict";
var _ = require('lodash');
var card_1 = require("./card");
var CardEngine = (function () {
    function CardEngine(eachSuitNumber, suits, players) {
        this.eachSuitNumber = eachSuitNumber;
        this.suits = suits;
        this.players = players;
        this.reset();
    }
    Object.defineProperty(CardEngine.prototype, "playerNow", {
        get: function () {
            return this.players[this.turnNumber];
        },
        enumerable: true,
        configurable: true
    });
    CardEngine.prototype.choose = function () {
        var _this = this;
        return function (card) {
            if (card.isOpened) {
                return null;
            }
            card.open();
            return function (nextCard) {
                if (nextCard.isOpened) {
                    return null;
                }
                nextCard.open();
                if (_this.isSame(card, nextCard)) {
                    _this.getCards(_this.playerNow, card, nextCard);
                    return _this.playerNow;
                }
                else {
                    card.close();
                    nextCard.close();
                    _this.turnNext();
                    return _this.playerNow;
                }
            };
        };
    };
    CardEngine.prototype.getCards = function (player, card, nextCard) {
        this.rest -= 2;
        this.gets[player.name].push(card, nextCard);
    };
    CardEngine.prototype.generateGets = function (players) {
        var gets = {};
        players.forEach(function (player) {
            gets[player.name] = [];
        });
        return gets;
    };
    CardEngine.prototype.generateCards = function (eachSuitNumber, suits) {
        var cards = [];
        suits.forEach(function (suit) {
            _.times(eachSuitNumber, function (n) {
                cards.push(new card_1.default(suit, n));
            });
        });
        return _.shuffle(cards);
    };
    CardEngine.prototype.isSame = function (card, nextCard) {
        return card.number === nextCard.number;
    };
    CardEngine.prototype.reset = function () {
        var _a = this, eachSuitNumber = _a.eachSuitNumber, suits = _a.suits, players = _a.players;
        this.cards = this.generateCards(eachSuitNumber, suits);
        this.total = this.rest = this.cards.length;
        this.gets = this.generateGets(players);
        this.turnNumber = 0;
    };
    CardEngine.prototype.turnNext = function () {
        this.turnNumber++;
        if (this.turnNumber === this.players.length) {
            this.turnNumber = 0;
        }
    };
    return CardEngine;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CardEngine;
//# sourceMappingURL=card-engine.js.map