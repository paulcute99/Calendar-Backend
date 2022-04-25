const {response} = require('express');
const { validationResult } = require('express-validator');

const validateFileds = (req,res=response,next) =>{

    //Error managment
    const errors = validationResult(req);
    

    if(!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {validateFileds}