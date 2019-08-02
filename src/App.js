import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import 'bootstrap/dist/js/bootstrap.min';
import './assets/css/style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import Header from './base_template/Header/Header';
import AppRoutes from "./base_template/AppRoutes/AppRoutes";
import rootReducer from './reducers';
import logger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware(logger));

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
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
