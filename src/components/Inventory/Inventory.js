import React from 'react';



const Inventory = () => {
    const product = {}

    const handleAddProduct = () => {
        fetch('https://desolate-woodland-42661.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div className="container">
            <form action="">
                <p><span>NAME: </span><input type="text"/></p>
                <p><span> PRICE: </span><input type="text"/></p>
                <p><span>QUANTITY: </span><input type="text"/></p>
                <p><span>PRODUCT IMAGE </span><input type="file"/></p>
            <button className="btn btn-outline-danger" onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;