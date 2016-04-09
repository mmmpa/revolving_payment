"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var constants_1 = require('../constants/constants');
var player_1 = require("../models/player");
var card_engine_1 = require("../models/card-engine");
var MainContext = (function (_super) {
    __extends(MainContext, _super);
    function MainContext() {
        _super.apply(this, arguments);
    }
    MainContext.prototype.initialState = function () {
        return { route: constants_1.Route.Selector };
    };
    MainContext.prototype.testState = function () {
        return {
            route: constants_1.Route.Game,
            recipe: { eachSuitNumber: 2, suits: [constants_1.Suit.Spade, constants_1.Suit.Dia], players: [new player_1.default()] },
            result: new card_engine_1.ResultData(10, {}, 10)
        };
    };
    MainContext.prototype.listen = function (to) {
        var _this = this;
        to('start:game', function (recipe) {
            _this.setState({ route: constants_1.Route.Game, recipe: recipe });
        });
        to('route:selector', function () {
            _this.setState({ route: constants_1.Route.Selector });
        });
        to('message:right', function (rightMessage) {
            _this.setState({ rightMessage: rightMessage });
        });
        to('message:left', function (leftMessage) {
            _this.setState({ leftMessage: leftMessage });
        });
    };
    MainContext.prototype.route = function (state) {
        this.routeChildren = this.props.children.filter(function (child) {
            return _.isUndefined(child.props.route) || child.props.route == state.route;
        });
    };
    MainContext.prototype.activate = function () {
        this.route(this.state);
    };
    MainContext.prototype.componentWillUpdate = function (props, state) {
        this.route(state);
    };
    return MainContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainContext;
//# sourceMappingURL=main-context.js.map