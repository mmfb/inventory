
const User = require("../models/usersModel");

module.exports.save = function (req, identification) {
    req.session.id = identification;
    req.session.timestamp = Math.floor(Date.now() / (req.session.maxAge / 10));
}

module.exports.destroy = function (req) {
     // this will delete everything in the cookie
    req.session = null;
}

module.exports.verify = async function (req, res, next) {
    try {
        let id = req.session.id;
        if (!id) {
            res.status(401).send({ msg: "Please log in." });
            return;
        }
        let result =  await User.getById(id);
        // User should exists, if not, destroy session and ask for login
        if (result.status != 200) {
            req.session = null;
            res.status(401).send({ msg: "Please log in." });
            return;
        }
        req.user = result.result;
        // Each time it changes the cookie expiration will be refreshed if enough time passed
        // Smaller number in divisor means we refresh more times, we are using 1/10 of the expiration time 
        req.session.timestamp = Math.floor(Date.now() / (req.session.maxAge / 10));
        // passing  to next rule
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}




