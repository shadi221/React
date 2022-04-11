import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import * as GlobalFun from '../test/test'

import '.././home.css'
import Card from '../vacationCard'


class User extends Component {

    socket;

    state = {
        endpoint: "localhost:4000",
        followingVacs: [],
    }

    componentDidMount() {
        if (localStorage.user) {
            this.state.user = JSON.parse(localStorage.user)
        } else {
            alert('You Must Be Signed In')
            window.location.href = "/"
        }
        this.getRelatedVacs()

        this.socket = socketIOClient(this.state.endpoint);
        this.getVacations()

        this.socket.on('vacations', (data) => {
            this.setState({ vacations: data })
        })
    }



    logOut = () => {
        localStorage.clear();
        window.location.href = "/"
    }

    constructor(props) {
        super(props);
        this.iconHeart = this.iconHeart.bind(this);
    }


    iconHeart = async (id, i, vacation) => {

        let vacations = [...this.state.vacations]
        vacations[i].following = !vacations[i].following
        let cas = vacations[i].following
        this.setState({ vacations })

        switch (cas) {
            case true:
                let vac = vacation.number_of_followers
                let res = await axios.get(GlobalFun.globalUrl + `updateFollow?num=${vac}&id=${id}`)
                let data = res.data

                this.setState({ followingVacs: data })

                let res1 = await axios.get(GlobalFun.globalUrl + `addUserByVacation?user_id=${this.state.user[0].id}&id=${id}`)
                let data1 = res1.data

                break;

            case false:

                const found = this.state.followingVacs.find(element => element.description === vacation.description);

                let vac1 = await found.number_of_followers
                let res2 = await axios.get(GlobalFun.globalUrl + `updateToMinus?num=${vac1}&id=${id}`)
                let data2 = res2.data

                this.setState({ followingVacs: data2 })

                this.getVacations()

                let res3 = await axios.get(GlobalFun.globalUrl + `deleteUserByVacation?user_id=${this.state.user[0].id}&id=${id}`)
                let data3 = res3.data
                window.location.reload()
                break;
        }

    }

    getVacations = async () => {
        let vacations = await GlobalFun.getVacations()


        this.setState({
            vacations: vacations
        })
        this.setState({
            followingVacs: vacations
        })
        this.getRelatedVacs()
    }

    getRelatedVacs = async () => {
        let res = await axios.get(GlobalFun.globalUrl + `GetVacByUser?user_id=${this.state.user[0].id}`)
        let data = res.data
        this.setState({ favs: data })

    }


    render() {
        let vacation = ''

        if (this.state.vacations) {
            vacation = this.state.vacations.sort(function (a, b) { return b.following - a.following }).map((item, index) => {
                return <Card index={index} vacation={item} iconHeart={this.iconHeart}></Card>
            })
        }

        if (this.state.vacations && this.state.favs) {
            this.state.favs.map(item => {
                const found = this.state.vacations.find(element => element.description === item.description);
                found.following = true
            })
        }
        let name = ''
        if (this.state.user) {
            name = this.state.user[0].first_name
        }

        return (
            <div className="container">
                <div className="row name">
                    Hello {name} !!
                </div>
                <div className="row mt-2">
                    <input id="logIn" style={{ float: "right", position: "relative", left: "900px" }} type="button" className="btn btn-danger" onClick={() => this.logOut()} value="Log Out" />
                </div>
                <div className="row">
                    {vacation}
                </div>
            </div>
        );
    }
}

export default User;











