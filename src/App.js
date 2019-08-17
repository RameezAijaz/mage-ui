import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.min';
import './assets/css/style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import Header from './base_template/Header/Header';
import AppRoutes from "./base_template/AppRoutes/AppRoutes";

/* REDUX_SPECIFIC_CODE_START */
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import { applyMiddleware, createStore, combineReducers } from 'redux';
import shoppingCartReducer from './pages/ShoppingCart/reducers';

const store = createStore(combineReducers({shoppingCartReducer}), applyMiddleware(logger));
/* REDUX_SPECIFIC_CODE_END */


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
    /* REDUX_SPECIFIC_CODE_START */
    <Provider store={store}>
        {/* REDUX_SPECIFIC_CODE_END */}
        <App />
        {/* REDUX_SPECIFIC_CODE_START */}
    </Provider>
    /* REDUX_SPECIFIC_CODE_END */
    ,
    document.getElementById('app')
);
