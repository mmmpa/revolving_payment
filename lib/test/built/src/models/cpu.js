"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var Cpu = (function () {
    function Cpu() {
    }
    Cpu.detect = function (name, engine) {
        switch (true) {
            case name.indexOf('つよい') !== -1:
                return new StrongCpu(engine);
            default:
                return new RandomCpu(engine);
        }
    };
    return Cpu;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cpu;
var BaseCpu = (function () {
    function BaseCpu(engine) {
        this.engine = engine;
    }
    BaseCpu.prototype.run = function (timerStore, callback) {
        var _this = this;
        this.prepare();
        this.timer(timerStore, function () { return callback(_this.choose(0)); }, function () { return callback(_this.choose(1)); });
    };
    BaseCpu.prototype.timer = function (timerStore) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var step = function (f) {
            if (!f) {
                return;
            }
            var id = setTimeout(function () {
                f();
                step(args.shift());
                _.remove(timerStore, id);
            }, 1000);
            timerStore.push(id);
        };
        step(args.shift());
    };
    return BaseCpu;
}());
var RandomCpu = (function (_super) {
    __extends(RandomCpu, _super);
    function RandomCpu() {
        _super.apply(this, arguments);
    }
    RandomCpu.prototype.prepare = function () {
    };
    RandomCpu.prototype.choose = function (n) {
        var list = _.filter(this.engine.cards, function (card) { return !card.isOpened; });
        var chosen = _.sample(list);
        return chosen;
    };
    return RandomCpu;
}(BaseCpu));
var StrongCpu = (function (_super) {
    __extends(StrongCpu, _super);
    function StrongCpu() {
        _super.apply(this, arguments);
    }
    StrongCpu.prototype.prepare = function () {
        var history = _.filter(this.engine.history, function (card) { return !card.isOpened; });
        var last1 = history.pop();
        if (last1) {
            var first = _.find(history, function (card) { return card.number === last1.number; });
            if (first) {
                this.cards = [first, last1];
                return void (0);
            }
            history.push(last1);
        }
        var last2 = history.pop();
        if (last2) {
            var second = _.find(history, function (card) { return card.number === last2.number; });
            if (second) {
                this.cards = [second, last2];
                return void (0);
            }
            history.push(last2);
        }
        var notOpened = _.filter(this.engine.cards, function (card) { return !card.isOpened; });
        var notYetOpened = _.filter(notOpened, function (card) { return !_.includes(history, card) && card !== last1 && card !== last2; });
        var list = notYetOpened.length === 0 ? notOpened : notYetOpened;
        var chosen = _.sample(list);
        var third = _.find(history, function (card) { return card !== chosen && card.number === chosen.number; });
        if (third) {
            this.cards = [chosen, third];
            return;
        }
        var rest = _.filter(list, function (card) { return card !== chosen; });
        this.cards = [chosen, _.sample(rest)];
        return void (0);
    };
    StrongCpu.prototype.choose = function (n) {
        return this.cards[n];
    };
    StrongCpu.prototype.random = function () {
        var list = _.filter(this.engine.cards, function (card) { return !card.isOpened; });
        return _.sample(list);
    };
    return StrongCpu;
}(BaseCpu));
//# sourceMappingURL=cpu.js.map