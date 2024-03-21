const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('mobile home page')
})







module.exports=router