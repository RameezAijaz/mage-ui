import React from 'react';
import Jumbotron from "../common/Jumbotron";
import TitleWithLogo from "../common/TitleWithLogo";

class Home extends React.Component{
    render(){
        return(
            <>
                <Jumbotron title={ <TitleWithLogo title={`Hello, Mage!`} logo={'mage_logo_96x96.png'}/>}
                           content={`Welcome to mage-ui boilerplate. Mage-UI is a scaffolding tool to generate
                           lightweight boilerplate by just running single command. Mage-UI use following technologies:`} >
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h3><TitleWithLogo title={`React 16`} logo={'react_logo.png'}/></h3>
                            <p> Mage-UI use react to split UI into reusable, independent and encapsulated units called components.
                                React also helps in managing the UI state and sharing data between multiple components</p>
                            <p><a className="btn btn-secondary" target="_blank" href="https://reactjs.org/" role="button">Learn More »</a></p>
                        </div>
                        <div className="col-md-3">
                            <h3><TitleWithLogo title={`React Router 5`} logo={'react_router_logo.png'}/></h3>
                            <p>Client side routing is a basic need of modern single page application. Client side routing makes user navigation easier.
                                Mage-UI is using latest version of react router to handle client side routing. </p>
                            <p><a className="btn btn-secondary" href="https://reacttraining.com/react-router/web/guides/quick-start" target="_blank" role="button">Learn More »</a></p>
                        </div>
                        <div className="col-md-3">
                            <h3><TitleWithLogo title={`Webpack 4`} logo={'webpack_logo.png'}/></h3>
                            <p>Webpack 4 is used for bundling the js, html, css and static assets like images and fonts.
                                It also provide quick and easy way to start the development server with hot reloading.</p>

                            <p><a className="btn btn-secondary" href="https://webpack.js.org/" target="_blank" role="button">Learn More »</a></p>
                        </div>
                        <div className="col-md-3">
                            <h3><TitleWithLogo title={`Bootstrap 4`} logo={'bootstrap_logo.png'}/></h3>
                            <p>Bootstrap is a light weight css library to build beautiful, sleek and fully responsive UI.
                                Mage-UI is using the latest version of bootstrap with very minimal customization</p>
                            <p><a className="btn btn-secondary" href="https://getbootstrap.com/" target="_blank" role="button">Learn More »</a></p>
                        </div>
                    </div>
                    <hr/>

                </div>

            </>

        )
    }

}

export default Home;
