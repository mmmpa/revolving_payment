"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var parcel_1 = require("../libs/parcel");
var PlainSelect = (function (_super) {
    __extends(PlainSelect, _super);
    function PlainSelect() {
        _super.apply(this, arguments);
    }
    PlainSelect.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, values = _a.values, selected = _a.selected;
        return React.createElement("select", {value: selected, onChange: function (e) { return onChange(e.target.value); }}, values.map(function (value, key) { return React.createElement("option", React.__spread({}, { value: value, key: key }), value); }));
    };
    return PlainSelect;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlainSelect;
//# sourceMappingURL=plain-select.js.map