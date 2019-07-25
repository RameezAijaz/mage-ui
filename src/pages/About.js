import React from 'react';
import Jumbotron from "../common/Jumbotron";
import TitleWithLogo from "../common/TitleWithLogo";

class About extends React.Component {

    render(){
        return(
            <>
                <Jumbotron title={ <TitleWithLogo title={`About Mage`} logo={'mage_logo.png'}/>}
                           content={'This is a sample About us page'} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                                Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                                Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet
                                risus.</p>
                            <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                        </div>
                    </div>
                    <hr/>

                </div>

            </>
        )
    }
}

export default About;
