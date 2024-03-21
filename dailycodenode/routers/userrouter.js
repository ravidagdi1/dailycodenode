
const express=require('express')//module
const router=express.Router()//module
const batTable=require('../models/bats.js')
const bowlerTable=require('../models/bolwer.js')
const homeTable=require('../models/home.js')
const nodemailer=require('nodemailer')
const multer=require('multer')//module
const regTable=require('../models/singup.js')
const homec=require('../controllers/homecontroller.js')
const singupc=require('../controllers/singupcontroller.js')

function handlelogin(req,res,next){
if(req.session.isAuth){
    next()
}else{
    res.redirect('/login')
}
}

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



router.get('/docs',handlelogin,(req,res)=>{
    res.render('docs.ejs')
})

router.get('/contact',(req,res)=>{
    res.render('contacts.ejs')
})
router.get('/test',handlelogin,(req,res)=>{
    res.render('test.ejs')
})
router.get('/hhh',(req,res)=>{
    res.render('hhh.ejs')
})

router.get('/xyz',(req,res)=>{
    res.send('xyz page')
})

router.get('/homedata',handlelogin,async(req,res)=>{
    try{
        const data=await homeTable.find()
        //console.log(data)
        console.log(req.session)
        const tt=req.session.username
    res.render('homedata.ejs',{data,tt})
    }catch(error){
        res.send(error.message)
    }
})

router.get('/',homec.singledata)
router.get('/datadelete/:id',homec.delete)
router.get('/update/:id',homec.databyid)
router.post('/update/:id',homec.update)



    router.get('/sendemail',async(req,res)=>{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "rtestexpress@gmail.com",
              pass: "dblaswalasvyoglx",
            },
          });
          console.log("connected to smtp server")

          await transporter.sendMail({
            from:'rtestexpress@gmail.com', // sender address
            to:'ravidagdi@gmail.com', // list of receivers
            subject:'Hello', // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
          console.log("email sent")
    })


    router.get('/emailform',(req,res)=>{
        res.render('emailform.ejs')
    })
    router.post('/emailform',upload.single('attachment'),async(req,res)=>{
        const filePath=req.file.path
        const{emailto,emailfrom,subject,body}=req.body
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "rtestexpress@gmail.com",
              pass: process.env.EMAIL_PASS,
            },
          });
          console.log("connected to smtp server")

          await transporter.sendMail({
            from:'rtestexpress@gmail.com', // sender address
            to:emailto, // list of receivers
            subject:subject, // Subject line
            text:body, // plain text body
           // html: "<b>Hello world?</b>", // html body
           attachments:[{path:filePath}]
          });
          console.log("email sent")
    })

    router.get('/login',(req,res)=>{
        res.render('login.ejs')
    })

    router.post('/login',singupc.logincheck)


    router.get('/createacount',(req,res)=>{
        res.render('createaccount.ejs')
    })

    router.post('/createacount',async(req,res)=>{
    const{email,us,pass}=req.body
    const usercheck=await regTable.findOne({username:us})
    console.log(usercheck)
    if(usercheck==null){
    const newRecord=new regTable({email:email,username:us,password:pass})
    newRecord.save()
    }else{
        res.send("username already taken")
    }
    })


router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})








module.exports=router