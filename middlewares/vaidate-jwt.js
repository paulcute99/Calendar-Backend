const {response} = require('express');
const jwt  = require('jsonwebtoken');

const validateJWT = (req,res=response,next) =>{

    //x-token headers
    const token = req.header('x-token')

   if(!token){
       return res.status(401).json({
        ok:false,
        msg: 'No token'
       })
   }

   try {

    const {uid,name} = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    )

    req.uid = uid;
    req.name = name;
       
   } catch (error) {
       console.log(error)
       return res.status(401).json({
        ok:false,
        msg: 'The token is not valid'
       })   
   }

    next();

}

module.exports = {
    validateJWT
}