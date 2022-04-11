import React, { Component } from 'react';
import './side.css';
import { Route, Link } from 'react-router-dom';


class SideBar extends Component {

    state = {

    }

    logOut = () => {
        localStorage.clear();
        window.location.href = "/"

    }


    render() {
        return (
            <div className="Blog MainBlog">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link"><Link to="/">Home</Link></a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link"><Link to="/adminVacation">Add Vacations</Link></a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link"><Link to="/adminGraph">Graph</Link></a>
                            </li>
                            <li class="nav-item active">
                                <input id="logIn" style={{ position: "relative", top: "5px", left: "10px", border: "none", color: "blue", background: "none" }} type="button" className="nav-item active" onClick={() => this.logOut()} value="Log Out" />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default SideBar;











