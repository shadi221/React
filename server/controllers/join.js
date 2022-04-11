
const con = require('../utils/databse');


exports.connectVacationToUser = async (req, res, next) => {
    let user_id = req.query.user_id;
    let result = await getVacationByUser(user_id);
    res.send(result)
}

getVacationByUser = async (user_id) => {
    try {
        let ans = await con.execute(`
                                    SELECT vacations.description AS description, 
                                    vacations.img AS img,
                                    vacations.price AS price,
                                    users.first_name AS UserName,
                                    users.last_name AS UserLastName,
                                    vacation_users.vacation_id AS VacationID,
                                    vacation_users.user_id AS UserId,
                                    vacations.departure AS departure,
                                    vacations.returnDate AS returnDate
                                    FROM vacation_users 
                                    JOIN vacations ON vacations.id = vacation_users.vacation_id
                                    JOIN users ON users.id = vacation_users.user_id WHERE users.id = ${user_id}
                                    `)
        return ans[0]
    } catch (err) {
        return err.message;
    }
}


