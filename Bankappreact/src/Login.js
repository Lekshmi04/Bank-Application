import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import {withRouter} from 'react-router';
class Login extends React.Component{
   state={
     username:"",
     password:"",
     
   }
  
   onUsernameChange=(event)=>{
     this.setState({username:event.target.value});
   }
  
   onPasswordChange=(event)=>{
    this.setState({password:event.target.value});
   }
  
   onSubmit=(event)=>{ 
     event.preventDefault();
     let uname=this.state.username;
   let pwd=this.state.password;
  
   Bank.login(uname,pwd)
   .then(response=>{
    swal("Login success!",response.data.message, "success");
    this.props.history.push("./home");
  })
   .catch(error=>{
    swal("Login failed!",error.response.data.message, "error"); 
   })



//let data=Bank.getAccountDetails()
 // if(uname in data){
   //   let password=data[uname]["password"];
   //   if(pwd===password){
        
     //      Bank.setcurrentUser(uname);
     //  swal("Login success!", "You achieved valid data!", "success");
    //  this.props.history.push("./home");
    //  }
     // else{
      //   swal("Login failed!", "You achieved invalid data!", "error");
     // }
 // }
 // else{
     // alert("invalid user  ");
 // }

   }
  render(){
       return( 

       <div className="container" >
           <div className="row">
               <div className="col-4" ></div>
 <div className='col-4'> 
     <h5>WELCOME TO SBI BANK</h5>
     <div className="jumbotron" >
      <form onSubmit={this.onSubmit}>
       <div className="form-group">
         <label for="exampleInputUsername1" >Username</label>
         <input value={this.state.username} onChange={this.onUsernameChange} type="text" className="form-control" id="uname" aria-describedby="emailHelp" />
         <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
       </div>
       <div className="form-group">
         <label for="exampleInputPassword1" >Password</label>
         <input value={this.state.password} onChange={this.onPasswordChange} type="password" className="form-control" id="pwd" />
       </div>
       
       <button type="submit" className="btn btn-primary"  >Submit</button>
       </form>
     </div>
     
     <div className="col-4"></div>
    </div> 
</div>
</div>
);
    }
}
export default  withRouter(Login);