const homeTable=require('../models/home')


exports.singledata=async(req,res)=>{
    try{
    const singleData= await homeTable.findOne()
    
    res.render('home.ejs',{singleData})
    }catch(error){
        res.send(error.message)
    }
   
}


exports.delete=async(req,res)=>{
    const uid=req.params.id
    await homeTable.findByIdAndDelete(uid)
    res.redirect('/homedata')
    
}

exports.databyid=async(req,res)=>{
    const abc=req.params.id
    const data= await homeTable.findById(abc)
    //console.log(data)
    res.render('updateform.ejs',{data})
    
    }

exports.update=async(req,res)=>{
    const id=req.params.id
   const{title,Description}=req.body
   await homeTable.findByIdAndUpdate(id,{title:title,desc:Description})
   res.redirect('/homedata')
    }

