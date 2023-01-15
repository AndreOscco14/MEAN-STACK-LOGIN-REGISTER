const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
// ================================================================================

const crearUsuario = async(req, res = response) => {
    const{email, name, password} = req.body;

    try {
    // Verificar el EMAIL - QUE SEA UNICO
        const usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

    // CREAR USUARIO CON EL MODELO
      const dbUser = new Usuario(req.body);

    // HASHEAR LA CONTRASEÑA (ENCRIPTACION DE LAS CONTRASEÑAS)
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

    //GENERAR EL JWT
        const token = await generarJWT( dbUser.id, name);

    //CREAR USUARIO BBDD
        dbUser.save();

    //GENERAR RESPUESTA EXITOSA
        return res.status(201).json({
            ok: true, 
            uid: dbUser.id,
            name,
            token
        });

    } catch (error) {

        console.log(error);

        return res.status.json({
            ok: false,
            msg: 'Por favor hable con el admin'
           }) 
    }


     
    }

// ================================================================================

const loginUsuario = async(req, res= response) => {


    const{email, password} = req.body;

    try {
        
        const dbUser = await Usuario.findOne({email});

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // CONFIRMAR SI EL PASSWORD ES CORRECTO (HACE MATCH)
        const validPassword = bcrypt.compareSync ( password, dbUser.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no es valido'
            });
        }

        //GENERAR EL JWT
        const token = await generarJWT( dbUser.id, dbUser.name);

        //Respuesta del servicio

        return res.json({
            ok:true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    }

// ================================================================================

const RenovarUsuarioToken = async(req, res = response) => { 

    const {uid, name} = req

    const token = await generarJWT(uid,name);

    return res.json({ 
                 ok: true,
                 uid, 
                 name
                })
 }

// ================================================================================

module.exports={
    crearUsuario,
    loginUsuario,
    RenovarUsuarioToken
}
