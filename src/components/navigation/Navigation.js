import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoggedOut } from '../../actions/index';
import cart from '../../cart.png';
import itemAdded from '../../itemAdded.jpeg';
import './Navigation.css'

class Navigation extends Component {

  render() {
    console.log(this.props.loggedIn)
    return (<Navbar bg="light" expand="lg">
      <Navbar.Brand ><Link to="/">Mobile Inventoy</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          {this.props.loggedIn ? <NavDropdown title={this.props.userName} id="basic-nav-dropdown" className="log">
            <NavDropdown.Item href="" onClick={this.props.setLoggedOut}>Logout</NavDropdown.Item>
          </NavDropdown> : <Nav.Link className="log"><Link to={'/login'}>login</Link></Nav.Link>}
          <Link to={`/cart`} className="cart">
            <img
              alt=""
              src={this.props.cartItems.length == 0 ? cart : itemAdded}
              width="30"
              height="30" />
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>)

  }

}

const mapStateToProps = (state) => {
  return {
    userName: state.loggingInformation.userName,
    loggedIn: state.loggingInformation.loggedIn,
    cartItems: state.products.cartItems
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLoggedOut: () => dispatch(setLoggedOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
