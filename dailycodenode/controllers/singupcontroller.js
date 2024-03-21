const regTable=require('../models/singup.js')


exports.logincheck=async(req,res)=>{
    const{us,pass}=req.body
   const userCheck= await regTable.findOne({username:us})
   if(userCheck!=null){
    if(userCheck.password==pass ){
        req.session.isAuth=true
        req.session.username=us
    res.redirect('/homedata')
    }else{
        res.send("wrong password")
    }
   }else{
    res.send("username is not vaild")
   }
}