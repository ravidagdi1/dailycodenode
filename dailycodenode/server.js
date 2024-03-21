const http=require('http')// module call
const fs=require('fs')//module
const homefile=fs.readFileSync('./home.html')
const docfile=fs.readFileSync('./docs.html')
const errorfile=fs.readFileSync('./error.html')
const img1=fs.readFileSync('./3.png')
const img2=fs.readFileSync('./4.png')
const stylefile=fs.readFileSync('./style.css')

//console.log(homefile)


const server=http.createServer((req,res)=>{
if(req.url==='/'){
    res.write(homefile)
    res.end()
}else if(req.url==='/docs'){
    res.write(docfile)
res.end()
}else if(req.url==='/contact'){
    res.end('Welcome to contact page')
}else if(req.url==='/3.png'){
    res.write(img1)
    res.end()
}else if(req.url==='/4.png'){
    res.write(img2)
    res.end()
}else if(req.url==='/style.css'){
    res.write(stylefile)
    res.end()
}
else{
    res.write(errorfile)
    res.end()
}

})//call back function

server.listen(8000)


