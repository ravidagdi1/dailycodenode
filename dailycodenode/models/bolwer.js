const mongoose=require('mongoose')


const bolwerSchema=mongoose.Schema({
    name:String,
    wickets:Number,
    overs:Number
})

module.exports=mongoose.model('bolwer',bolwerSchema)