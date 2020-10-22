import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { emptyCart } from '../../actions/index';

class PlaceOrder extends Component {

    placeOrder = () => {

        if (this.props.loggedIn === true) {
            alert(`Order placed with Order Id: ${Math.random().toString(36).substr(2, 9)}`)
            this.props.emptyCart();
        }
        else {
            alert("please login to place order")
        }

    }

    render() {

        return (
            <Button style={{ position: 'relative', left: '5px' }} variant="primary" onClick={this.placeOrder}> Place Order</Button>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        cartItems: state.products.cartItems,
        userName: state.loggingInformation.userName,
        loggedIn: state.loggingInformation.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => ({
    emptyCart: (name) => dispatch(emptyCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)