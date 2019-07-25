import React from 'react';
import { Route } from "react-router-dom";
import Home from '../pages/Home';
import About from '../pages/About';

class AppRoutes extends React.Component {
    render(){
        return(
            <>
                <Route path="/" exact component={Home} />
                <Route path="/about/" component={About} />
                <Route path="/examples/" component={Home} />
            </>
        )
    }
}

export default AppRoutes;
