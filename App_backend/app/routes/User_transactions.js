module.exports=function(app,db){
    app.post("/api/add_trans",function(req,res){
             var today = new Date();
             var transections={
               "a_id":req.body.a_id,
               "p_id":req.body.p_id,
               "total_price":req.body.total_price,
               "trans_date":today
             }
         
             db.query('INSERT INTO transections SET ?',transections,function(err,rows){
                 if(err) {
                     res.json({"Error" : true, "Message" : "Error executing MySQL queryryreyry"+err});
                 } else {
                         res.json({"Error" : false, "Message" : "transection made !"});
                 }
             });
         });


         app.get('/api/getTrans/:id',(req,res)=>{
            db.query('SELECT * FROM `transections` WHERE a_id = ?',[req.params.id],(err,row)=>{
                if(err){
                    res.send({
                        "Error":true,
                        "code":400,
                        "failed":"error ocurred"
                      })
                }
                else {
                    if(row.length>0){
                        db.query('SELECT * FROM products WHERE p_id=?',[row[0].p_id],(err,result)=>{
                            if(err){
                              res.send({
                                  "Error":true,
                                  "code":400,
                                  "failed":"error ocurred"
                                }) 
                            }
                            else{
                              res.send(
                                  {  "Error":false,
                                      "code":200,
                                      "trans":row,
                                      "product":result
                                  }
                              ) ;
                            }
                      })  
                  } 
                    }
                    
               
            })
        });
};