import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setLoggedIn } from '../../actions/index';
import './Login.css';


export class Login extends Component {


    state = {
        userName: " ",
        password: " "
    };


    handleUserName = (event) => {
        this.setState({ userName: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {

        if (this.state.userName === this.props.userName && this.state.password === this.props.password) {
            this.login();
        }

        else {
            alert("incorrect userName or password");
        }

    }

    login() {
        this.props.setLoggedIn();
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="form">
                <h1 style={{ position: 'absolute', left: '250px' }} >Sign in</h1>
                <div style={{ position: 'absolute', top: '100px', left: '100px', width: '50%', padding: '20px' }}>
                    <p>UserName
          <input type="userName" className={`form-control mb-4 user`} placeholder="UserName"
                            name="userName" required onChange={this.handleUserName}  />
                    </p>
                    <p>Password
          <input type="password" className={`form-control mb-4 password`} placeholder="Password"
                            name="password" required onChange={this.handlePassword}  />
                    </p>
                    <div class="d-flex justify-content-around">
                    </div>
                    <Button variant="primary" color="info" block="true" onClick={this.handleSubmit} className="sign" >Sign in</Button>
                </div>
            </div>


        )
    }

}

const mapStateToProps = (state) => {
    return {
        userName: state.loggingInformation.userName,
        password: state.loggingInformation.password
    }
}

const mapDispatchToProps = (dispatch) => ({
    setLoggedIn: () => dispatch(setLoggedIn())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))