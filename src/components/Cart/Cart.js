import React from 'react';

const Cart = (props) => {
    const cart = props.cart
    // const total = cart.reduce((total, prd) => total + prd.price,0)
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price
    }

    let shipping = 0
    if (total > 35){
        shipping = 0
    }
    else if (total > 15){
        shipping = 4.99
    }
    else if(total > 0){
        shipping = 12.99
    }
    const tax = Math.round(total / 10)

const grandTotal = Math.round(total + shipping + tax)

    return (
        <div>
            <h2>Order Summary</h2>
            <h3>Item Odered : {cart.length}</h3>
            <p>Product price : {Math.round(total)}</p>
            <p>Shipping Cost : {Math.round(shipping)}</p>
            <p>Tax + Vat : {tax}</p>
            <h1>Total Price : {grandTotal}</h1>
        </div>
    );
};

export default Cart;