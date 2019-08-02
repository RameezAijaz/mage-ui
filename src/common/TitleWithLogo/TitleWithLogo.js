import React from "react";

function TitleWithLogo(props){
    return (
        <> {props.title}
           {props.logo &&
           <small className="logo">
                <img src={props.logo} alt={props.logo}/>
            </small>}
        </>
    )
}

export default TitleWithLogo;
