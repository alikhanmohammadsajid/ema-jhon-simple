import React from 'react';

const ReviewItem = (props) => {


    const {img, name, quantity, key, price } = props.product
    const reviewItemStyle = {
        borderBottom: "1px solid black",
        marginBottom: "5px",
        marginLeft: "200px",
        paddingBottom: "5px"
    }

    return (
        <div style={{
            textAlign: 'center',
            margin: '5px',
            marginTop:'6px',
             padding: '5px',
            border: '3px solid cyan',
            borderRadius:'50px', 
            boxShadow: '5px 5px 5px cyan'
        }} className="review-item">
            <img src={img} alt=""/>
            <h4 className="product-name">{name}</h4>
            <p>Quantity : {quantity}</p>
            <p><small>$ {price}</small></p>
            <br />
            <button
                className="main-button"
                onClick={() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;