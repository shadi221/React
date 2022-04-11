const con = require('../utils/databse');
const http = require('http')
const socketIO = require('socket.io')
const express = require('express');
const app = express();


const server = http.createServer(app)

const io = socketIO(server)

exports.addVacation = async (req, res, next) => {

    let description = req.body.description
    let files = req.files[0].filename;
    let price = req.body.price
    let departure = req.body.departure
    let returnDate = req.body.returnDate


    let inserVac = await saveVac(description, files, price, departure, returnDate);

    let SelectALLVac = await SelectALLVacations();

    for (let i = 0; i < SelectALLVac.length; i++) {
        SelectALLVac[i]['following'] = false
    }

    res.send(SelectALLVac)
}

exports.addVacationTextImg = async (req, res, next) => {

    let description = req.query.description
    let files = req.query.img;
    let price = req.query.price
    let departure = req.query.departure
    let returnDate = req.query.returnDate


    let inserVac = await saveVac(description, files, price, departure, returnDate);

    let SelectALLVac = await SelectALLVacations();

    for (let i = 0; i < SelectALLVac.length; i++) {
        SelectALLVac[i]['following'] = false
    }

    res.send(SelectALLVac)
}

exports.getVacs = async (req, res, next) => {
    let SelectALLVac = await SelectALLVacations()

    for (let i = 0; i < SelectALLVac.length; i++) {
        SelectALLVac[i]['following'] = false
    }

    res.send(SelectALLVac)
}



saveVac = async (description, files, price, departure, returnDate) => {
    try {
        return await con.execute(`INSERT INTO vacations (id, description, img, price, departure, returnDate, number_of_followers) VALUES (NULL, '${description}', '${files}', '${price}', '${departure}', '${returnDate}', '0')`)
    } catch (err) {
        return err.message;
    }
}

SelectALLVacations = async () => {
    try {
        let allVac = await con.execute("SELECT * FROM vacations")
        return allVac[0]
    } catch (err) {
        return err.message;
    }
}

exports.deleteSelectedVacation = async (req, res, next) => {
    let id = req.query.id;
    deleteVac = await deleteVacation(id)
    SelectALLVac = await SelectALLVacations()
    for (let i = 0; i < SelectALLVac.length; i++) {
        SelectALLVac[i]['following'] = false
    }
    res.send(SelectALLVac)
}

deleteVacation = async (id) => {
    try {
        let vacation = await con.execute(`DELETE FROM vacations WHERE vacations.id = ${id}`)
        return vacation[0]
    } catch (err) {
        return err.message;
    }
}

exports.updateFollowers = async (req, res, next) => {
    let num = req.query.num
    num++
    let id = req.query.id;

    updateVac = await updateVacation(num, id)
    SelectALLVac = await SelectALLVacations()

    for (let i = 0; i < SelectALLVac.length; i++) {
        SelectALLVac[i]['following'] = false
    }

    res.send(SelectALLVac)
}

exports.updateFollowersMinus = async (req, res, next) => {
    let num = req.query.num
    num--
    let id = req.query.id;

    updateVac = await updateVacation(num, id)
    SelectALLVac = await SelectALLVacations()

    for (let i = 0; i < SelectALLVac.length; i++) {
        SelectALLVac[i]['following'] = false
    }

    res.send(SelectALLVac)
}


updateVacation = async (num, id) => {
    try {
        let number = await con.execute(`UPDATE vacations SET number_of_followers = '${num}' WHERE vacations.id = ${id};`)
        return number[0]
    } catch (err) {
        return err.message;
    }
}

exports.updateVacDetail = async (req, res, next) => {

    let description = req.query.description
    let img = req.query.img
    let price = req.query.price
    let departure = req.query.departure
    let returnDate = req.query.returnDate
    let id = req.query.id;

    updateVacation = await updateVacationDetails(description, img, price, departure, returnDate, id)
    SelectALLVac = await SelectALLVacations()

    for (let i = 0; i < SelectALLVac.length; i++) {
        SelectALLVac[i]['following'] = false
    }

    res.send(SelectALLVac)
}

updateVacationDetails = async (description, img, price, departure, returnDate, id) => {
    try {
        let number = await con.execute(`UPDATE vacations SET description = '${description}', img = '${img}', price = '${price}', departure = '${departure}', returnDate = '${returnDate}' WHERE vacations.id = ${id}`)
        return number[0]
    } catch (err) {
        return err.message;
    }
}

exports.addToUserVacation = async (req, res, next) => {
    let user_id = req.query.user_id
    let id = req.query.id;

    connect = await addUserByVacation(user_id, id)
    vacUsers = await SelectALLUserVacs()
    res.send(vacUsers)
}

addUserByVacation = async (user_id, vacation_id) => {
    try {
        let number = await con.execute(`INSERT INTO vacation_users (id, user_id, vacation_id) VALUES (NULL, '${user_id}', '${vacation_id}')`)
        return number[0]
    } catch (err) {
        return err.message;
    }
}

SelectALLUserVacs = async () => {
    try {
        let allUserVacs = await con.execute("SELECT * FROM vacation_users")
        return allUserVacs[0]
    } catch (err) {
        return err.message;
    }
}

exports.deleteVacUser = async (req, res, next) => {
    let user_id = req.query.user_id
    let id = req.query.id;

    del = await deleteUserByVacation(user_id, id)
    vacUsers = await SelectALLUserVacs()
    res.send(vacUsers)
}

deleteUserByVacation = async (user_id, vacation_id) => {
    try {
        let de = await con.execute(`DELETE FROM vacation_users WHERE vacation_users.user_id = ${user_id} AND vacation_users.vacation_id = ${vacation_id} `)
        return de[0]
    } catch (err) {
        return err.message;
    }
}