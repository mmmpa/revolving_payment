"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var main_context_1 = require("./contexts/main-context");
var game_context_1 = require("./contexts/game-context");
var game_selector_context_1 = require("./contexts/game-selector-context");
var header_component_1 = require("./components/header-component");
var footer_component_1 = require("./components/footer-component");
var game_component_1 = require("./components/game-component");
var game_selector_component_1 = require("./components/game-selector-component");
var constants_1 = require('./constants/constants');
var Starter = (function () {
    function Starter() {
    }
    Starter.run = function (dom) {
        ReactDOM.render(React.createElement("article", {className: "game-body"}, React.createElement(main_context_1.default, null, React.createElement(header_component_1.default, null), React.createElement(game_selector_context_1.default, {route: constants_1.Route.Selector}, React.createElement(game_selector_component_1.default, null)), React.createElement(game_context_1.default, {route: constants_1.Route.Game}, React.createElement(game_component_1.default, null)), React.createElement(footer_component_1.default, null))), dom);
    };
    return Starter;
}());
window.Starter = Starter;
//# sourceMappingURL=index.js.map