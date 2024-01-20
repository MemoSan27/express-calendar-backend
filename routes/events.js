const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/event.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


router.use(validarJWT);

//Obtener eventos
router.get(
    '/',    
    getEventos);

//crear eventos
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        
        validarCampos
    ],
    crearEvento);

//actualizar
router.put('/:id', actualizarEvento);

//borrar
router.delete('/:id', eliminarEvento);

module.exports = router;