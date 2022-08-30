const mongoose=require('mongoose')
const express=require('express')
const bodyp=require('body-parser')

const app=express()

app.use(express.static('public'))
app.use(bodyp.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://localhost:27017/majorproject",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
var db=mongoose.connection;
db.on('error',()=>console.log("error to connected to database"))
db.once('open',()=>console.log("connected to database"))

app.post('/form',(req,res)=>{
    var stdname=req.body.sname;
    var course=req.body.course;
    var age=req.body.age;
    var email=req.body.email;

    var data={
        "studentname":stdname,
        "course":course,
        "age":age,
        "email":email
    }
    db.collection('collections').insertOne(data,(err,collection)=>{
        if(err){
            console.log("error")
        }else{
            console.log("recorded inserted successfully")
        }
        
    });
    return res.redirect('sign_up.html')
})

app.get('/',(req,res)=>{
    return res.redirect('form.html')
}).listen(8080)

console.log('listening on port 8080')