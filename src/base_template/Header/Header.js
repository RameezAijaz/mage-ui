import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";


class Header extends React.Component {
    render(){
        return(
            <Navbar expand="md" className="bg-header">
                <Navbar.Brand href="/" className="text-white">Mage UI</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" to="/" activeClassName="active" exact>Home</NavLink>
                        <NavLink className="nav-link" to="/examples" activeClassName="active" exact>Examples</NavLink>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

export default Header;
