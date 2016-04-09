"use strict";
var _ = require('lodash');
var card_1 = require("./card");
(function (CardState) {
    CardState[CardState["ChooseOne"] = 0] = "ChooseOne";
    CardState[CardState["OneMore"] = 1] = "OneMore";
    CardState[CardState["Result"] = 2] = "Result";
    CardState[CardState["Miss"] = 3] = "Miss";
    CardState[CardState["Finish"] = 4] = "Finish";
})(exports.CardState || (exports.CardState = {}));
var CardState = exports.CardState;
var ResultData = (function () {
    function ResultData(time, count, total) {
        this.time = time;
        this.count = count;
        this.total = total;
    }
    return ResultData;
}());
exports.ResultData = ResultData;
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
    CardEngine.prototype.start = function () {
        return CardStepper.start(this);
    };
    CardEngine.prototype.getCards = function (card, nextCard) {
        this.rest -= 2;
        this.gets[this.playerNow.name] += 2;
    };
    CardEngine.prototype.generateGets = function (players) {
        var gets = {};
        players.forEach(function (player) {
            gets[player.name] = 0;
        });
        return gets;
    };
    CardEngine.prototype.generateCards = function (eachSuitNumber, suits) {
        var cards = [];
        suits.forEach(function (suit) {
            _.times(eachSuitNumber, function (n) {
                cards.push(new card_1.default(suit, n + 1));
            });
        });
        return _.shuffle(cards);
    };
    CardEngine.prototype.isSame = function (card, nextCard) {
        return card.number === nextCard.number;
    };
    Object.defineProperty(CardEngine.prototype, "isOver", {
        get: function () {
            return this.rest === 0;
        },
        enumerable: true,
        configurable: true
    });
    CardEngine.prototype.reset = function () {
        var _a = this, eachSuitNumber = _a.eachSuitNumber, suits = _a.suits, players = _a.players;
        this.cards = this.generateCards(eachSuitNumber, suits);
        this.total = this.rest = this.cards.length;
        this.gets = this.generateGets(players);
        this.turnNumber = 0;
        this.history = [];
    };
    CardEngine.prototype.turnNext = function () {
        this.turnNumber++;
        if (this.turnNumber === this.players.length) {
            this.turnNumber = 0;
        }
    };
    CardEngine.prototype.open = function (card) {
        if (card.isOpened) {
            return false;
        }
        card.open();
        _.remove(this.history, card);
        this.history.push(card);
        return true;
    };
    CardEngine.prototype.close = function (card) {
        card.close();
    };
    return CardEngine;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CardEngine;
var CardStepper = (function () {
    function CardStepper(params) {
        var _this = this;
        _.each(params, function (v, k) {
            _this[k] = v;
        });
    }
    CardStepper.prototype.clone = function (params) {
        var _a = this, firstCard = _a.firstCard, secondCard = _a.secondCard, engine = _a.engine, state = _a.state, player = _a.player;
        return new CardStepper(_.assign({ firstCard: firstCard, secondCard: secondCard, engine: engine, state: state, player: player }, params));
    };
    CardStepper.start = function (engine) {
        return new CardStepper({
            state: CardState.ChooseOne,
            engine: engine,
            player: engine.playerNow
        });
    };
    CardStepper.prototype.step0 = function () {
        return this.clone({
            state: CardState.ChooseOne,
        });
    };
    CardStepper.prototype.step = function (card) {
        switch (this.state) {
            case CardState.ChooseOne:
                return this.step1(card);
            case CardState.OneMore:
                return this.step2(card);
            case CardState.Result:
                return this.step0();
            case CardState.Miss:
                return this.reset();
            default:
                return this.step0();
        }
    };
    CardStepper.prototype.step1 = function (card) {
        if (!this.engine.open(card)) {
            return this;
        }
        this.firstCard = card;
        return this.clone({
            state: CardState.OneMore,
        });
    };
    CardStepper.prototype.step2 = function (card) {
        if (!this.engine.open(card)) {
            return this;
        }
        this.secondCard = card;
        if (this.engine.isSame(this.firstCard, this.secondCard)) {
            this.engine.getCards(this.firstCard, this.secondCard);
            if (this.engine.isOver) {
                return this.clone({
                    state: CardState.Finish,
                    player: this.engine.playerNow,
                    result: new ResultData(0, this.engine.gets, this.engine.total)
                });
            }
            return this.clone({
                state: CardState.Result,
                got: true
            });
        }
        else {
            return this.clone({
                state: CardState.Miss,
                got: false
            });
        }
    };
    CardStepper.prototype.reset = function () {
        this.firstCard.close();
        this.secondCard.close();
        this.engine.turnNext();
        return this.clone({
            state: CardState.Result,
            player: this.engine.playerNow
        }).step();
    };
    return CardStepper;
}());
exports.CardStepper = CardStepper;
//# sourceMappingURL=card-engine.js.map