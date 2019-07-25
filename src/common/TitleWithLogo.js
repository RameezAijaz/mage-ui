import React from "react";

function TitleWithLogo(props){
    return (
        <> {props.title}
            <small className="logo">
                <img src={props.logo} alt={props.logo}/>
            </small>
        </>
    )
}

export default TitleWithLogo;
