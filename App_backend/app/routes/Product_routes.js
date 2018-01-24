module.exports=function(app,db){

    app.get('/api/products',(req,res)=>{
        db.query('SELECT * FROM products',(err,row)=>{
            if(err){
                res.send({
                    "code":400,
                    "failed":"error ocurred"
                  })
            }
            res.send(
                {
                    "code":200,
                     "result":row
                }
            ) ;
        })
    });

    app.post('/add_product',(req,res)=>{
        var products={
            "name":req.body.name,
            "description":req.body.description,
            "price":req.body.price,
            "discound_price":req.body.discound_price,
            "picture":null,
          }

          db.query('INSERT INTO products SET ?',products,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
            } else {
                res.json({"Error" : false, "Message" : "product Added !"});
            }
        });

    });

    //update product
    app.put('/update_product/:id',(req,res)=>{
          db.query('UPDATE `products` SET `name`=?,`description`=?,`price`=?,`discound_price`=?,`picture`=? where `p_id`=?', [req.body.name,req.body.description, req.body.price, req.body.discound_price,null, req.params.id],function(err,row){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
            } else {
                res.json({"Error" : false, "Message" : "product Updated !"});
            }
          })
    });

    app.get('/api/getProductById/:id',(req,res)=>{
        db.query('SELECT * FROM `products` where `p_id`=?',[req.params.id],(err,result)=>{
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "data" : result[0]});
            }

        })
    })


//delete product
app.delete('/deleteProduct/:id',(req,res)=>{

    db.query('SELECT * FROM `products` where `p_id`=?',[req.params.id],(err,result)=>{
          if(result>0){
            db.query('DELETE FROM `products` where `p_id`=?',[req.params.id],(err,result)=>{
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
                } else {
                    res.json({"Error" : false, "message" : "item deleted succesfully"});
                    res.send(result);
                }
            
              });

          }
          else{
              res.json({
                  "error":true,
                 "message":"product does not exist"
              })
          }
    });

});

}
