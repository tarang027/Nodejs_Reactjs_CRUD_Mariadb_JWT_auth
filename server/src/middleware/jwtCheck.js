const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
    try {

        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403).send({ status: false, message: 'Invalid token' });
            }
            req.decoded_token = user;
            next();
        })
    }
    catch (err) {
        console.log(err);
        return res.send({ status: false, message: 'unvalid token' })
    }
}