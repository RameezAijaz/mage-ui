import React from 'react';

class Jumbotron extends React.Component{
    render(){
        const {title, content, children} = this.props;
        return(
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-3">{title}</h1>
                    <p>{content}</p>
                    {children}
                </div>
            </div>
        )
    }
}

export default Jumbotron;
