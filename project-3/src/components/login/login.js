import React, { Component } from 'react';
import './login.css'
import { Route, Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import * as GlobalFun from '../test/test'



class Login extends Component {

    state = {
        dir: '',
        user: []
    }

    componentDidMount() {
        if (localStorage.user) {
            this.state.user = JSON.parse(localStorage.user)
            if (this.state.user[0].user_type == "admin") {
                window.location.href = "/admin"
            }
            else if (this.state.user[0].user_type == "user") {
                window.location.href = "/user"
            }
        }
    }

    checkUser = async () => {
        let res = await axios.get(GlobalFun.globalUrl + `checkUsers?mail=${this.state.mail}&password=${this.state.password}`)
        let data = res.data
        this.setState({ user: data })

        if (this.state.user.length > 0) {
            localStorage.user = JSON.stringify(this.state.user);
            if (this.state.user[0].user_type == "admin") {
                window.location.href = "/admin"
            }
            else if (this.state.user[0].user_type == "user") {
                window.location.href = "/user"
            }
        }
        else {
            alert('Sign Up')
        }
    }

    mailChange = (event) => {
        this.setState({ mail: event.target.value })
    }

    passwordChange = (event) => {
        console.log(event.target.value)
        this.setState({ password: event.target.value })
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
                                <input onChange={(event) => this.passwordChange(event)} type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <input type="button" className="btn btn-success" onClick={() => this.checkUser()} value="Log In" />
                            <div className="row mt-3">
                                <a href={'/signUp'} type="button" className="btn btn-info ml-3">Sign Up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;











