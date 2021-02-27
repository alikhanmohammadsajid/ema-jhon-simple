import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    // console.log(props);
    const { name, img, seller, price, stock } = props.product
    return (
        <div className='product'>
            <div className='image'>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <br />
                <p>
                    <small>
                        By : {seller}
                    </small>
                </p>
                <p>$ {price}</p>
                <br />
                <p>Only {stock} left in stock order soon</p>

                <button className='main-button'
                onClick={() => props.handleAddProduct(props.product)}
                ><FontAwesomeIcon icon={faShoppingCart} /> Add to card</button>
            </div>
            

        </div>
    );
};

export default Product;