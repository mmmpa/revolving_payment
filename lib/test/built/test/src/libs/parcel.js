"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var React = require('react');
var _ = require('lodash');
var Good = (function (_super) {
    __extends(Good, _super);
    function Good() {
        _super.apply(this, arguments);
    }
    Good.prototype.dispatch = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.props.emitter).emit.apply(_a, [event].concat(args));
        var _a;
    };
    return Good;
}(React.Component));
exports.Good = Good;
var Parcel = (function (_super) {
    __extends(Parcel, _super);
    function Parcel(props) {
        _super.call(this, props);
        this.addedOnStore = [];
        this.emitter = props.emitter
            ? props.emitter
            : new events_1.EventEmitter();
        this.state = this.initialState(props);
    }
    Parcel.prototype.componentWillUnmount = function () {
        var _this = this;
        var removed = this.addedOnStore.map(function (_a) {
            var eventName = _a.eventName, callback = _a.callback;
            _this.emitter.removeListener(eventName, callback);
            return eventName;
        });
        //console.log({removed})
    };
    Parcel.prototype.componentDidMount = function () {
        var _this = this;
        this.listen(function (eventName, callback) {
            _this.addedOnStore.push({ eventName: eventName, callback: callback });
            _this.emitter.on(eventName, callback);
        });
    };
    Object.defineProperty(Parcel.prototype, "children", {
        get: function () {
            if (this.routeChildren) {
                return this.routeChildren;
            }
            var children = this.props.children;
            return !!children.map ? children : [children];
        },
        enumerable: true,
        configurable: true
    });
    Parcel.prototype.render = function () {
        var props = _.assign({ emitter: this.emitter }, this.props, this.state);
        delete props.children;
        return React.createElement("div", {className: "context-wrapper"}, this.children.map(function (child, i) { return React.cloneElement(child, _.assign(props, { key: i })); }));
    };
    return Parcel;
}(Good));
exports.Parcel = Parcel;
//# sourceMappingURL=parcel.js.map