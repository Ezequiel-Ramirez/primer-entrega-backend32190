const mongoose = require('mongoose');

const URL = "mongodb+srv://ezequiel:ezequiel@backendcodercurso.y3plhcv.mongodb.net/ecommerce?retryWrites=true&w=majority"

const connect = async () => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log('Error al conectar a la base de datos')
    }
}

module.exports = { connect }
