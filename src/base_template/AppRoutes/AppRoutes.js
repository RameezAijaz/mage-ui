import React from 'react';
import Home from '../../pages/Home/Home';
import Examples from '../../pages/Examples/Examples';
import TodoList from '../../pages/TodoList/TodoList';
import ShoppingCart from '../../pages/ShoppingCart/ShoppingCart';
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
    {
        path:"/shoppingCart/",
        component:ShoppingCart
    }
];

export default ()=>routerConfig.map((rc, i)=><Route key={i} path={rc.path} exact component={rc.component}/>);
