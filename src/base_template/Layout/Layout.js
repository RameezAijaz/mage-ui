import React from 'react';
import ContentHeader from "../ContentHeader/ContentHeader";
import { Container } from 'react-bootstrap';


class Layout extends React.Component {

    render(){
        return(
            <>
                <ContentHeader title={this.props.title} logo={this.props.logo}
                               detail={this.props.detail}/>
                <Container>
                    <div className="content">
                    {this.props.children}
                    </div>
                    <hr/>
                </Container>
            </>
        )
    }

}

export default Layout;
