import React, { useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const SimpleCardForm = ({handlePayment}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(null)


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message)
      setPaymentSuccess(null)
    } else {
      setPaymentSuccess(paymentMethod.id)
      setPaymentError(null)
      handlePayment(paymentMethod.id)
    }
  };

  return (
    <div style={{border: '5px solid orange', borderRadius:'50px', textAlign: 'center', margin:'10px', padding: '10px', boxShadow:'5px 5px 5px 5px gray'}}>
      <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
      <br/>
      <CardElement />
      <br/>
      <button className="btn btn-success" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    <br/>
    {
    paymentError && <p style={{textAlign: 'center', color: 'red', fontSize:'20px'}}> <b>{paymentError}</b>  </p> 
    }
    {
    paymentSuccess && <p style={{textAlign: 'center', color: 'green', fontSize:'20px'}}> <b> Your Payment Successfully Done</b>  </p> 
    }
    </div>
  );
};

export default SimpleCardForm;