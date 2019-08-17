import React from 'react';
import { connect } from 'react-redux'
import { addToCart } from "../actions";
import { ContentList } from "../../../common/ContentList/ContentList";


class Inventory extends React.Component {
    render(){
        const { itemsInventory, addToCart } = this.props;
        return(
            <ContentList name="Inventory"
                         title="Inventory"
                         className="w-25"
                         data={itemsInventory}
                         icon="plus"
                         onClick={addToCart.bind(this)}
            />
        )
    }
}


const mapStateToProps = state => ({
    itemsInventory: state.shoppingCartReducer.get('itemsInventory')
});

const mapDispatchToProps = dispatch => ({
    addToCart: item => dispatch(addToCart(item))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Inventory)
