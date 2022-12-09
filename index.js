var mysql=require('mysql')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs')

app.get("/",function(request,response){
     response.sendFile(__dirname+"/form.html")
})
app.post("/save",function(request,response)
{
    var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"signdetails"})

   var name= request.body.name;
   var fname= request.body.fname;
   var pwd= request.body.pwd;
   var gender= request.body.gender;
   var phno= request.body.phno;

   conn.connect(function(errror){
    var sql ="insert into data(name,fname,pwd,gender,phno) values('"+name+"','"+fname+"','"+pwd+"','"+gender+"','"+phno+"')";
    conn.query(sql,function(errror){
        
        response.redirect("/login")
     
    })


   })
   
})
app.get("/show",function(request,response){
    var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"signdetails"})

    conn.connect(function(errror)
    {
        conn.query("select * from data",function(errror,result)
        {
            console.log(result);
            response.render("show",{result:result})
        })
    })
})
app.get("/login",function(request,response){
        
    response.render("login")
})
// app.post("/login",function(request,response){
//     response.redirect("/home")
// })
app.get("/login",function(request,response){
    var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"signdetails"})

    conn.connect(function(errror)
    {
        var sql="select * from data where name='{$name}' AND pwd='{$pwd}'";
        conn.query(sql,[request.query.name],function(errror,result)
        {
            response.redirect("/home")
        })
    })
})
app.post("/login",function(request,response){
    response.redirect("/home")
})
app.get("/home",function(request,response){
        
    response.render("home")
})
// app.get("/profile",function(request,response){
        
//     response.render("profile")
// })
app.get("/profile",function(request,response){
    var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"signdetails"})

    conn.connect(function(errror)
    {
        var sql="select * from data where name='${name}'";
        conn.query(sql,[request.query.name],function(errror,result)
        {
            console.log(result);
            response.render("profile",{result:result})            
        })
    })
})

app.get("/changepwd",function(request,response){
        
    response.render("changepwd")
})
app.post("/changepwd",function(request,response){
    response.redirect("/home")
})
app.get("/logout",function(request,response){
        
    response.render("logout")
})
app.post("/logout",function(request,response){
    response.redirect("/logout")
})
// app.get("/delete",function(request,response){
//     var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"signdetails"})

//     conn.connect(function(errror)
//     {
//         var sql="delete  from data where id=?";
//         conn.query(sql,[request.query.id],function(errror,result)
//         {
//             response.redirect("/show")
            
//         })
//     })
// })

app.get("/update",function(request,response){
    var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"signdetails"})

    conn.connect(function(errror)
    {
        conn.query("select * from data where pwd=?",[request.query.name],function(errror,result)
        {
            response.render("update",{result:result})
        })
    })
})


app.post("/update_data",function(request,response){
    var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"signdetails"})

    conn.connect(function(errror)
    {
        var id= request.body.id;
        var name= request.body.name;
        var fname= request.body.fname;
        var course= request.body.course;
        var marks= request.body.marks;

        var sql="update data set pwd=? where pwd=?"
        conn.query(sql,[name,fname,course,marks,id],function(errror,result)
        {
            response.redirect("/login")
        })
    })
})

app.listen(4004, ()=>{
    console.log("Server running on port 4004");
});
