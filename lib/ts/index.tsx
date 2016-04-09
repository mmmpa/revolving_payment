import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface RevolverP {

}

interface RevolverS {

}

class Revolver extends React.Component<RevolverP, RevolverS> {
  componentWillMount() {
    this.setState({
      total: 500000,
      payment: 10000,
      rate: 15,
      paymentHistory: []
    });
  }

  compute() {
    let {total, rate, payment} = this.state;
    let paymentHistory = new RevolvingPayment(total, rate, payment).compute();
    this.setState({paymentHistory});
  }

  render() {
    let {paymentHistory} = this.state;
    let {totalList, rateList, paymentList} = this.props;

    return <article className="revolvingPayment">
      <section className="revolvingPlan">
        <div className="plan">
          <Selector {...{
            valueList: totalList,
            suffix: '円',
            onChange: (v)=> this.setState({total: v})
          }}/>
          <p className="separator">を金利</p>
          <Selector {...{
            valueList: rateList,
            suffix: '%',
            onChange: (v)=> this.setState({rate: v})
          }}/>
          <p className="separator">で借りて</p>
          <Selector {...{
            valueList: paymentList,
            suffix: '円',
            onChange: (v)=> this.setState({payment: v})
          }}/>
          <p className="separator">ずつ返す</p>
        </div>
        <div className="computation">
          <button onClick={()=> this.compute()}>計算する</button>
        </div>
      </section>
      <section className="revolvingResult">
        <PaymentTable {...{paymentHistory}}/>
      </section>
    </article>
  }
}

class Selector extends React.Component<{},{}> {
  render() {
    let {valueList, suffix, onChange, value} = this.props;

    return <select {...{value}} onChange={(e:Event)=> onChange((e.target as HTMLSelectElement).value)}>
      {valueList.map((value)=> <option key={value}  {...{value}}>{value + (suffix || '')}</option>)}
    </select>
  }
}

class PaymentTable extends React.Component<{paymentHistory:Payment[]},{}> {
  render() {
    let {paymentHistory} = this.props;
    return <table>
      <thead>
      <tr>
        <th>回</th>
        <td>お支払い</td>
        <td>実際の返済額</td>
        <td>利子</td>
        <td>残り</td>
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
      <td>{`${payment}円`}</td>
      <td>{`${repayment}円/`}</td>
      <td>{`${interest}円`}</td>
      <td>{`${rest}円`}</td>
    </tr>
  }
}

class Payment {
  constructor(public count, public payment, public repayment, public interest, public rest, public finish:boolean = false) {
    if(this.rest < 0){
      this.payment += this.rest;
      this.repayment += this.rest;
      this.rest = 0;
    }
  }
}

class RevolvingPayment {
  constructor(public total, public rate, public payment) {

  }

  getInterest(rest) {
    return rest * this.rate / 365 * 30 >> 0;
  }

  compute():Payment[] {
    let rest = this.total;
    let result = [new Payment(0, 0, 0, interest, rest, rest <= 0)];

    for (let i = 1; rest > 0; i++) {
      let interest = this.getInterest(rest);
      let repayment = this.payment - interest;
      rest -= interest;
      result.push(new Payment(i, this.payment, repayment, interest, rest, rest <= 0));
    }

    return result;
  }
}

class Starter {
  static run(dom) {
    ReactDOM.render(
      <Revolver {...{
        totalList: [100000, 200000, 300000, 400000, 500000, 1000000],
        rateList: [12, 15],
        paymentList: [10000, 20000, 50000, 1000000]
      }}/>
      , dom);
  }
}

window.Starter = Starter;
