"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
function separate(num) {
    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
var Revolver = (function (_super) {
    __extends(Revolver, _super);
    function Revolver() {
        _super.apply(this, arguments);
    }
    Revolver.prototype.componentWillMount = function () {
        this.setState({
            total: 200000,
            payment: 10000,
            rate: 15,
            paymentHistory: [],
            paymentStepper: null,
            isFinished: false,
            once: false,
            auto: false,
            type: 'revolving'
        });
    };
    Object.defineProperty(Revolver.prototype, "body", {
        get: function () {
            return this.refs['body'];
        },
        enumerable: true,
        configurable: true
    });
    Revolver.prototype.componentDidMount = function () {
        this.plan(this.state);
    };
    Revolver.prototype.componentWillUpdate = function (_, state) {
        this.plan(state, this.state);
        if (this.state.isFinished && !this.state.once) {
            this.setState({ once: true });
        }
    };
    Revolver.prototype.plan = function (nextState, oldState) {
        var total = nextState.total, rate = nextState.rate, payment = nextState.payment, type = nextState.type;
        if (oldState && total === oldState.total && rate === oldState.rate && payment === oldState.payment && type === oldState.type) {
            return;
        }
        var paymentStepper = new RevolvingPayment(total, rate, payment).generateStepper();
        var paymentHistory = [new Payment(0, 0, 0, 0, total)];
        this.setState({ paymentStepper: paymentStepper, paymentHistory: paymentHistory, isFinished: false });
    };
    Revolver.prototype.step = function () {
        var _this = this;
        if (this.state.auto && !this.sid) {
            this.sid = setInterval(function () { return _this.step(); }, 10);
        }
        if (this.sid && this.state.isFinished) {
            clearInterval(this.sid);
            this.sid = null;
            return;
        }
        var height = this.body.clientHeight;
        var y = window.pageYOffset;
        var _a = this.state, paymentStepper = _a.paymentStepper, paymentHistory = _a.paymentHistory;
        var paymentResult = paymentStepper.step();
        var isFinished = paymentStepper.isFinished;
        paymentHistory.push(paymentResult);
        this.setState({ paymentStepper: paymentStepper, paymentHistory: paymentHistory, isFinished: isFinished }, function () { return !isFinished && window.scrollTo(null, y + (_this.body.clientHeight - height)); });
    };
    Revolver.prototype.writeButton = function () {
        var _this = this;
        if (this.state.isFinished) {
            return null;
        }
        else {
            return React.createElement("div", {className: "computation"}, React.createElement("button", {className: "button blue big", onClick: function () { return _this.step(); }}, "返済する"), this.writeAuto());
        }
    };
    Revolver.prototype.writeAuto = function () {
        var _this = this;
        if (!this.state.once) {
        }
        return React.createElement("label", null, React.createElement("input", {type: "checkbox", checked: this.state.auto, onChange: function () { return _this.setState({ auto: !_this.state.auto }); }}), "自動的に最後まで返済する");
    };
    Revolver.prototype.writeResult = function () {
        if (!this.state.isFinished) {
            return null;
        }
        var totalPayment = 0;
        var totalInterest = 0;
        this.state.paymentHistory.forEach(function (_a) {
            var payment = _a.payment, interest = _a.interest;
            totalPayment += payment;
            totalInterest += interest;
        });
        return React.createElement("section", {className: "result"}, React.createElement("section", {className: "total-payment"}, React.createElement("h1", null, "総お支払い額"), React.createElement("p", null, React.createElement("em", null, separate(totalPayment)), "円")), React.createElement("section", {className: "total-payment"}, React.createElement("h1", null, "支払った利子"), React.createElement("p", null, React.createElement("em", null, separate(totalInterest)), "円")), React.createElement("p", {className: "comment"}, "イメージ通りの手数料、利子になりましたか？"));
    };
    Revolver.prototype.render = function () {
        var _this = this;
        var _a = this.state, paymentHistory = _a.paymentHistory, isFinished = _a.isFinished, total = _a.total, payment = _a.payment, rate = _a.rate;
        var _b = this.props, totalList = _b.totalList, rateList = _b.rateList, paymentList = _b.paymentList;
        return React.createElement("article", {className: "revolvingPayment", ref: "body"}, React.createElement("p", {className: "notice"}, "単純計算なので多少誤差があります（ちょっと安く出ます）"), React.createElement("section", {className: "revolvingPlan"}, React.createElement("h1", null, "借り入れ、返済計画"), React.createElement("div", {className: "plan"}, React.createElement(Selector, React.__spread({}, {
            valueList: totalList,
            suffix: '円',
            value: total,
            onChange: function (v) { return _this.setState({ total: +v }); }
        })), React.createElement("p", {className: "separator"}, "を金利"), React.createElement(Selector, React.__spread({}, {
            valueList: rateList,
            value: rate,
            suffix: '%',
            onChange: function (v) { return _this.setState({ rate: +v }); }
        })), React.createElement("p", {className: "separator"}, "で借りて"), React.createElement(Selector, React.__spread({}, {
            valueList: paymentList,
            value: payment,
            suffix: '円',
            onChange: function (v) { return _this.setState({ payment: +v }); }
        })), React.createElement("p", {className: "separator"}, "ずつ返す")), React.createElement("div", {className: "type"}, React.createElement("label", {onClick: function () { return _this.setState({ type: 'revolving' }); }}, " ", React.createElement("input", {type: "radio", checked: this.state.type === 'revolving'}), React.createElement("strong", null, "リボ払い"), React.createElement("p", null, "返済額+手数料=お支払い額"), React.createElement("p", null, "月々の支払額が変動する。")), " ", React.createElement("label", {onClick: function () { return _this.setState({ type: 'loan' }); }}, React.createElement("input", {type: "radio", checked: this.state.type === 'loan'}), React.createElement("strong", null, "消費者金融"), React.createElement("p", null, "お支払い額から手数料が引かれ、残りが返済になる"), React.createElement("p", null, "月々の支払額が変動しない。")))), React.createElement("section", {className: "revolvingResult"}, React.createElement("h1", null, "返済履歴"), React.createElement(PaymentTable, React.__spread({}, { paymentHistory: paymentHistory }))), this.writeButton(), " ", this.writeResult());
    };
    return Revolver;
}(React.Component));
var Selector = (function (_super) {
    __extends(Selector, _super);
    function Selector() {
        _super.apply(this, arguments);
    }
    Selector.prototype.render = function () {
        var _a = this.props, valueList = _a.valueList, suffix = _a.suffix, onChange = _a.onChange, value = _a.value;
        return React.createElement("select", React.__spread({}, { value: value }, {onChange: function (e) { return onChange(e.target.value); }}), valueList.map(function (value) { return React.createElement("option", React.__spread({key: value}, { value: value }), separate(value) + (suffix || '')); }));
    };
    return Selector;
}(React.Component));
var PaymentTable = (function (_super) {
    __extends(PaymentTable, _super);
    function PaymentTable() {
        _super.apply(this, arguments);
    }
    PaymentTable.prototype.render = function () {
        var paymentHistory = this.props.paymentHistory;
        return React.createElement("table", {className: "historyTable"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "回"), React.createElement("th", null, "残り"), React.createElement("th", null, "お支払い"), React.createElement("th", null, "返済分"), React.createElement("th", null, "手数料"))), React.createElement("tbody", null, paymentHistory.map(function (payment) { return React.createElement(PaymentRow, React.__spread({key: payment.count}, { payment: payment })); })));
    };
    return PaymentTable;
}(React.Component));
var PaymentRow = (function (_super) {
    __extends(PaymentRow, _super);
    function PaymentRow() {
        _super.apply(this, arguments);
    }
    PaymentRow.prototype.render = function () {
        var _a = this.props.payment, count = _a.count, payment = _a.payment, repayment = _a.repayment, interest = _a.interest, rest = _a.rest, finish = _a.finish;
        return React.createElement("tr", {className: finish && 'finish'}, React.createElement("th", null, count + "\u56DE\u76EE"), React.createElement("td", null, React.createElement("em", null, separate(rest)), "円"), React.createElement("td", null, React.createElement("em", null, separate(payment)), "円"), React.createElement("td", {className: "repayment"}, React.createElement("em", null, separate(repayment)), "円"), React.createElement("td", {className: "interest"}, React.createElement("em", null, separate(interest)), "円"));
    };
    return PaymentRow;
}(React.Component));
var RevolvingPayment = (function () {
    function RevolvingPayment(total, rate, payment, revolving) {
        if (revolving === void 0) { revolving = true; }
        this.total = total;
        this.rate = rate;
        this.payment = payment;
        this.revolving = revolving;
        this.rate /= 100;
    }
    RevolvingPayment.prototype.getInterest = function (rest) {
        return Math.round(rest * this.rate / 365 * 30);
    };
    RevolvingPayment.prototype.generateStepper = function () {
        return new RevolvingStepper(this, this.revolving);
    };
    return RevolvingPayment;
}());
var RevolvingStepper = (function () {
    function RevolvingStepper(configuration, revolving) {
        this.configuration = configuration;
        this.revolving = revolving;
        this.count = 0;
        this.payment = configuration.payment;
        this.rest = configuration.total;
    }
    Object.defineProperty(RevolvingStepper.prototype, "isFinished", {
        get: function () {
            return this.rest <= 0;
        },
        enumerable: true,
        configurable: true
    });
    RevolvingStepper.prototype.getInterest = function (rest) {
        return this.configuration.getInterest(rest);
    };
    RevolvingStepper.prototype.step = function () {
        var interest = this.getInterest(this.rest - this.payment * 0.5);
        if (this.revolving) {
            this.rest -= this.payment;
            this.count += 1;
            return new Payment(this.count, this.payment + interest, this.payment, interest, this.rest, this.rest <= 0);
        }
        else {
            var repayment = this.payment - interest;
            this.rest -= repayment;
            this.count += 1;
            return new Payment(this.count, this.payment, repayment, interest, this.rest, this.rest <= 0);
        }
    };
    return RevolvingStepper;
}());
var Payment = (function () {
    function Payment(count, payment, repayment, interest, rest, finish) {
        if (finish === void 0) { finish = false; }
        this.count = count;
        this.payment = payment;
        this.repayment = repayment;
        this.interest = interest;
        this.rest = rest;
        this.finish = finish;
        if (this.rest < 0) {
            this.payment += this.rest;
            this.repayment += this.rest;
            this.rest = 0;
        }
    }
    return Payment;
}());
var Starter = (function () {
    function Starter() {
    }
    Starter.run = function (dom) {
        ReactDOM.render(React.createElement(Revolver, React.__spread({}, {
            totalList: [100000, 200000, 300000, 400000, 500000],
            rateList: [12, 15, 17.8],
            paymentList: [5000, 10000, 15000, 20000, 50000, 100000]
        })), dom);
    };
    return Starter;
}());
window.Starter = Starter;
//# sourceMappingURL=index.js.map