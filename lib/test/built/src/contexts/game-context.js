"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var card_engine_1 = require("../models/card-engine");
var card_engine_2 = require("../models/card-engine");
var cpu_1 = require("../models/cpu");
var Turn;
(function (Turn) {
    Turn[Turn["Player"] = 0] = "Player";
    Turn[Turn["Cpu"] = 1] = "Cpu";
    Turn[Turn["Holding"] = 2] = "Holding";
})(Turn || (Turn = {}));
var GameContext = (function (_super) {
    __extends(GameContext, _super);
    function GameContext() {
        _super.apply(this, arguments);
        this.timerStore = [];
    }
    GameContext.prototype.initialState = function (props) {
        return this.initialGameState;
    };
    GameContext.prototype.retry = function () {
        this.setState(this.initialGameState);
    };
    Object.defineProperty(GameContext.prototype, "initialGameState", {
        get: function () {
            var _a = this.props.recipe, eachSuitNumber = _a.eachSuitNumber, suits = _a.suits, players = _a.players;
            var engine = new card_engine_1.default(eachSuitNumber, suits, players);
            var stepper = engine.start();
            var cpus = _.reduce(players, function (a, player) {
                if (player.isCpu) {
                    a[player.name] = cpu_1.default.detect(player.name, engine);
                }
                return a;
            }, {});
            return {
                cpus: cpus,
                stepper: stepper,
                player: engine.playerNow,
                state: stepper.state,
                cards: engine.cards,
                turn: stepper.player.isCpu ? Turn.Cpu : Turn.Player
            };
        },
        enumerable: true,
        configurable: true
    });
    GameContext.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.runCpu(this.state);
        this.sendMessage(this.state);
    };
    GameContext.prototype.componentWillUpdate = function (_, state) {
        this.runCpu(state, this.state);
        this.sendMessage(state, this.state);
    };
    GameContext.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.timerStore.forEach(function (id) { return clearTimeout(id); });
    };
    GameContext.prototype.sendMessage = function (nextState, state) {
        if (!state || nextState.stepper.player !== state.stepper.player) {
            this.dispatch('message:right', nextState.stepper.player.name + "\u306E\u30BF\u30FC\u30F3\u3067\u3059");
        }
    };
    GameContext.prototype.runCpu = function (nextState, state) {
        var _this = this;
        if ((!state && nextState.turn === Turn.Cpu)
            || state && state.state !== nextState.state
                && nextState.state === card_engine_2.CardState.ChooseOne
                && nextState.turn === Turn.Cpu) {
            setTimeout(function () {
                nextState.cpus[nextState.player.name].run(_this.timerStore, function (card) { return _this.choose(card); });
            }, 1);
        }
    };
    GameContext.prototype.choose = function (card) {
        var _this = this;
        var stepper = this.state.stepper.step(card);
        var state = stepper.state;
        switch (state) {
            case card_engine_2.CardState.ChooseOne:
            case card_engine_2.CardState.OneMore:
                this.setState({ state: state, stepper: stepper });
                return;
            case card_engine_2.CardState.Result:
                stepper = stepper.step();
                state = stepper.state;
                this.setState({ state: state, stepper: stepper });
                return;
            case card_engine_2.CardState.Miss:
                var turn = Turn.Holding;
                this.setState({ state: state, turn: turn });
                setTimeout(function () {
                    stepper = stepper.step();
                    state = stepper.state;
                    var player = stepper.player;
                    var turn = player.isCpu ? Turn.Cpu : Turn.Player;
                    _this.setState({ state: state, stepper: stepper, player: player, turn: turn });
                }, 1000);
                return;
            case card_engine_2.CardState.Finish:
                var turn = Turn.Holding;
                var result = stepper.result;
                this.setState({ state: state, turn: turn, result: result });
                return;
        }
    };
    GameContext.prototype.onChooseCard = function (card) {
        if (this.state.turn === Turn.Player) {
            this.choose(card);
        }
    };
    GameContext.prototype.listen = function (to) {
        var _this = this;
        to('choose:card', function (card) {
            _this.onChooseCard(card);
        });
        to('retry', function () {
            _this.retry();
        });
        to('back', function () {
            _this.dispatch('route:selector');
        });
    };
    return GameContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameContext;
//# sourceMappingURL=game-context.js.map