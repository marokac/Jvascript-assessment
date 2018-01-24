const userRoutes=require('./User_routes');
const productRoutes=require('./Product_routes');
const UserAccountRoutes=require('./User_account');
const UserTransactionRoutes=require('./User_transactions');

module.exports=function(app,db){
    userRoutes(app,db);
    productRoutes(app,db);
    UserAccountRoutes(app,db);
    UserTransactionRoutes(app,db);
}