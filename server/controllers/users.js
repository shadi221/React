const con = require('../utils/databse');


exports.addUsers = async (req, res, next) => {
    let user_type = req.query.user_type;
    let first_name = req.query.first_name;
    let last_name = req.query.last_name;
    let mail = req.query.mail;
    let password = req.query.password;

    let inserUser = await saveUser(user_type, first_name, last_name, mail, password);
    let SelectALLUsers = await SelectALL();
    res.send(SelectALLUsers)
}


saveUser = async (user_type, first_name, last_name, mail, password) => {
    try {
        return await con.execute(`INSERT INTO users (id, user_type, first_name, last_name, mail, password) VALUES (NULL, '${user_type}', '${first_name}', '${last_name}', '${mail}', '${password}')`)
    } catch (err) {
        return err.message;
    }
}

SelectALL = async () => {
    try {
        let allUser = await con.execute("SELECT * FROM users")
        return allUser[0]
    } catch (err) {
        return err.message;
    }
}

exports.getUsers = async (req, res, next) => {
    let allUsers = await SelectALLUsers()
    res.send(allUsers)
}

SelectALLUsers = async () => {
    try {
        let allUser = await con.execute("SELECT * FROM users WHERE users.user_type = 'user'")
        return allUser[0]
    } catch (err) {
        return err.message;
    }
}

exports.checkUser = async (req, res, next) => {
    mail = req.query.mail
    password = req.query.password
    checkMail = await userCheck(mail, password)
    res.send(checkMail)
}

userCheck = async (mail, password) => {
    try {
        let user = await con.execute(`SELECT * FROM users WHERE mail LIKE '${mail}' AND password LIKE '${password}'`)
        return user[0]
    } catch (err) {
        return err.message;
    }
}

exports.checUserMail = async (req, res, next) => {
    mail = req.query.mail
    checkMail = await MailCheck(mail)
    res.send(checkMail)
}

MailCheck = async (mail) => {
    try {
        let user = await con.execute(`SELECT * FROM users WHERE mail LIKE '${mail}'`)
        return user[0]
    } catch (err) {
        return err.message;
    }
}


exports.deleteSelectedUser = async (req, res, next) => {
    let id = req.query.id;
    deleteUser = await deleteUser(id)
    users = await SelectALLUsers()
    res.send(users)
}

deleteUser = async (id) => {
    try {
        let user = await con.execute(`DELETE FROM users WHERE users.id = ${id}`)
        return user[0]
    } catch (err) {
        return err.message;
    }
}







