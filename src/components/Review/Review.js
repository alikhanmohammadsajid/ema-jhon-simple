import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([])
    const [oderPlaced, setOrderPlaced] = useState(false)

    const history= useHistory()

    const handleProceedCheckout = () =>{
        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)

        fetch('https://desolate-woodland-42661.herokuapp.com/productsByKeys', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

       
    }, [])
let thankYou;
if (oderPlaced) {
    thankYou =  <img src={image} alt=""/>
}
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItem>)
            }
            {thankYou}
            </div>
            <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handleProceedCheckout} className="btn btn-outline-success">Proceed Checkout</button>
            </Cart>
            </div>
        </div>
    );
};

export default Review;