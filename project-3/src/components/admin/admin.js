import React, { Component, useDebugValue } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import '.././home.css'
import socketIOClient from "socket.io-client";
import * as GlobalFun from '../test/test'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';

import Navbar from './admin-navbar/navbar';

import Card from '../vacationCard';


class Admin extends Component {
    socket;
    state = {
        startDate: new Date(),
        uploadedFile: null,
        endpoint: GlobalFun.globalUrl
    }
    componentDidMount() {
        //check if user exists
        GlobalFun.checkUser()

        this.getVacations()

        this.socket = socketIOClient(this.state.endpoint);
        this.socket.on('vacations', (data) => {
            this.setState({ vacations: data })
        })
    }

    getVacations = async () => {
        let vacations = await GlobalFun.getVacations()
        this.setState({
            vacations
        })
    }

    deleteVacation = async (id) => {
        GlobalFun.deleteVacation(id)
        await this.getVacations()
        this.socket.emit('vacations', this.state.vacations)
    }

    updateVacation = async (id) => {
        if (!this.state.desc || !this.state.uploadedFile || !this.state.price || !this.state.arrival || !this.state.departure) {
            alert('information missing')
        } else {
            let res = await axios.get(GlobalFun.globalUrl + `updateVacation?description=${this.state.desc}&img=${this.state.uploadedFile}&price=${this.state.price}&departure=${this.state.departure}&returnDate=${this.state.arrival}&id=${id}`)
            let data = res.data

            await this.getVacations()
            this.socket.emit('vacations', this.state.vacations)
        }
    }
    //date handlers
    departChange = date => {
        let date1 = dateFormat(date, 'yyyy-mm-dd')
        this.setState({
            departure: date1
        });
    };

    arrivalChange = date => {
        let date1 = dateFormat(date, 'yyyy-mm-dd')
        this.setState({
            arrival: date1
        });
    };

    //file handler
    fileSelector = event => {
        let files = event.target.files

        let reader = new FileReader();
        reader.readAsDataURL(files[0])

        reader.onload = (event) => {
            console.log(files[0].name)
            this.setState({
                uploadedFile: files[0].name
            })
        }
    }
    //input handler
    descriptionChange = (event) => {
        this.setState({
            desc: event.target.value
        })
    }

    priceChange = (event) => {
        this.setState({
            price: event.target.value
        })
    }
    //image upload location
    showOptions = (num) => {
        this.setState({
            option: num
        })
    }

    fileSelectorText = event => {
        this.setState({
            uploadedFile: event.target.value
        })
    }


    render() {
        let vacation = ''

        if (this.state.vacations) {
            vacation = this.state.vacations.map(item => {
                return <Card departChange={this.departChange} arrivalChange={this.arrivalChange} descriptionChange={this.descriptionChange} priceChange={this.priceChange} fileSelector={this.fileSelector} fileSelectorText={this.fileSelectorText} showOptions={this.showOptions} option={this.state.option} vacation={item} deleteFn={this.deleteVacation} updateFn={this.updateVacation}></Card>
            })
        }
        return (
            <div className="container">
                <div className="row">
                    <Navbar></Navbar>
                </div>

                <div className="row">
                    {vacation}
                </div>
            </div>
        );
    }
}

export default Admin;











