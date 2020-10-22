import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeQuantity, removeItemFromCart } from '../../actions/index';
import PlaceOrder from '../placeorder/PlaceOrder';
import './Cart.css';

class Cart extends Component {

    render() {
        console.log("this.props", this.props);
        return (<div >
            {this.props.cartItems.length === 0 ? <h1 style={{ position: 'absolute', left: '700px', top: '300px' }}>Cart Empty</h1> :
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Device</th>
                                <th>Model</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.cartItems.map((product) => (
                                <tr>
                                    <td><img className="img" src={product.url}></img></td>
                                    <td>{product.DeviceName}</td>
                                    <td>{product.quantity}
                                        <Button className="btn btn-default btn-lg"
                                            size="sm" onClick={() => { this.changeQuantity(product.DeviceName, product.quantity + 1) }} >
                                            <span className="glyphicon glyphicon-triangle-top" > </span></Button>
                                        <Button className="btn btn-default btn-lg"
                                            drop="down"
                                            size="sm" onClick={() => { this.changeQuantity(product.DeviceName, product.quantity - 1) }}>
                                            <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"> </span></Button></td>
                                    <td>{product.price}
                                    </td>
                                    <td><Button variant="primary" onClick={() => { this.removeItem(product.DeviceName) }}>remove</Button></td>
                                </tr>

                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>

                                <td>Total: {this.props.cartItems.length == 1 ? this.props.cartItems[0].price * this.props.cartItems[0].quantity : this.props.cartItems.reduce(((a, b) => (a.price * a.quantity + b.price * b.quantity)))}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div style={{ position: 'relative', left: '800px', top: '10px' }}><PlaceOrder /></div>
                </div>
            }
        </div>)
    }

    changeQuantity = (name, quantity) => {
        quantity === 0 ? this.props.remove(name) : this.props.changeQuantity(name, quantity)
    }

    removeItem = (name) => {
        this.props.remove(name)
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.products.cartItems
    }
}

const mapDispatchToProps = (dispatch) => ({
    remove: (name) => dispatch(removeItemFromCart(name)),
    changeQuantity: (name, quantity) => dispatch(changeQuantity(name, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)