const jwt = require("jsonwebtoken");
require('dotenv').config()

function isAuth(req, res, next) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const bearerToken = authHeader.split(" ")[1]; //Bearer <jwt_token>
    console.log(bearerToken);
    if (!bearerToken) {
        req.isAuth = false;
        return next();
    }
    try {
        const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
        req.user = decoded;
        req.isAuth = true;
        next();
    } catch (ex) {
        console.error(ex);
        req.isAuth = false;
        next();
    }
}

module.exports = isAuth;
