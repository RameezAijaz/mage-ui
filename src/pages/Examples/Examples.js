import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Layout from "../../base_template/Layout/Layout";
import {NavLink} from "react-router-dom";

class Examples extends React.Component {

    render(){
        return(
            <Layout title='Examples'
                    logo='mage_logo_96x96.png'
                    detail='This page contains examples of used libraries.'>
                    <Nav defaultActiveKey="/home" className="flex-column">

                        <NavLink className="nav-link" to="/todoList" exact={true}>React setState TodoList Example</NavLink>
                        <NavLink className="nav-link" to="/shoppingCart" exact={true}>Redux Shopping Cart Example</NavLink>
                    </Nav>

            </Layout>
        )
    }
}

export default Examples;
