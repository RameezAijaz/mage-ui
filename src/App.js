import 'bootstrap/dist/js/bootstrap.min';
import './assets/css/style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import Header from './base_template/Header';
import Jumbotron from './common/Jumbotron';
import AppRoutes from "./base_template/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
    render(){
        return(
            <Router>
                <Header/>
                <main role="main">

                    <AppRoutes/>

                </main>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
