const mongoose=require('mongoose')

let regSchema=mongoose.Schema({
    email:String,
    username:String,
    password:String
})

module.exports=mongoose.model('reg',regSchema)