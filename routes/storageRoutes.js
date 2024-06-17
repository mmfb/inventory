const express = require('express');
const router = express.Router();
const Storage = require("../models/storageModel");
const auth = require("../middleware/auth");

router.get('/auth',auth.verify,async function (req, res, next) {
    try {
        console.log("Get authenticated user storage list");
        let user = req.user;
        let result = await Storage.getByUserId(user.id);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id',async function (req, res, next) {
    try {
        console.log("Get user storage list");
        let result = await Storage.getByUserId(req.params.id);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.get('/',async function (req, res, next) {
    try {
        console.log("Get user storage list");
        let result = await Storage.getByUserId(req.query.id);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});





module.exports = router;