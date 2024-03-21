const mongoose=require('mongoose')//module


const homeSchema=mongoose.Schema({
    title:String,
    desc:String,
    img:String
})

module.exports=mongoose.model('home',homeSchema)