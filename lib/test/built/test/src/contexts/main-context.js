"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var constants_1 = require('../constants/constants');
var MainContext = (function (_super) {
    __extends(MainContext, _super);
    function MainContext() {
        _super.apply(this, arguments);
    }
    MainContext.prototype.initialState = function () {
        return {
            route: constants_1.Route.Selector
        };
    };
    MainContext.prototype.listen = function (to) {
        var _this = this;
        to('route:game', function () {
            _this.setState({ route: constants_1.Route.Game });
        });
        to('route:selector', function () {
            _this.setState({ route: constants_1.Route.Selector });
        });
    };
    MainContext.prototype.route = function (state) {
        this.routeChildren = this.props.children.filter(function (child) {
            return _.isUndefined(child.props.route) || child.props.route == state.route;
        });
    };
    MainContext.prototype.componentWillMount = function () {
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