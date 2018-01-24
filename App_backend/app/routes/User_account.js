
module.exports=function(app,db){
  
    app.post("/api/createAcc",function(req,res){
       
            var today = new Date();
            var balance=0.0;
            var account={
              "user_id":req.body.user_id,
              "balance":balance,
              "cardNum":req.body.cardNum,
              "exparyDate":req.body.exparyDate,
              "cvc":req.body.cvc,
              "created":today,
              "bank":req.body.bank,
            }
        
            db.query('INSERT INTO account SET ?',account,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL queryryreyry"+err});
                } else {
                    db.query('SELECT * FROM account WHERE user_id=?',[account.user_id],(error,result)=>{
                        res.json({"Error" : false, "Message" : "Succesfully registered !",acount:result[0]});
                    })
                }
            });
        });


        app.get('/api/getUserById/:id',(req,res)=>{
            db.query('SELECT * FROM `users` where `id`=?',[req.params.id],(err,result)=>{
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
                } else {
                    res.json({"Error" : false, "user" : result[0]});
                   
                }
    
            })
        })


        app.put('/api/update_account/:id',(req,res)=>{
            db.query('UPDATE `account` SET `balance`=?  where `a_id`=?', [req.body.balance, req.params.id],function(err,row){
              if(err) {
                  res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
              } else {
                  res.json({"Error" : false, "Message" : "Balance Updated !"});
              }
            })
      });

    };
