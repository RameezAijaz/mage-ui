import React from 'react';
import Home from '../../pages/Home/Home';
import Examples from '../../pages/Examples/Examples';
import TodoList from '../../pages/TodoList/TodoList';
/* REDUX_SPECIFIC_CODE_START */
import ShoppingCart from '../../pages/ShoppingCart/ShoppingCart';
/* REDUX_SPECIFIC_CODE_END */
import { Route } from "react-router-dom";

const routerConfig=[
    {
        path:"/",
        component:Home,
    },
    {
        path:"/examples/",
        component:Examples

    },
    {
        path:"/todoList/",
        component:TodoList
    },
    /* REDUX_SPECIFIC_CODE_START */
    {
        path:"/shoppingCart/",
        component:ShoppingCart
    }
    /* REDUX_SPECIFIC_CODE_END */
];

export default ()=>routerConfig.map((rc, i)=><Route key={i} path={rc.path} exact component={rc.component}/>);
