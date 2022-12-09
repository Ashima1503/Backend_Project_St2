var mysql=require('mysql')
var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"signdetails"})
conn.connect(function(errror)
{
    if (errror) throw errror;
    conn.query("select * from data",function(errror,result)
    {
        console.log(result)
    })
})