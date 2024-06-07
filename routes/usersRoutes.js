const express = require('express');
const router = express.Router();
const User = require("../models/usersModel");
const auth = require("../middleware/auth");


// Just for debugg, gets all user info
router.get('/',  async function (req, res, next) {
    try {
        console.log("Get all users");
        let result =  await User.getAll();
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get information about the authenticated user (only the names)
router.get('/auth',auth.verify,  async function (req, res, next) {
    try {
        console.log("Get authenticated user profile");
        let user = req.user;
        // No need to send the id, is just for internal use or admins (pass already hidden)
        user.id = undefined;
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.delete('/auth', auth.verify,
    async function (req, res, next) {
    try {
        console.log("Logout user ");
        auth.destroy(req);
        res.status(200).send({ msg: "User logged out!" });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        console.log("Register user ");
        console.log(req.body);
        let user = new User();
        Object.assign(user,req.body);
        let result = await user.register();
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.post('/auth', async function (req, res, next) {
    try {
        console.log("Login user ");
        let user = new User();
        Object.assign(user,req.body);
        let result = await user.login();
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        // result has the user with the database id
        auth.save(req,result.result.id);
        
        res.status(200).send({msg: "Successful Login!"});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;