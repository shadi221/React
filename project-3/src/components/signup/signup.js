import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import '../login/login.css'
import * as GlobalFun from '../test/test'


class Login extends Component {

    state = {

    }

    userSignUp = async () => {
        let res1 = await axios.get(GlobalFun.globalUrl + `checkMail?mail=${this.state.mail}`);
        let data1 = res1.data;
        if (data1.length > 0) {
            console.log(data1)
            let answer1 = window.confirm('Email Already Regestred Would You Like To Log In?')
            if (answer1) {
                window.location.href = "/"
            } else {
                window.location.href = "/signUp"
                data1 = []
            }
        } else {
            if (!GlobalFun.validateEmail(this.state.mail)) {
                alert('Please Enter Valid Email Address')
            } else {
                let res = await axios.get(GlobalFun.globalUrl + `addUser?user_type=user&first_name=${this.state.FirstName}&last_name=${this.state.LastName}&mail=${this.state.mail}&password=${this.state.password}`);
                let data = res.data;
                let answer = window.confirm('Registration Succefull, Go To Login Page?')
                if (answer) {
                    window.location.href = "/"
                } else {
                    window.location.href = "/signUp"
                }
            }
        }
    }

    mailChange = (event) => {
        this.setState({ mail: event.target.value })
    }

    passChange = (event) => {
        this.setState({ password: event.target.value })
    }

    FirstnameChange = (event) => {
        this.setState({ FirstName: event.target.value })
    }

    LastnameChange = (event) => {
        this.setState({ LastName: event.target.value })
    }

    render() {
        return (
            <div className="p-3">
                <div className="jumbotron Login">
                    <div className="row loginForm">
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input onChange={(event) => this.mailChange(event)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input onChange={(event) => this.passChange(event)} type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">First Name</label>
                                <input onChange={(event) => this.FirstnameChange(event)} type="text" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Last Name</label>
                                <input onChange={(event) => this.LastnameChange(event)} type="text" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <input onClick={() => this.userSignUp()} type="button" className="btn btn-info mt-2" value="Sign Up" />
                            <div className="row mt-2">
                                <a href={'/'} type="button" className="btn btn-success ml-3">Log In</a>
                            </div>
                            <small id="emailHelp" className="form-text text-muted">If You Already Have An Accout Log in.</small>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

export default Login;











