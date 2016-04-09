"use strict";
/// <reference path="./src/typings/tsd.d.ts" />
var assert = require('power-assert');
var card_1 = require('./src/models/card');
var constants_1 = require('./src/constants/constants');
describe('Card', function () {
    describe('作成', function () {
        it('デフォルト', function () {
            var card = new card_1.default(constants_1.Suit.Spade, 10);
            assert.ok(card);
            assert.ok(!card.isOpened);
        });
    });
});
//# sourceMappingURL=card-test.js.map