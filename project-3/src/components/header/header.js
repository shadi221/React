import React, { Component } from 'react';
import './header.css';

class Header extends Component {

    state = {

    }


    render() {
        let img = require('./logo.png')
        return (
            <div className="headerContainer">
                <img class="logo" src={img} alt="Smiley face" height="100" width="100" />

                <div className='title'>
                    Your Dream Vacation
                </div>
            </div>
        );
    }
}

export default Header;











