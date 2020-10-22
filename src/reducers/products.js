const initial_state = {
    products: [],
    cartItems: []
}

const products = (state = initial_state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCTS':
            return {
                ...state,
                products: action.products
            }
        case 'ADD_ITEM':
            const itemToBeAdded = state.products.find(item => item.DeviceName === action.name)
            itemToBeAdded.quantity = 1;
            // state.cartItems.push(itemToBeAdded);
            return {
                ...state,
                cartItems: state.cartItems.concat([itemToBeAdded])
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.DeviceName != action.name)
            };
        case 'CHANGE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map((device) => (
                    device.DeviceName === action.name ? { ...device, quantity: action.quantity } : device
                ))
            }
        case 'EMPTY_CART':
            return {
                ...state,
                cartItems: []
            };
        case 'ASC':
            const ascProducts = state.products.sort((a, b) => { return a.price - b.price });
            return {
                ...state,
                products: state.products.slice().sort((a, b) => { return a.price - b.price })
            };
        case 'DESC':
            const descProducts = state.products.sort((a, b) => { return b.price - a.price });
            return {
                ...state,
                products: state.products.slice().sort((a, b) => { return b.price - a.price })
            };
        default:
            return state
    }
}

export default products;