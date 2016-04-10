import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface RevolverP {
  totalList:number[],
  rateList:number[],
  paymentList:number[]
}

interface RevolverS {
  total:number,
  payment:number,
  rate:number,
  paymentHistory:Payment[],
  paymentStepper:RevolvingStepper,
  isFinished:boolean
}

function separate(num) {
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

class Revolver extends React.Component<RevolverP, RevolverS> {
  private sid:number;

  componentWillMount() {
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
  }

  get body() {
    return this.refs['body']
  }

  componentDidMount() {
    this.plan(this.state);
  }

  componentWillUpdate(_, state) {
    this.plan(state, this.state);
    if (this.state.isFinished && !this.state.once) {
      this.setState({once: true})
    }
  }

  plan(nextState, oldState?) {
    let {total, rate, payment, type} = nextState;
    if (oldState && total === oldState.total && rate === oldState.rate && payment === oldState.payment && type === oldState.type) {
      return;
    }

    let paymentStepper = new RevolvingPayment(total, rate, payment, type === 'revolving').generateStepper();
    let paymentHistory = [new Payment(0, 0, 0, 0, total)];
    this.setState({paymentStepper, paymentHistory, isFinished: false});
  }

  step() {
    if (this.state.auto && !this.sid) {
      this.sid = setInterval(()=> this.step(), 10)
    }

    if (this.sid && this.state.isFinished) {
      clearInterval(this.sid);
      this.sid = null;
      return;
    }

    let height = this.body.clientHeight;
    var y = window.pageYOffset;

    let {paymentStepper, paymentHistory} = this.state;
    let paymentResult = paymentStepper.step();
    let {isFinished} = paymentStepper;
    paymentHistory.push(paymentResult);
    this.setState({paymentStepper, paymentHistory, isFinished}, ()=> !isFinished && window.scrollTo(null, y + (this.body.clientHeight - height)));
  }

  writeButton() {
    if (this.state.isFinished) {
      return null
    } else {
      return <div className="computation">
        <button className="button blue big" onClick={()=> this.step()}>返済する</button>
        {this.writeAuto()}
      </div>
    }
  }

  writeAuto() {
    if (!this.state.once) {
      //return null;
    }
    return <label><input type="checkbox" checked={this.state.auto} onChange={()=> this.setState({auto: !this.state.auto})}/>自動的に最後まで返済する</label>
  }

  writeResult() {
    if (!this.state.isFinished) {
      return null;
    }

    let totalPayment = 0;
    let totalInterest = 0;

    this.state.paymentHistory.forEach(({payment, interest})=> {
      totalPayment += payment;
      totalInterest += interest;
    });

    return <section className="result">
      <section className="total-payment">
        <h1>総お支払い額</h1>
        <p><em>{separate(totalPayment)}</em>円</p>
      </section>
      <section className="total-payment">
        <h1>支払った利子</h1>
        <p><em>{separate(totalInterest)}</em>円</p>
      </section>
      <p className="comment">イメージ通りの手数料、利子になりましたか？</p>
    </section>
  }

  render() {
    let {paymentHistory, isFinished, total, payment, rate} = this.state;
    let {totalList, rateList, paymentList} = this.props;

    return <article className="revolvingPayment" ref="body">
      <p className="notice">単純計算なので多少誤差があります（ちょっと安く出ます）</p>
      <section className="revolvingPlan">
        <h1>借り入れ、返済計画</h1>
        <div className="plan">
          <Selector {...{
            valueList: totalList,
            suffix: '円',
            value: total,
            onChange: (v)=> this.setState({total: +v})
          }}/>
          <p className="separator">を金利</p>
          <Selector {...{
            valueList: rateList,
            value: rate,
            suffix: '%',
            onChange: (v)=> this.setState({rate: +v})
          }}/>
          <p className="separator">で借りて</p>
          <Selector {...{
            valueList: paymentList,
            value: payment,
            suffix: '円',
            onChange: (v)=> this.setState({payment: +v})
          }}/>
          <p className="separator">ずつ返す</p>
        </div>
        <div className="type">
          <label onClick={()=> this.setState({type: 'revolving'})}> <input type="radio" checked={this.state.type === 'revolving'}/><strong>リボ払い</strong><p>返済額+手数料=お支払い額</p><p>月々の支払額が変動する。</p></label> <label onClick={()=> this.setState({type: 'loan'})}><input
          type="radio" checked={this.state.type === 'loan'}/><strong>消費者金融</strong><p>お支払い額から手数料が引かれ、残りが返済になる</p><p>月々の支払額が変動しない。</p></label>
        </div>
      </section>
      <section className="revolvingResult">
        <h1>返済履歴</h1>
        <PaymentTable {...{paymentHistory}}/>
      </section>
      {this.writeButton()} {this.writeResult()}
    </article>
  }
}

class Selector extends React.Component<{},{}> {
  render() {
    let {valueList, suffix, onChange, value} = this.props;

    return <select {...{value}} onChange={(e:Event)=> onChange((e.target as HTMLSelectElement).value)}>
      {valueList.map((value)=> <option key={value}  {...{value}}>{separate(value) + (suffix || '')}</option>)}
    </select>
  }
}

class PaymentTable extends React.Component<{paymentHistory:Payment[]},{}> {
  render() {
    let {paymentHistory} = this.props;
    return <table className="historyTable">
      <thead>
      <tr>
        <th>回</th>
        <th>残り</th>
        <th>お支払い</th>
        <th>返済分</th>
        <th>手数料</th>
      </tr>
      </thead>
      <tbody>
      {paymentHistory.map((payment:Payment)=> <PaymentRow key={payment.count} {...{payment}}/>)}
      </tbody>
    </table>
  }
}

class PaymentRow extends React.Component<{payment:Payment},{}> {
  render() {
    let {count, payment, repayment, interest, rest, finish} = this.props.payment;

    return <tr className={finish && 'finish'}>
      <th>{`${count}回目`}</th>
      <td><em>{separate(rest)}</em>円</td>
      <td><em>{separate(payment)}</em>円</td>
      <td className="repayment"><em>{separate(repayment)}</em>円</td>
      <td className="interest"><em>{separate(interest)}</em>円</td>
    </tr>
  }
}

class RevolvingPayment {
  constructor(public total, public rate, public payment, public revolving = true) {
    this.rate /= 100;
  }

  getInterest(rest) {
    return Math.round(rest * this.rate / 365 * 30);
  }

  generateStepper() {
    return new RevolvingStepper(this, this.revolving);
  }
}

class RevolvingStepper {
  count:number;
  payment:number;
  rest:number;

  constructor(public configuration:RevolvingPayment, public revolving:boolean) {
    this.count = 0;
    this.payment = configuration.payment;
    this.rest = configuration.total;
  }

  get isFinished() {
    return this.rest <= 0;
  }

  getInterest(rest) {
    return this.configuration.getInterest(rest);
  }

  step():Payment {
    let interest = this.getInterest(this.rest - this.payment * 0.5);

    if (this.revolving) {
      this.rest -= this.payment;
      this.count += 1;

      return new Payment(this.count, this.payment + interest, this.payment, interest, this.rest, this.rest <= 0)
    } else {
      let repayment = this.payment - interest
      this.rest -= repayment;
      this.count += 1;

      return new Payment(this.count, this.payment, repayment, interest, this.rest, this.rest <= 0)
    }
  }
}

class Payment {
  constructor(public count:number, public payment:number, public repayment:number, public interest:number, public rest:number, public finish:boolean = false) {
    if (this.rest < 0) {
      this.payment += this.rest;
      this.repayment += this.rest;
      this.rest = 0;
    }
  }
}

class Starter {
  static run(dom) {
    ReactDOM.render(
      <Revolver {...{
        totalList: [100000, 200000, 300000, 400000, 500000],
        rateList: [12, 15, 17.8],
        paymentList: [5000, 10000, 15000, 20000, 50000, 100000]
      }}/>
      , dom);
  }
}

window.Starter = Starter;
