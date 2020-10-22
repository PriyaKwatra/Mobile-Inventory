import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { asyncProductsAdd } from '../../actions/index'
import AddToCart from '../addtocart/AddToCart'
import './Description.css'

export class Description extends Component {

    componentDidMount() {
        this.props.addProducts()
    };

    render() {
        console.log(this.props.match.params.productName);
        let mobile = this.props.products.find(product =>
            product.DeviceName === this.props.match.params.productName)

        return (mobile == undefined ? null : <div className='row'>
            <div className="col-3">
            <Card.Img className = "image" variant='top' src={mobile.url} />
            </div>
            <Card style ={{position:'relative',left:'200px',heigth:'200%'}} className="col-3">
                <div>
                <Card.Body class="col-md-8">
                    <Card.Title><h2>{mobile.DeviceName}</h2></Card.Title>
                    <Card.Text>
                        <h3>{`Brand: ${mobile.Brand}`}</h3>
                        <h4>{`Technology: ${mobile.technology}`}</h4>
                        <h4>{`Size: ${mobile.size}`}</h4>
                        <h4>{`Color: ${mobile.colors}`}</h4>
                        <h4>{`Internal: ${mobile.internal}`}</h4>
                        <h4>{`OS: ${mobile.os}`}</h4>
                        <h2>{`Price: ${mobile.price}`}</h2>
                    </Card.Text>
                </Card.Body>
                </div>
            </Card>
            <div className="col-3" style ={{position:'relative', padding: '14px 40px',left:'220px',top:'150px'}}>
            <AddToCart name={mobile.DeviceName} style ={{padding: '14px 40px'}}/>
            </div>
        </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addProducts: () => {
            dispatch(asyncProductsAdd())

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)