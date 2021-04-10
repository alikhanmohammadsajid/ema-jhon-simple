import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const Productdetail = () => {
    const {productKey} = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('https://desolate-woodland-42661.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])

    console.log(productKey);
    console.log(product);
    document.title = "Productdetail"
    return (
        <div>
            
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default Productdetail;