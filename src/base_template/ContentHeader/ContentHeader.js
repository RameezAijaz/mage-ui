import React from 'react';
import TitleWithLogo from "../../common/TitleWithLogo/TitleWithLogo";
import Jumbotron from 'react-bootstrap/Jumbotron';

function ContentHeader(props) {
    return(
        <Jumbotron>
            <div className="container">
                <h1 className="display-3">
                    <TitleWithLogo {...props}/>
                </h1>
                <p>
                    {props.detail}
                </p>
            </div>
        </Jumbotron>
    )

}

export default ContentHeader;
