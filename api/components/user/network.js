const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const errors = require('../../../network/errors');

const router = express.Router();


router.get('/',list);
router.get('/:id',get);
router.post('/',upsert);
router.put('/',secure('update'),upsert);
router.delete('/:id',remove)

async function list(req,res,next){
    try {
        const list = await controller.list()
        response.success(req, res, list, 200)    
    } catch (e) {
        next(e);
    }
}

async function get(req,res,next){
    try {
        const user = await controller.get(req.params.id)
        response.success(req, res, user, 200)    
    } catch (e) {
        next(e);
    }          
}

async function upsert(req,res,next){
    try {
        const user = await controller.upsert(req.body)
        response.success(req, res, user, 200)    
    } catch (e) {
        next(e);
    }
}

async function remove(req,res,next){
    try {
        const user = await controller.remove(req.params.id)
        response.success(req, res, user, 200)    
    } catch (e) {
        next(e);
    }
}

module.exports = router;