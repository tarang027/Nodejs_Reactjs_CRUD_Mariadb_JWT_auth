const { mysqlConnection } = require('../config/mysqlConn');
const config = require('../config')

const getUserInfo = (params) => {
    return new Promise((resolve, reject) => {
        let query;
        let queryParams = [];

        if (params.user_id) {
            query = 'SELECT * FROM tbl_user WHERE user_id = ?';
            queryParams = [params.user_id]
        }
        else {
            query = 'SELECT * FROM tbl_user WHERE user_email = ?';
            queryParams = [params.user_email]
        }
        mysqlConnection.query(query, queryParams, (err, rows, fields) => {
            console.log("err ", err)
            if (!err) {
                if (rows.length > 0) {
                    rows.map(ele=>{
                        ele.profile_pic_path = config.createServerProfilePicURL( ele.profile_pic ) 
                    })
                    resolve({ status: true, data: rows[0] })
                }
                else {
                    resolve({ status: false, message: 'No user found.' })
                }
            }
            else {
                reject({ status: false, message: 'No user' })
            }
        })
    })
}

const checkIfUserEmailExists = (params) => {
    return new Promise((resolve, reject) => {
        let query;
        let queryParams = [];

        query = 'SELECT COUNT(user_id) as total_records FROM tbl_user WHERE user_email = ?';
        queryParams = [params.user_email];

        mysqlConnection.query(query, queryParams, (err, rows, fields) => {
            console.log("err ", err)
            if (!err) {
                resolve(rows[0].total_records > 0)
            }
            else {
                reject({ status: false, message: 'No user' })
            }
        })
    })
}



const registerUser = (params) => {
    return new Promise((resolve, reject) => {

        let query = 'INSERT INTO tbl_user (user_name, user_password, user_email, profile_pic ) VALUES (?,?,?,?)'

        mysqlConnection.query(query, [params.user_name, params.user_password, params.user_email, params.profile_pic], (err, rows, fields) => {
            console.log("err ", err)
            if (!err) {
                resolve({ status: true, message: 'user registered successfully' })
            }
            else {
                reject({ status: false, message: 'user registered failed' })
            }
        })
    })
}


module.exports = {
    getUserInfo,
    registerUser,
    checkIfUserEmailExists,
}