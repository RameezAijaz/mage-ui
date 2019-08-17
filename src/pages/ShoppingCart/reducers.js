import { Map } from 'immutable';
import { findIndex, remove } from 'lodash';
import { ADD_TO_CART, REMOVE_FROM_CART } from './actions';

const initialState = Map({
    itemsInventory: [
        {name:'Egg', count:5},
        {name:'Bread', count:5},
        {name:'Milk', count:5}
    ],
    shoppingCart: []
});

const actionsMap = {
    [ADD_TO_CART]: (state, action) => {
        let itemsInventory = state.get('itemsInventory'),
            inventoryIndex = findIndex(itemsInventory, (itm)=>itm.name===action.item.name),
            shoppingCart = state.get('shoppingCart'),
            cartIndex = findIndex(shoppingCart, (itm)=>itm.name===action.item.name);

        if(inventoryIndex>=0){
            itemsInventory[inventoryIndex].count-- ;

            if(itemsInventory[inventoryIndex].count===0)
                remove(itemsInventory, (itm)=>itm.name===action.item.name);
        }

        if(cartIndex<0){
            shoppingCart.push({name: action.item.name, count:1});
        }
        else{
            shoppingCart[cartIndex].count++;
        }

        return state.merge(Map({
            itemsInventory:[...itemsInventory],
            shoppingCart:[...shoppingCart]
        }));
    },
    [REMOVE_FROM_CART]: (state, action) => {
        let itemsInventory = state.get('itemsInventory'),
            inventoryIndex = findIndex(itemsInventory, (itm)=>itm.name===action.item.name),
            shoppingCart = state.get('shoppingCart'),
            cartIndex = findIndex(shoppingCart, (itm)=>itm.name===action.item.name);

        if(inventoryIndex<0){
            itemsInventory.push({name: action.item.name, count:1});
        }
        else{
            itemsInventory[inventoryIndex].count++ ;
        }

        if(cartIndex>=0) {
            shoppingCart[cartIndex].count--;
            if(shoppingCart[cartIndex].count===0)
                remove(shoppingCart, (itm)=>itm.name===action.item.name);
        }



        return state.merge(Map({
            itemsInventory:[...itemsInventory],
            shoppingCart:[...shoppingCart]
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
