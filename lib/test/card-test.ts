/// <reference path="./src/typings/tsd.d.ts" />
const assert = require('power-assert');
import * as _ from 'lodash';

import Card from './src/models/card';
import Player from './src/models/player';
import {Suit} from './src/constants/constants';

describe('Card', ()=> {
  describe('作成', ()=>{
    it('デフォルト', ()=>{
      let card = new Card(Suit.Spade, 10);

      assert.ok(card);
      assert.ok(!card.isOpened);
    });
  });
});
