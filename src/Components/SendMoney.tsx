import React, { ChangeEvent, useState } from 'react'
import {Link} from 'react-router-dom'
import  Paylist from "../PayeeList/payeelist.json"
import { useDispatch } from 'react-redux';

 
import { FETCH_DEBIT_MONEY,SEND_MONEY_SAGA} from '../Redux/Constants';
  
type Props = {
    handleSendMoney?: () =>void;
};
 
 
export const SendMoney =React.memo( (props:Props) => {
     const dispatch = useDispatch()
     const [selectedPayee, setSelectedpayee] = useState('');
     const [amount, setAmount] = useState<number | "">(0);
 
     const handlePayeeChange = (payee:string) =>{
        setSelectedpayee(payee);
     }
     
     const handleAmountChange = (e:ChangeEvent<HTMLInputElement>) => { 
        e.preventDefault()  
        const value = parseInt(e.target.value);
        console.log("Input Value:", value); 
        setAmount(value || "") ;
    }
    

     const  handleSendMoney = props.handleSendMoney || (() => {
     
        if(!selectedPayee){
            alert('Select a payee');
            return;
        }
        dispatch({type:'SEND_MONEY_SAGA',selectedPayee,amount})
       
     })
  return (
    <div className='container mt-5'>
         <form  onSubmit={(e) => e.preventDefault()} className='bg-light p-4 rounded'>
         <h2 className='mb-4'>Sending Money</h2>
         <label> PayeList:</label>
            <select  className="form-control" value={selectedPayee} onChange={(e) => handlePayeeChange(e.target.value)}>
                <option value="" >Select Payee</option>
                {Paylist.payeeList.map((payee:any)=>(
                    <option key={payee.id} value= {payee.Name}>
                        {payee.Name}
                    </option>
                ))}   
            </select>
            {selectedPayee && (
                <div>
                    <div className='form-group'>
                    <label>Amount:</label>
                    <input className='form-control' type="number" value={amount} onChange={handleAmountChange}/>
                    <br/>
                    </div>
                    <Link to ="/"><button className="btn btn-primary" onClick={handleSendMoney}>Send Money </button></Link>
                </div>
            )
            }
            </form>
    </div>
  )
})
