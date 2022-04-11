import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';

import Login from './login/login';
import SignUp from './signup/signup';
import Admin from './admin/admin';
import User from './user/user'

import AdminVacation from './admin/admin-vacation/vacation';
import Graph from './admin/graph'


class Home extends Component {

    state = {

    }

    render() {
        return (
            <div className="App row p-3">
                <Route path="/" exact component={Login} />
                <Route path="/signUp" exact component={SignUp} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/user" exact component={User} />

                <Route path="/adminVacation" exact component={AdminVacation} />
                <Route path="/adminGraph" exact component={Graph} />

            </div>
        );
    }
}

export default Home;











