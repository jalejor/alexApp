const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.post('/login',login);

async function login(req,res,next){
    try {
        let token = await controller.login(req.body.username, req.body.password);
        response.success(req,res,token,200);
    } catch (e) {
        next(e);
    }   
}

module.exports = router;