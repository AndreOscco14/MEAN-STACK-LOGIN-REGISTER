const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, RenovarUsuarioToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

//Crear un nuevo usuario
router.post('/new',[
                    check('name', 'El nombre es obligatorio').not().isEmpty(),
                    check('email', 'El email es obligatorio').isEmail(),
                    check('password', 'La contraseña es obligatoria').isLength({min: 6})
                    ],crearUsuario );
// nombre: .not().isEmpty()

//Login de usuario
router.post('/', [check('email', 'El email es obligatorio').isEmail(),
                  check('password', 'La contraseña es obligatoria').isStrongPassword().isLength({min:6})
                ], loginUsuario);

//Validar y revalidar TOKEN
router.get('/renew', validarJWT, RenovarUsuarioToken);






module.exports = router;