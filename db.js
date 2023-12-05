const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect('mongodb+srv://anthoaboua:79109537a@cluster0.49ar7m0.mongodb.net/tripleacars',{useUnifiedTopology:true,useNewUrlParser:true})

    const connection=mongoose.connection

    connection.on('connected',()=>{
        console.log('Mongo DB Connection Successful')

    })

connection.on('error',()=>{
    console.log('Mongo DB Connection Error')


})


}
connectDB()
module.exports=mongoose
