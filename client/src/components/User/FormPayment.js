import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";

import * as urlApi from "../../utils/urlApi";

import React, { useState } from "react";

export default function FormPayment(prop) {

 
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const state = prop.state;
  const total = prop.state.total;
  const userData = prop.state.userData;

  console.log(state)
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:7000/payment", {
          amount: total,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
         
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="login-form">
          <fieldset className="FormGroup">
            <div className="FormRow" style={{width:"100%", border:"1px solid #1c1b1bd4", height:"2vmax", padding:"10px", borderBottom:"none"}}>
              <CardNumberElement/>
            </div>
            <div className="FormRow" style={{width:"100%", border:"1px solid #1c1b1bd4", height:"2vmax", padding:"10px", borderBottom:"none"}}>
              <CardCvcElement type="password"/>
            </div>
            <div className="FormRow" style={{width:"100%", border:"1px solid #1c1b1bd4", height:"2vmax", padding:"10px"}}>
              <CardExpiryElement />
            </div>
          </fieldset>
          <button srtle={{borderRadius:"10px"}}>Thanh toán bằng thẻ tín dụng </button>
        </form>
      ) : (
        <div>
          <h2>
           Thanh toán thành công
          </h2>
        </div>
      )}
    </>
  );
}



