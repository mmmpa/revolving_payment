"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var React = require("react");
var FooterComponent = (function (_super) {
    __extends(FooterComponent, _super);
    function FooterComponent() {
        _super.apply(this, arguments);
        this.timeoutStore = [];
        this.startClassName = 'game-message';
        this.riseClassName = 'game-message rise';
        this.sweepClassName = 'game-message sweep';
    }
    FooterComponent.prototype.componentWillMount = function () {
        this.setState({
            leftMessage: '',
            rightMessage: '',
            leftMessageDisplayed: '',
            rightMessageDisplayed: ''
        });
    };
    FooterComponent.prototype.componentDidMount = function () {
        this.messageArea = this.refs['message-area'];
    };
    FooterComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState({ rightMessage: props.rightMessage });
    };
    FooterComponent.prototype.componentWillUpdate = function (p, state) {
        if (state.rightMessage !== this.state.rightMessage) {
            this.addMessage(state.rightMessage);
        }
    };
    FooterComponent.prototype.componentWillUnmount = function () {
        this.timeoutStore.forEach(function (id) { return clearTimeout(id); });
    };
    FooterComponent.prototype.setTimeout = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var id = setTimeout.apply(void 0, args);
        this.timeoutStore.push(id);
        return id;
    };
    FooterComponent.prototype.clearTimeOut = function (id) {
        _.remove(this.timeoutStore, id);
        clearTimeout(id);
    };
    FooterComponent.prototype.sweepAndRiseMessage = function (nextMessage) {
        var _this = this;
        this.messageArea.appendChild(nextMessage);
        var riseId = this.setTimeout(function () {
            _this.clearTimeOut(riseId);
            nextMessage.setAttribute('class', _this.riseClassName);
            if (!_this.preMessage) {
                _this.preMessage = nextMessage;
                return;
            }
            var preMessage = _this.preMessage;
            preMessage.setAttribute('class', _this.sweepClassName);
            var sweepId = _this.setTimeout(function () {
                preMessage.parentNode.removeChild(preMessage);
                _this.clearTimeOut(sweepId);
            }, 500);
            _this.preMessage = nextMessage;
        }, 1);
    };
    FooterComponent.prototype.addMessage = function (message) {
        var nextMessage = document.createElement('div');
        nextMessage.innerText = message;
        nextMessage.setAttribute('class', this.startClassName);
        this.sweepAndRiseMessage(nextMessage);
    };
    FooterComponent.prototype.render = function () {
        var _a = this.props, leftMessage = _a.leftMessage, rightMessage = _a.rightMessage;
        return React.createElement("footer", {className: "game-footer"}, React.createElement("div", {className: "left-message"}, leftMessage), React.createElement("div", {className: "right-message", ref: "message-area"}));
    };
    return FooterComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FooterComponent;
//# sourceMappingURL=footer-component.js.map