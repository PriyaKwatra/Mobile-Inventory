
export const addItemToCart = (name) => ({
    type: 'ADD_ITEM',
    name: name,
})

export const asyncProductsAdd = () => 
    (dispatch) => {
        fetch('http://localhost:3004/mobiles')
            .then(response => response.json())
            .then(mobiles => {
                console.log(mobiles)
                dispatch({
                    type: "ADD_PRODUCTS",
                    products: mobiles
                })
            });
    }

export const addProducts = (products) => ({
    type: 'ADD_PRODUCTS',
    products: products,
})

export const removeItemFromCart = (name) => ({
    type: 'REMOVE_ITEM',
    name: name,
})

export const changeQuantity = (name, quantity) => ({
    type: 'CHANGE_QUANTITY',
    name: name,
    quantity: quantity
})

export const asc = () => ({
    type: 'ASC'
})

export const desc = () => ({
    type: 'DESC'
})

export const emptyCart = () => ({
    type: 'EMPTY_CART'
})

export const setLoggedIn = ()=>({
    type: 'LOGGED_IN'
})

export const setLoggedOut = ()=>({
    type: 'LOGGED_OUT'
})
