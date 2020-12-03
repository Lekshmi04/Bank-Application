import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { Link } from 'react-router-dom';
class Home extends React.Component {
  state = {
    dpUsername: "",
    dpAmount: "",
    wdUsername: "",
    wdAmount: "",
    balance: "",

  }
  ondpUsernameChange = (event) => {
    this.setState({ dpUsername: event.target.value });
  }
  ondpAmountChange = (event) => {
    this.setState({ dpAmount: event.target.value });
  }
  onwdUsernameChange = (event) => {
    this.setState({ wdUsername: event.target.value });
  }
  onwdAmountChange = (event) => {
    this.setState({ wdAmount: event.target.value });
  }
  onDeposit = (event) => {
    event.preventDefault();
    let uname = this.state.dpUsername;
    let amt = parseInt(this.state.dpAmount);
    Bank.deposit(uname,amt)
    
    .then(response=>{
      this.setState({ balance:response.data.balance});
      swal("Deposit successful!","Amount credited", "success");
      
    })
     .catch(err=>{
      swal("Deposit failed!", "You achieved invalid data!", "error"); 
     })
  
   // let data = Bank.getAccountDetails()
   // if (uname in data) {
   //   data[uname]["balance"] += amt;
   //   let bal = data[uname]["balance"];
   //   this.setState({ balance: bal });

    //  data[uname]["history"].push({
     //   typeOfTransaction: "Credit",
     //   amount: amt

     // })
     // Bank.saveData();
     // alert("Deposit Successful");
   // }
   // else {
   //   swal("invalid user")
   // }

  }
  onWithdraw = (event) => {
    event.preventDefault();
    let uname = this.state.wdUsername;
    let amt = parseInt(this.state.wdAmount);
   Bank.withdraw(uname,amt)
   .then(response=>{
    this.setState({ balance:response.data.balance});
    swal("Withdraw successful!","Amount Debited", "success");
    
  })
   .catch(err=>{
    swal("Withdraw failed!", "You achieved invalid data!", "error"); 
   })

   // let data = Bank.getAccountDetails()
   // if (uname in data) {
   //   let bal = data[uname]["balance"]

    //  if (amt > bal) {
    //    swal("insufficient balance");
    //  }
     // else {
     //   data[uname]["balance"] -= amt;
     //   let bal = data[uname]["balance"];
     //   this.setState({ balance: bal })
     //   data[uname]["history"].push({
     //     typeOfTransaction: "Debit",
     //     amount: amt

      //  })
      //  Bank.saveData();
      //  alert("Withdraw successful");
     // }
   // }
   // else {
   //   swal("invalid user")
   // }
  }


  render() {
    return (
      <div className="container">
        Balance:{this.state.balance}
        <Link to='/history'>History</Link>
       
        <div className="row">
          <div className="col-6">
            <div className="jumbotron">
              <form onSubmit={this.onDeposit}>
                <h3>Deposit</h3>


                <div className="form-group">
                  <label for="exampleInputUsername1">Username</label>
                  <input value={this.state.dpUsername} onChange={this.ondpUsernameChange} type="text" className="form-control" id="uname" aria-describedby="emailHelp" />

                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Amount</label>
                  <input value={this.state.dpAmount} onChange={this.ondpAmountChange} type="text" className="form-control" id="amt" />
                </div>

                <button type="submit" className="btn btn-primary" >ok</button>

              </form>

            </div>
          </div>
          <div className="col-6">
            <div className="jumbotron">
              <form onSubmit={this.onWithdraw}>
                <h3>Withdrawal</h3>


                <div className="form-group">
                  <label for="exampleInputUsername1">Username</label>
                  <input value={this.state.wdUsername} onChange={this.onwdUsernameChange} type="text" className="form-control" id="uname1" aria-describedby="emailHelp" />

                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Amount</label>
                  <input value={this.state.wdAmount} onChange={this.onwdAmountChange} type="text" className="form-control" id="amt1" />
                </div>

                <button type="submit" className="btn btn-primary">ok</button>
              </form>
            </div>
          </div>

        </div>
      </div>




    );
  }
}

export default Home;