import { asyncProductsAdd } from '../../actions/index'
import { asc } from '../../actions/index'
import { desc } from '../../actions/index'
import AddToCart from '../addtocart/AddToCart'
import { MDBCol } from 'mdbreact'
import React, { Component } from 'react'
import { Button, Card, NavDropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Inventory.css'

class Inventory extends Component {

    state = {
        previousPage: 1,
        totalProducts: undefined,
        navProducts: this.props.products,
        searchValue: "",
        order: undefined
    }

    componentDidMount() {
        this.props.addProducts()
    };

    componentDidUpdate() {
        if (this.state.totalProducts === undefined || this.state.order != undefined) {
            let products = this.props.products;
            const n = products.length / 6;
            const initialIndex = (((products.length) / n) * this.state.previousPage) - 6;
            const lastIndex = (((products.length) / n) * this.state.previousPage) - 1;
            if (this.state.searchValue != "") {
                this.onSearch(undefined, this.state.searchValue)
            }
            else {
                this.setState(
                    {
                        previousPage: 1,
                        totalProducts: this.props.products,
                        navProducts: this.props.products.filter((obj, index) => index >= initialIndex && index <= lastIndex),
                        searchValue: "",
                        order: undefined
                    }
                )
            }

        }
    }

    visibleProduct = (pageNo) => {
        let products = this.state.totalProducts;
        const n = products.length / 6;
        const intialIndex = (((this.state.totalProducts.length) / n) * pageNo) - 6;
        const lastIndex = (((this.state.totalProducts.length) / n) * pageNo) - 1;
        return products.filter((obj, index) => index >= intialIndex && index <= lastIndex);
    }

    appPagination = (pageNo) => {
        let currentPage = pageNo;
        const n = this.state.totalProducts.length / 6;
        if ((((this.state.totalProducts.length) / n) * pageNo) - 6 > (this.state.totalProducts.length)) {
        }

        else {
            if (pageNo == 0) {
                currentPage = this.state.previousPage == 1 ? 1 : this.state.previousPage - 1
            }

            else if (pageNo == 4) {
                currentPage = this.state.previousPage == 3 ? 3 : this.state.previousPage + 1
            }

            this.state.searchValue == "" ?
                this.setState({
                    previousPage: currentPage,
                    navProducts: this.visibleProduct(currentPage),
                    totalProducts: this.props.products
                }) : this.setState({
                    previousPage: currentPage,
                    navProducts: this.visibleProduct(currentPage),
                })

        }

    }

    onSearch(event, search) {
        {
            const toSearch = event == undefined ? search : event.target.value;
            const searchedProducts = this.props.products.filter((obj) => obj.DeviceName.toLowerCase().includes(toSearch.toLowerCase()));
            if (searchedProducts.length > 1) {
                return this.setState(() => ({
                    searchValue: toSearch,
                    totalProducts: searchedProducts,
                    navProducts: this.visibleProduct(this.state.previousPage),
                    order: undefined
                }));
            }
        }
    }

    setAsc = () => {
        this.setState({ order: "asc" })
        this.props.asc();
    }

    setDesc = () => {
        this.setState({ order: "desc" })
        this.props.desc();
    }

    render() {
        console.log(this.state)
        return (<div id={this.props.products.size}>
            <NavDropdown title="Sort" id="basic-nav-dropdown" className="log">
                <NavDropdown.Item href="" onClick={this.setAsc}>Sort Low to High</NavDropdown.Item>
                <NavDropdown.Item href="" onClick={this.setDesc}>Sort High To Low</NavDropdown.Item>
            </NavDropdown>
            <input
                type="search"
                name="s"
                aria-label="Search"
                placeholder="Search"
                onChange={e => this.onSearch(e)} />
            <div className="row">
                {
                    this.state.navProducts.map((mobile) =>
                        (<div style={{ position: 'relative', top: '50px', left: "0px" }} className='col-4'>
                            <Card style={{ width: '18rem', position: 'relative', left: '120px', top: '10px' }}>
                                <Card.Img variant="top" src={`${mobile.url}`} style={{
                                    width: '18rem',
                                    height: '8vw'
                                }} />
                                <Card.Body>
                                    <Card.Title>{mobile.DeviceName}</Card.Title>
                                    <Card.Text style={{
                                        height: '3vw'
                                    }}>
                                        {mobile.price}
                                    </Card.Text>
                                    <Link to={`/description/${mobile.DeviceName}`}>
                                        <Button variant="primary">Description</Button>
                                    </Link>
                                    <AddToCart name={mobile.DeviceName} />
                                </Card.Body>
                            </Card>
                        </div>
                        ))}

            </div>

            <nav aria-label="Page navigation example" style={{ position: 'relative', top: '50px', left: "550px" }}>
                <ul class="pagination">
                    <li class="page-item" onClick={() => { this.appPagination(0) }}><a class="page-link">Previous</a></li>
                    <li class="page-item" onClick={() => { this.appPagination(1) }}><a class="page-link">1</a></li>
                    <li class="page-item" onClick={() => { this.appPagination(2) }}><a class="page-link">2</a></li>
                    <li class="page-item" onClick={() => { this.appPagination(3) }}><a class="page-link">3</a></li>
                    <li class="page-item" onClick={() => { this.appPagination(4) }}><a class="page-link">Next</a></li>
                </ul>
            </nav>
        </div>)
    }

}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        quantity: state.products.quantity
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addProducts: () => {
            dispatch(asyncProductsAdd())

        },
        asc: () =>
            dispatch(asc()),
        desc: () =>
            dispatch(desc())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)