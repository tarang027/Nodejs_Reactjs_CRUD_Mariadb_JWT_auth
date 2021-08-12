const userModel = require('../model/user.model');
const config = require('../config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const getUserInfo = async (req, res, next) => {
    try {
        console.log(req.params);
        // if (!req.body.user_email) {
        //     return res.send({ status: false, message: 'email is required' })
        // }
        // else if (!config.emailValidRegex.test(req.body.user_email)) {
        //     return res.send({ status: false, message: 'email invalid' })
        // }
        // else {
        // }
        let response = await userModel.getUserInfo({ user_email: req.decoded_token.user_email });
        return res.send(response)
    }
    catch (err) {
        console.log(err);
        return res.send({ status: false, message: 'something went wrong' })
    }
}

const loginUser = async (req, res, next) => {
    try {

        let { user_email, user_password } = req.body;

        let msg = [];

        if (!user_email) {
            msg.push('email id is required')
        } else if (!config.emailValidRegex.test(user_email)) {
            msg.push('email id is invalid')
        }

        if (!user_password) {
            msg.push('password is required')
        }

        if (msg.length > 0) {
            return res.send({ status: false, message: msg.join(', ') });
        }
        else {
            let response = await userModel.getUserInfo({ user_email });
            response = JSON.parse( JSON.stringify( response ) ) 
            if( response.status ){
                bcrypt.compare(req.body.user_password, response.data.user_password ).then(function (result) {
                    if (result) {
                        const access_token = jwt.sign({user_email} , config.jwtSecret, { expiresIn: '20d' });
                        return res.send({ status: true, message: 'login successfully', access_token });
                    }
                    else {
                        return res.send({ status: false, message: 'invalid email or password' });
                    }
                }).catch(err=> console.log("err ", err))
            }
            else{
                return res.send(response);
            }
        }
    }
    catch (err) {
        console.log("err ",err);
        return res.send({ status: false, message: 'something went wrong' })
    }
}


const registerUser = async (req, res, next) => {
    try {

        let { user_email, user_name, user_password } = req.body;

        let msg = [];

        if (!user_email) {
            msg.push('email id is required')
        }
        else if (!config.emailValidRegex.test(user_email)) {
            msg.push('email id is invalid')
        }

        if (!user_password) {
            msg.push('password is required')
        }

        if (!user_name) {
            msg.push('username is required')
        }

        if (!req.file) {
            msg.push('profile pic is required.')
        }

        if (msg.length > 0) {
            return res.send({ status: false, message: msg.join(', ') });
        }
        else {

            let checkIfExists = await userModel.checkIfUserEmailExists({ user_email })

            if (checkIfExists) {
                return res.send({ status: false, message: 'email already exists' })
            }
            else {

                let salt = await bcrypt.genSaltSync(config.bcryptHashRound);
                const hashedPassowrd = await bcrypt.hashSync(user_password, salt);

                console.log(" hashedPassowrd", hashedPassowrd)
                let response = await userModel.registerUser({ user_email, user_name, user_password: hashedPassowrd, profile_pic: req.file.filename });

                if (response.status) {
                    const access_token = jwt.sign({ user_email: response.user_email }, config.jwtSecret, { expiresIn: '1h' });
                    return res.send({ ...response, access_token });
                }
                else {
                    return res.send(response)
                }

            }

        }
    }
    catch (err) {
        console.log(err);
        return res.send({ status: false, message: 'something went wrong' })
    }
}


module.exports = {
    getUserInfo,
    loginUser,
    registerUser,
}