/*
    Users routes /Auth
    host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator')
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/vaidate-jwt');
const { validateFileds } = require('../middlewares/validate');
const router = Router();

router.post(
        '/new',
        [//middlewares
            check('name', 'The name is mandatory').not().isEmpty(),
            check('email', 'The email is mandatory').isEmail(),
            check('password', 'The password is mandatory nd more than 6 characters').isLength({min:6}),
            validateFileds
        ], 
        createUser)

router.post(
        '/',
        [//middlewares
        check('email', 'The email is mandatory').isEmail(),
        check('password', 'The password is mandatory nd more than 6 characters').isLength({min:6}),
        validateFileds
        ],
        loginUser )

router.get('/renew',validateJWT, revalidateToken)

module.exports = router;