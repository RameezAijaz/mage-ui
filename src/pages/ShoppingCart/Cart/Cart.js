import React from 'react';
import { removeFromCart } from "../actions";
import { connect } from 'react-redux'
import { ContentList } from "../../../common/ContentList/ContentList";

class Cart extends React.Component {
    render(){
        const { shoppingCart, removeFromCart } = this.props;
        return(
            <ContentList name="Shopping Cart"
                         title="Shopping Cart"
                         className="w-25"
                         data={shoppingCart}
                         icon="minus"
                         onClick={removeFromCart.bind(this)}
            />
        )
    }
}


const mapStateToProps = state => ({
    shoppingCart: state.shoppingCartReducer.get('shoppingCart')
});

const mapDispatchToProps = dispatch => ({
    removeFromCart: item => dispatch(removeFromCart(item))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
