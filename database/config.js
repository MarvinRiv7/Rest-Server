const mongoose = require('mongoose')


const dbConnection = async () => {

    try {
       await mongoose.connect(process.env.MONGODB_CNN)
       console.log('DB ONLINE')
    } catch (error) {
        console.log(error)
        throw new Error('Error al levantar la DB')
    }
}


module.exports = {
    dbConnection
}