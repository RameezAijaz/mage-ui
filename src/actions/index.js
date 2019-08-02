export const ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    CHANGE = 'CHANGE';

export const addToCart = item => ({
    type: ADD_TO_CART,
    item
});
export const change = item => ({
    type: CHANGE,
    item
});

export const removeFromCart = item => ({
    type: REMOVE_FROM_CART,
    item
});
