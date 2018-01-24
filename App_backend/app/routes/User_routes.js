
module.exports=function(app,db){

app.get('/get_user',(req,res)=>{

db.query('SELECT * FROM users',(err,row)=>{
    res.send(row) 
})
});

//register
app.post("/api/add_user",function(req,res){
console.log(req)

    var today = new Date();

    var users={
      "first_name":req.body.first_name,
      "last_name":req.body.last_name,
      "email":req.body.email,
      "password":req.body.password,
      "created":today,
      "modified":today
    }

    db.query('INSERT INTO users SET ?',users,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
          db.query('SELECT * FROM users WHERE email=?',[users.email],(error,result)=>{
            if(error){
              res.json({"Error":true,"message":"mysql error"})
            }
            else{
              
              res.json({"Error" : false, "Message" : "Succesfully registered !","user":result[0]});
            }
          })
           
        }
    });
});


//login

app.post('/api/login',(req,res)=>{

    var email= req.body.email;
    var password = req.body.password;
    db.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      if(results.length >0){
        if(results[0].password == password){
          res.send({
            "code":200,
            "success":"login sucessfull"
              });
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"+[0].password+"="+password
              });
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
    });

});


}


