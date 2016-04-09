"use strict";
/// <reference path="./src/typings/tsd.d.ts" />
var assert = require('power-assert');
var _ = require('lodash');
var card_engine_1 = require('./src/models/card-engine');
var player_1 = require('./src/models/player');
var constants_1 = require('./src/constants/constants');
var players = [new player_1.default('a'), new player_1.default('b')];
var suits = [constants_1.Suit.Spade, constants_1.Suit.Dia];
function setup() {
    var engine = new card_engine_1.default(10, suits, players);
    var card1 = _.sample(engine.cards);
    var card2 = _.find(engine.cards, function (card) { return card !== card1 && card.number === card1.number; });
    var card3 = _.find(engine.cards, function (card) { return card !== card1 && card.number !== card1.number; });
    var playerNow = engine.playerNow;
    return { engine: engine, playerNow: playerNow, card1: card1, card2: card2, card3: card3 };
}
describe('CardEngine', function () {
    describe('作成', function () {
        it('枚数', function () {
            var engine = setup().engine;
            assert.equal(engine.total, 20);
        });
        it('カード', function () {
            var engine = setup().engine;
            assert.equal(engine.cards.length, 20);
        });
        it('取得データ', function () {
            var engine = setup().engine;
            assert.deepEqual(_.keys(engine.gets), ['a', 'b']);
        });
    });
    describe('プレイヤー循環', function () {
        it('循環', function () {
            var engine = setup().engine;
            assert.equal(engine.playerNow, players[0]);
            engine.turnNext();
            assert.equal(engine.playerNow, players[1]);
            engine.turnNext();
            assert.equal(engine.playerNow, players[0]);
            engine.turnNext();
            assert.equal(engine.playerNow, players[1]);
        });
    });
    describe('カードをめくる', function () {
        describe('プレイヤーチェンジ', function () {
            it('あっていたら再び同じプレイヤー', function () {
                var _a = setup(), engine = _a.engine, playerNow = _a.playerNow, card1 = _a.card1, card2 = _a.card2;
                var result = engine.choose()(card1)(card2);
                assert.equal(result, playerNow);
            });
            it('間違ってたら次のプレイヤー', function () {
                var _a = setup(), engine = _a.engine, playerNow = _a.playerNow, card1 = _a.card1, card3 = _a.card3;
                var result = engine.choose()(card1)(card3);
                assert.notEqual(result, playerNow);
            });
        });
        describe('取得枚数加算', function () {
            it('あっていたら増える', function () {
                var _a = setup(), engine = _a.engine, playerNow = _a.playerNow, card1 = _a.card1, card2 = _a.card2;
                engine.choose()(card1)(card2);
                assert.equal(engine.gets[playerNow.name].length, 2);
            });
            it('間違ってたら編かなし', function () {
                var _a = setup(), engine = _a.engine, playerNow = _a.playerNow, card1 = _a.card1, card3 = _a.card3;
                engine.choose()(card1)(card3);
                assert.equal(engine.gets[playerNow.name].length, 0);
            });
        });
        describe('残りの枚数', function () {
            it('あっていたら減る', function () {
                var _a = setup(), engine = _a.engine, playerNow = _a.playerNow, card1 = _a.card1, card2 = _a.card2;
                engine.choose()(card1)(card2);
                assert.equal(engine.rest, 18);
            });
            it('間違ってたら編かなし', function () {
                var _a = setup(), engine = _a.engine, playerNow = _a.playerNow, card1 = _a.card1, card3 = _a.card3;
                engine.choose()(card1)(card3);
                assert.equal(engine.rest, 20);
            });
        });
    });
});
//# sourceMappingURL=card-engine-test.js.map