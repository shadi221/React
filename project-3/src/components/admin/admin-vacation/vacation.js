import React, { Component, useDebugValue } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import '../../home.css'
import socketIOClient from "socket.io-client";
import * as GlobalFun from '../../test/test'

import Navbar from '../admin-navbar/navbar';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';

import Card from '../../vacationCard';

class Vacation extends Component {
    socket;
    state = {
        startDate: new Date(),
        uploadedFile: null,
        formData: new FormData,
        filesToUpload: [],
        endpoint: GlobalFun.globalUrl
    }
    componentDidMount() {
        //check if user exists
        GlobalFun.checkUser()

        this.getVacations()

        this.socket = socketIOClient(this.state.endpoint);
        this.socket.on('vacations', (SelectALLVac) => {
            this.setState({ vacations: SelectALLVac })
        })
    }
    //date change
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
        let filesToUpload = event.target.files
        this.setState({ filesToUpload })
    }

    getVacations = async () => {
        let vacations = await GlobalFun.getVacations()

        this.setState({
            vacations
        })
    }

    addVacation = async () => {

        if (!this.state.desc || !this.state.price || !this.state.arrival || !this.state.departure) {
            alert('information missing')
        } else {
            if (this.state.option == 1) {
                this.state.formData = new FormData();
                this.state.formData.append("description", this.state.desc);
                this.state.formData.append("price", this.state.price);
                this.state.formData.append("departure", this.state.departure);
                this.state.formData.append("returnDate", this.state.arrival);

                for (let i = 0; i < this.state.filesToUpload.length; i++) {
                    this.state.formData.append("uploads[]", this.state.filesToUpload[i], this.state.filesToUpload[i]['name']);
                }

                let res = await axios.post(GlobalFun.globalUrl + `addVacation`, this.state.formData)
                let data = res.data
                await this.getVacations()
                this.socket.emit('vacations', this.state.vacations)
            }
            else {

                let res = await axios.get(GlobalFun.globalUrl + `addVacationTextImg?description=${this.state.desc}&img=${this.state.uploadedFile}&price=${this.state.price}&departure=${this.state.departure}&returnDate=${this.state.arrival}`)
                let data = res.data
                await this.getVacations()
                this.socket.emit('vacations', this.state.vacations)
            }
        }

    }

    //input handlers
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

    render() {
        let vacation = ''

        if (this.state.vacations) {
            vacation = this.state.vacations.map(item => {
                return <Card departChange={this.departChange} arrivalChange={this.arrivalChange} descriptionChange={this.descriptionChange} priceChange={this.priceChange} fileSelector={this.fileSelector} fileSelectorText={this.fileSelectorText} showOptions={this.showOptions} option={this.state.option} vacation={item} deleteFn={this.deleteVacation} updateFn={this.updateVacation}></Card>
            })
        }


        let option = ''

        if (this.state.option === 1) {
            option = (<input type="file" onChange={this.fileSelector}>
            </input>)
        } else if (this.state.option === 2) {
            option = (<input type="text" onChange={(event) => this.fileSelectorText(event)} placeholder="Enter Image Url">
            </input>)
        }

        let ret = this.state.arrival

        return (
            <div className="container">
                <div className="row">
                    <Navbar></Navbar>
                </div>

                <div className="row m-4">
                    <div className="col-4" style={{ width: '350px' }}>
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Trip Destination</label>
                                <input onChange={(event) => this.descriptionChange(event)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Trip Description" />
                            </div>

                            <button type="button" className="btn btn-primary mt-3" onClick={() => this.showOptions(1)}>Add Image Locally</button>
                            <br />
                            <button type="button" className="btn btn-primary mt-3" onClick={() => this.showOptions(2)}>Add Image From Web</button>

                            <div className="row m-2">
                                {option}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Vacation Cost</label>
                                <input onChange={(event) => this.priceChange(event)} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Price" />
                            </div>

                            <div className="mt-3">
                                <h5>
                                    Departure:
                                </h5>
                                <DatePicker
                                    todayButton="Today"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={this.departChange}
                                    placeholderText='Enter Departure Date'
                                />
                            </div>

                            <div className="mt-3">
                                <h5>
                                    Return:
                                </h5>
                                <DatePicker
                                    todayButton="Today"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={this.arrivalChange}
                                    placeholderText='Enter Return Date'
                                />
                            </div>

                            <button type="button" className="btn btn-primary mt-3" onClick={() => this.addVacation()}>Add Trip</button>

                        </form>
                    </div>
                    <div className="row m-4">
                        {vacation}
                    </div>
                </div>

            </div>
        );
    }
}

export default Vacation;











