const initial_state = {
    userName: "priya03",
    password: "hello",
    loggedIn: false
}

const loggingInformation = (state = initial_state, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                ...state,
                loggedIn: true
            }
        case 'LOGGED_OUT':

            return {
                ...state,
                loggedIn: false
            }
        default:
            return state
    }
}

export default loggingInformation;