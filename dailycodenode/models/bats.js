const mongoose=require('mongoose')//module

const batsSchema=mongoose.Schema({
    name:String,
    fours:Number,
    sixes:Number,
    tRun:Number
})


module.exports=mongoose.model('batrr',batsSchema)