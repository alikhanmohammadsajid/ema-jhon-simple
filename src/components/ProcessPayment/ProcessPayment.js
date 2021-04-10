import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SpiltCardForm';

const stripePromise = loadStripe('pk_test_51Ie67tDic5DA71lEquTkBcjLxRXhK6KYrLkZbMQZc0OJxYeqPUjypsfINxQXMucaau0biuMO5D1x7txKw8n4hVRu00OMp5XpXx');


const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;