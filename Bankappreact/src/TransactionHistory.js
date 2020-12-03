import React from 'react';
import {withRouter} from 'react-router';
import Bank from './Bank';
class TransactionHistory extends React.Component{
  
   state={
       history:[]
   }
    render(){
        
        return(
            <div>
                <h1>Transaction history</h1>
            <table class="table">
                <tr>
                    <th>Type of Transaction</th>
                    <th>Amount</th>
                </tr>
                {
                    this.state.history.length==0?
                    <tr><td>No Data</td></tr>:null
                }
                {
                   this.state.history.map(h=><tr>
                        <td>{h.typeOfTransaction}</td>
                        <td>{h.amount}</td>
                    </tr>)
                }
               
            </table>
            </div>
        )
        
    }
    componentDidMount(){
  Bank.history()
  .then(response=>{
this.setState({history:response.data.history})
  })
    }
  }  

export default withRouter(TransactionHistory);