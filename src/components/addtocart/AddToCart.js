import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addItemToCart } from '../../actions/index';

export class AddToCart extends Component {

    onUnload = e => {
        e.preventDefault();
    };

    render() {

        return (
            this.isAlreadyAdded() ? <Button style={{ position: 'relative', left: '5px' }} variant="primary" className='b'>Item Added</Button> :
                <Button style={{ position: 'relative', left: '5px' }} variant="primary" onClick={this.add} className='b'>Add to cart</Button>
        )
    }

    add = () => {
        this.props.addToCart(this.props.name)
    }

    isAlreadyAdded = () => {
        let product = ""
        product = this.props.products.find((device) => (device.DeviceName === this.props.name))
        return product === undefined ? false : true
    }

}

const mapStateToProps = (state) => {
    return {
        products: state.products.cartItems
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToCart: (name) => dispatch(addItemToCart(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)