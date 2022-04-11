import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Home from './components/home'
import Header from './components/header/header'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="row">
                    <Header></Header>
                </div>
                <div className="row">
                    <Home></Home>
                </div>
            </BrowserRouter>

        </div>
    );
}

export default App;
