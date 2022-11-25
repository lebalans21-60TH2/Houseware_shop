import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Payment extends Component {
  render() {
    const onSuccess = payment => {
      console.log(JSON.stringify(payment));
      this.props.onSuccess(payment);

      // {
      //     "paid": true,
      //     "cancelled": false,
      //     "payerID": "3GFGQ6GNJ4PWA",
      //     "paymentID": "PAY-0UB74233TB278434KLMYYMVY",
      //     "paymentToken": "EC-2J270753AK460261B",
      //     "returnUrl": "https://www.sandbox.paypal.com/?paymentId=PAY-0UB74233TB278434KLMYYMVY&token=EC-2J270753AK460261B&PayerID=3GFGQ6GNJ4PWA",
      //     "address": {
      //         "recipient_name": "test buyer",
      //         "line1": "1 Main St",
      //         "city": "San Jose",
      //         "state": "CA",
      //         "postal_code": "95131",
      //         "country_code": "US"
      //     },
      //     "email": "fernando.lobo.prez-buyer@gmail.com"
      // }
    };

    const onCancel = data => {
      console.log(JSON.stringify(data));
    };

    const onError = err => {
      console.log(JSON.stringify(err));
    };

    let env = "sandbox";
    let currency = "vnd";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "AQ-BiXEDsQ7IknXkqxJMVfxR5x2pAW-2cBPhr1nV-6hbLz2FKKF9hRNPHEjsyqDQ-6T2bPVcPOSV18g8",
      production: "EOUb5fQ-zpd3s-9T1Nr98HAXCJ-2cpkbuzfQ5OqOhIXbAsM_ntoiZ8Dmu1iM1vKQcJyazX1HxJM8JAF7"
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}

export default Payment;
