const { Router } = require('express');
const { getCountries, getCountryById, createActivity, getActivities} = require('../controllers/Countries')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/countries', getCountries)

router.get('/countries/:id', getCountryById)

router.post('/activities', createActivity)

router.get('/activity', getActivities)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;











/* const {Router} = require ('express');
const rute = require('../routes/countries');
const ruteA = require('../routes/activities');
const ruteB = require('../routes/delete')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', rute);
//va a countries
router.use('/activity', ruteA);
//va a activities
router.use('/delete', ruteB)
//eliminar activitities
module.exports = router; */