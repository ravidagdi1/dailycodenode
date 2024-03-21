const express=require('express')//function
const app=express()//module
app.use(express.urlencoded({extended:false}))
const mongoose=require('mongoose')//module
const testRouter=require('./routers/userrouter.js')
const adminRouter=require('./routers/adminrouter.js')
const mobileRouter=require('./routers/mobile.js')
mongoose.connect('mongodb://127.0.0.1:27017/730knode')
const session=require('express-session')
require('dotenv').config()



app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1*1000*60*60*24*365}
}))
app.use(testRouter)
app.use('/admin',adminRouter)
app.use('/mobile',mobileRouter)
app.use(express.static('public'))
app.set('view engine','ejs')


app.listen(5000)