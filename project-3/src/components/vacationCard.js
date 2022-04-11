import React from 'react';
import FontAwesome from 'react-fontawesome'
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';
import * as GlobalFun from './test/test'

import "./home.css"

const Card = (props) => {
    let Imgsrc = ''
    if (props.vacation.img) {
        if (props.vacation.img.startsWith('http')) {
            Imgsrc = props.vacation.img
        } else {
            Imgsrc = GlobalFun.globalUrl + `${props.vacation.img}`
        }
    }

    let hicon = '';
    let del = '';
    let popUp = ''
    let user = JSON.parse(localStorage.user)

    let color = "black"
    if (props.vacation.following) {
        color = "red"
    }

    let option = ''

    if (props.option === 1) {
        option = (<input type="file" onChange={props.fileSelector}>
        </input>)
    } else if (props.option === 2) {
        option = (<input type="text" onChange={(event) => props.fileSelectorText(event)} placeholder="Enter Image Url">
        </input>)
    }

    if (user[0].user_type === 'user') {
        hicon = <FontAwesome
            className="super-crazy-colors"
            name="heart"
            size="2x"
            style={{ position: "relative", bottom: "200px", color: color }}
            onClick={() => props.iconHeart.bind(this, props.vacation.id, props.index, props.vacation)()}
        />

    } else if (user[0].user_type === 'admin') {
        del = <button type="button" onClick={() => props.deleteFn(props.vacation.id)} className="btn btn-info mt-1">Delete Vacation</button>
        popUp = <Popup trigger={<button className="btn btn-danger">Update Vacation</button>}
            modal
            closeOnDocumentClick position="right center">
            <div className="col-6">

                <form className="editVac">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Trip Destination</label>
                        <input onChange={(event) => props.descriptionChange(event)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={props.vacation.description} />
                    </div>

                    <button type="button" className="btn btn-primary mt-3" onClick={() => props.showOptions(1)}>Add Image Locally</button>
                    <br />
                    <button type="button" className="btn btn-primary mt-3" onClick={() => props.showOptions(2)}>Add Image From Web</button>

                    <div className="row m-2">
                        {option}
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Vacation Cost</label>
                        <input onChange={(event) => props.priceChange(event)} type="number" className="form-control" id="exampleInputPassword1" placeholder={props.vacation.price} />
                    </div>

                    <div className="mt-3">
                        <h5>
                            Departure:
                                </h5>
                        <DatePicker
                            todayButton="Today"
                            dateFormat="yyyy-MM-dd"
                            onChange={props.departChange}
                            placeholderText={props.vacation.departure.split('T')[0]}
                        />
                    </div>

                    <div className="mt-3">
                        <h5>
                            Return:
                                </h5>
                        <DatePicker
                            todayButton="Today"
                            dateFormat="yyyy-MM-dd"
                            onChange={props.arrivalChange}
                            placeholderText={props.vacation.returnDate.split('T')[0]}
                        />
                    </div>

                    <button type="button" className="btn btn-primary mt-3" onClick={() => props.updateFn(props.vacation.id)}>Update Vacation</button>

                </form>
            </div>

        </Popup>
    }

    return <div className="col-4">
        <div className="card p-1 m-3">
            <img class="card-img-top" src={Imgsrc} alt="Card image cap" style={{ height: '210px' }} />
            <div id={props.vacation.description}>
                {hicon}
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.vacation.description}</h5>
                <p className="card-text"><strong>Price : {props.vacation.price} ₪</strong></p>
                <p className="card-text"><strong>Departure Date: {props.vacation.departure.split('T')[0]}</strong></p>
                <p className="card-text"><strong>Return Date : {props.vacation.returnDate.split('T')[0]}</strong></p>
                {del}
            </div>
            <div className="row" style={{ position: "relative", left: "35px", bottom: "10px" }}>
                {popUp}
            </div>
        </div>
    </div>
}

export default Card;