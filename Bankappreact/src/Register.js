import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import {withRouter} from 'react-router';
class Register extends React.Component{
    state={
        username:"",
        accno:"",
        password:"",
     confirmPassword:""
      }
     
      onUsernameChange=(event)=>{
        this.setState({username:event.target.value});
      }
      onAccnoChange=(event)=>{
        this.setState({accno:event.target.value});
      }
      onPasswordChange=(event)=>{
       this.setState({password:event.target.value});
      } 
      onConfirmPasswordChange=(event)=>{
        this.setState({confirmPassword:event.target.value});
       }  
       onSubmit=(event)=>{ 
        event.preventDefault();
        let uname=this.state.username;
        let accno=this.state.accno;
      let pwd=this.state.password;
      let confirmPassword=this.state.confirmPassword;
      Bank.registration(uname,pwd,confirmPassword,accno)
      .then(response=>{
        swal("Registration success!",response.data.message,"success");
       this.props.history.push("/");
     })
      .catch(err=>{
       
        swal("Registeration failed!",err.response.data.message, "error"); 
      })
   
     //let data=Bank.getAccountDetails();
    // if(uname in data){
    //    swal("Registeration failed!", "user already exists!", "error"); 
     //    let password=data[uname]["password"];
    // }   
        
    // else if(pwd!==confirmPassword){
    //    swal("Registeration failed!", "password and confirm password does not match!", "error"); 
    // }
    // else {
    //     Bank.addUser(uname,pwd,accno);
    //    swal("Registeration success!", "You are registered successfully!", "success");
     //  this.props.history.push("/");
     //  }
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
      <label for="exampleInputPassword1" >Accno</label>
      <input value={this.state.accno} onChange={this.onAccnoChange} type="text" className="form-control" id="pwd" />
    </div>
    <div className="form-group">
      <label for="exampleInputUsername1" >Password</label>
      <input value={this.state.password} onChange={this.onPasswordChange} type="password" className="form-control" id="pwd" aria-describedby="emailHelp" />
      <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1" > Confirm Password</label>
      <input value={this.state.confirmpassword} onChange={this.onConfirmPasswordChange} type="password" className="form-control" id="pwd" />
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
export default withRouter(Register);