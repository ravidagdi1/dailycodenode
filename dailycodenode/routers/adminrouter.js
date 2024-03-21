const express=require('express')
const router=express.Router()
const homeTable=require('../models/home.js')
const multer=require('multer')//module

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/profile')
    },
   filename:function(req,file,cb){
    cb(null,Date.now()+file.originalname)
   } 
})//method

let upload=multer({
    storage:storage,
    limits:{fileSize:4*1024*1024}
})

router.get('/',(req,res)=>{
    res.send('admin home page')
})

router.get('/form',(req,res)=>{
    res.render('form.ejs')
})

router.post('/form',upload.single('img'),(req,res)=>{
    const filename=req.file.filename
    console.log(req.body)
    const{title,Description}=req.body
    const newRecord=new homeTable({ title:title,desc:Description,img:filename})
    newRecord.save()
})







module.exports=router