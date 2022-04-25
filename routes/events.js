const {Router} = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/vaidate-jwt');
const { validateFileds } = require('../middlewares/validate');

const router = Router();


router.use(validateJWT)


router.get('/', getEvents);

router.post('/',[
    check('title','The title is mandatory').not().isEmpty(),
    check('start','The start is mandatory').custom(isDate),
    check('end','The end is mandatory').custom(isDate),
    validateFileds
], createEvent);

router.put('/:id',[
    check('title','The title is mandatory').not().isEmpty(),
    check('start','The start is mandatory').custom(isDate),
    check('end','The end is mandatory').custom(isDate),
    validateFileds
], updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;