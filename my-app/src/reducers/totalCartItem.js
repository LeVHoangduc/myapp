const initialState = {
    total: 0
}
function totalCartItem(state = initialState, action) {
    switch (action.type) {
        case 'TOTAL_CART_ITEM':
            return {
                ...state,
                total: action.payload
            }
        default:
            return state
    }
}
export default totalCartItem;