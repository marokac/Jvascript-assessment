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
};