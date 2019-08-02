import React from 'react';
import ItemList from './Inventory/Inventory';
import Cart from "./Cart/Cart";
import Layout from "../../base_template/Layout/Layout";

class ShoppingCart extends React.Component {

    render(){
        return(
            <Layout title='Redux Shopping Cart Example'
                    detail='Simple shopping cart implementation using redux to add or remove element from cart.'>
                <ItemList/>
                <hr/>
                <Cart/>
            </Layout>
        )
    }
}

export default ShoppingCart;
