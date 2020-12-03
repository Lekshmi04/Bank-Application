var express = require('express');
var router = express.Router();
var Bank=require('../services/bank');

function authMiddleware(req,res,next){
   if(req.session.currentUser){
    next();
  }
  else{
    res.status(401).send({message:"Please login"});
  }
   
}
/* GET users listing. */
router.get('/',authMiddleware,function(req, res, ){
var result=Bank.getUsers();
   res.send(result);
});
router.post('/register', function(req, res,) {

  let uname=req.body.username;
let pwd=req.body.password;
let accno=req.body.accno;
let confirmPassword=req.body.confirmPassword;

let data=Bank.getUsers();
if(uname in data){
res.status(400).send({message:"Registration failed uname exists"}); 
}   
else if(pwd!==confirmPassword){
   res.status(400).send({message:"Registration failed"});
}
else{
Bank.addUser(uname,pwd,accno);
res.send({message:"user registeration successfully"});
this.props.history.push('/login');
}
});
router.post('/login',function(req,res){
   let uname=req.body.username;
   let pwd=req.body.password;
  let data=Bank.getUsers()
  if(uname in data){
      let password=data[uname]["password"];
      if(pwd===password){
        req.session.currentUser=uname;
           
       res.send({message:"Login success!"});
      
      }
      else{
         res.status(400).send({message:"Login failed!"});
      }
  }
  else{
      res.status(400).send({message:"invalid user"});
  }
});
router.post('/deposit',authMiddleware,function(req,res){
   let uname = req.body.dpUsername;
   let amt = parseInt(req.body.dpAmount);
   let data = Bank.getUsers()
   if (uname in data) {
     data[uname]["balance"] += amt;
     let bal = data[uname]["balance"];
    data[uname]["history"].push({
       typeOfTransaction: "Credit",
       amount: amt

     })
     
     res.send({balance:bal,message:"Deposit Successful"});
   }
   else {
     res.status(400).send({message:"invalid user"})
   }
});
router.post('/withdraw',authMiddleware,function(req,res){
   let uname = req.body.wdUsername;
   let amt = parseInt(req.body.wdAmount);
   let data = Bank.getUsers()
    

   if (uname in data) {
    if(uname!=req.session.currentUser){
      return res.send({message:"invalid username"});
    }
    data[uname]["balance"] -= amt;
    let bal = data[uname]["balance"];
     if (amt > bal) {
      return res.status(400).send({message:"insufficient balance"});
     }
     else {
      
       data[uname]["history"].push({
         typeOfTransaction: "Debit",
         amount: amt

       })
       
       res.send({balance:bal,message:"Withdraw successful"});
     }
   }
   else {
     res.status(400).send({message:"invalid user"})
   }
 
});
router.get('/transaction-history',authMiddleware,function(req,res){
let data=Bank.getUsers();
let uname=req.session.currentUser;
if(uname in data){
  return res.send({history:data[uname].history});
}
else{
  res.status(400).send({message:"invalid user"});
}
});
  
module.exports= router;
