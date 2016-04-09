/// <reference path="./src/typings/tsd.d.ts" />
const assert = require('power-assert');
import * as _ from 'lodash';

import Card from './src/models/card';
import CardEngine from './src/models/card-engine';
import Player from './src/models/player';
import {Suit} from './src/constants/constants';

let players = [new Player('a'), new Player('b')];
let suits = [Suit.Spade, Suit.Dia];

function setup() {
  let engine = new CardEngine(10, suits, players);
  let card1 = _.sample(engine.cards);
  let card2 = _.find(engine.cards, (card)=> card !== card1 && card.number === card1.number);
  let card3 = _.find(engine.cards, (card)=> card !== card1 && card.number !== card1.number);
  let playerNow = engine.playerNow

  return {engine, playerNow, card1, card2, card3}
}

describe('CardEngine', ()=> {
  describe('作成', ()=> {
    it('枚数', ()=> {
      let {engine} = setup();
      assert.equal(engine.total, 20)
    });

    it('カード', ()=> {
      let {engine} = setup();
      assert.equal(engine.cards.length, 20)
    });

    it('取得データ', ()=> {
      let {engine} = setup();
      assert.deepEqual(_.keys(engine.gets), ['a', 'b'])
    });
  });

  describe('プレイヤー循環', ()=> {
    it('循環', ()=> {
      let {engine} = setup();

      assert.equal(engine.playerNow, players[0]);
      engine.turnNext();
      assert.equal(engine.playerNow, players[1]);
      engine.turnNext();
      assert.equal(engine.playerNow, players[0]);
      engine.turnNext();
      assert.equal(engine.playerNow, players[1]);
    });
  });

  describe('カードをめくる', ()=> {
    describe('プレイヤーチェンジ', ()=> {
      it('あっていたら再び同じプレイヤー', ()=> {
        let {engine,playerNow, card1, card2} = setup();
        let result = engine.choose()(card1)(card2);

        assert.equal(result, playerNow)
      });

      it('間違ってたら次のプレイヤー', ()=> {
        let {engine, playerNow,card1, card3} = setup();
        let result = engine.choose()(card1)(card3);

        assert.notEqual(result, playerNow)
      });
    });

    describe('取得枚数加算', ()=> {
      it('あっていたら増える', ()=> {
        let {engine, playerNow,card1, card2} = setup();

        engine.choose()(card1)(card2);

        assert.equal(engine.gets[playerNow.name].length, 2)
      });

      it('間違ってたら編かなし', ()=> {
        let {engine, playerNow,card1, card3} = setup();

        engine.choose()(card1)(card3);

        assert.equal(engine.gets[playerNow.name].length, 0)
      });
    });

    describe('残りの枚数', ()=> {
      it('あっていたら減る', ()=> {
        let {engine, playerNow,card1, card2} = setup();

        engine.choose()(card1)(card2);

        assert.equal(engine.rest, 18)
      });

      it('間違ってたら編かなし', ()=> {
        let {engine, playerNow,card1, card3} = setup();

        engine.choose()(card1)(card3);

        assert.equal(engine.rest, 20)
      });
    });
  });
});
