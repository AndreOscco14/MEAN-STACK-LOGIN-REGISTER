const express = require('express')
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


// const port = 4000
const app = express()


//CONEXION A LA BASE DE DATOS
dbConnection();

//Directorio publico 
app.use(express.static('public'))

//CORS
app.use( cors() );

//Lectura y parseo del body
app.use(express.json() );

//RUTAS
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en puerto:  ${process.env.PORT}`)
})

