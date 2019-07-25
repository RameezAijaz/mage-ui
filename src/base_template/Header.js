import React from 'react';
import { Link, NavLink } from "react-router-dom";


class Header extends React.Component {
    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-header">
                <a className="navbar-brand" href="#">Mage UI</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" activeClassName="active" exact={true}>Home</NavLink>
                        </li>
                        <li className="nav-item">

                            <NavLink className="nav-link" to="/about" activeClassName="active" exact={true}>About</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }

}

export default Header;
