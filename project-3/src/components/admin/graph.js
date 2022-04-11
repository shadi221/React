import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Navbar from './admin-navbar/navbar';
import '.././home.css'
import * as GlobalFun from '../test/test'


import CanvasJSReact from '../../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Graph extends Component {

    state = {

    }
    componentDidMount() {
        GlobalFun.checkUser()

        this.getVacations()
    }

    getVacations = async () => {
        let vacations = await GlobalFun.getVacations()

        this.setState({
            vacations
        })
    }
    render() {
        let data = []
        if (this.state.vacations) {
            this.state.vacations.map(item => {
                if (item.number_of_followers > 0) {
                    return data.push(
                        {
                            label: item.description, y: item.number_of_followers
                        }
                    )
                }
            })
        }
        const options = {
            height: 260,
            width: 1000,
            title: {
                text: "Basic Column Chart in React"
            },
            data: [{
                type: "column",
                dataPoints: data
            }]
        }
        return (
            <div className="container">
                <div className="row">
                    <Navbar></Navbar>
                </div>
                <div className="row m-4 offset-2">
                    <div className=''>
                        <CanvasJSChart options={options}
                        /* onRef = {ref => this.chart = ref} */
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default Graph;











