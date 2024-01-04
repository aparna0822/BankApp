import React, { ChangeEvent, useState , useEffect} from "react";
import DepositType from '../DepositList/TypesofDeposits.json';

import {Link}from 'react-router-dom'

import { saveDeposit } from "../Redux/actions";
import {useDispatch, useSelector } from "react-redux";
import {put,call} from 'redux-saga/effects';
import { SAVE_DEPOSIT,SAVE_DEPOSIT_SUCCESS} from '../Redux/Constants';

  type Props = {
    saveDeposit?:() => void;
  };

 export const DepositMoney = React.memo((props:Props) => {
  const dispatch = useDispatch();
  // const success = useSelector((state:any) =>state.depositeSuccess)
  const [depositType, setDepositType] = useState("");
  const [amount, setAmount] = useState<number>(0);


  const handledepositChange = (depositSuccess:string) =>{
    setDepositType(depositSuccess);
 }
  
 const handleAmountChange = (e:ChangeEvent<HTMLInputElement>) => { 
  e.preventDefault()  
  const value = parseInt(e.target.value);
  console.log("Input Value:", value); 
  setAmount(value );
}

const handleDeposit = () => {
     if(!depositType ){
         alert('Select a deposit');
         return;
     }

     (props.saveDeposit || (() => dispatch(saveDeposit(depositType, amount))))();
};
  return (
    <div className='container mt-5'>
    <form  onSubmit={(e) => e.preventDefault()} className='bg-light p-4 rounded'>
    <h2 className='mb-4'>Depositing Money</h2>
    <label> Types Of Deposits:</label>
       <select  className="form-control" value={depositType} onChange={(e) =>handledepositChange(e.target.value)}>
           <option value="" >Select Type of Deposit</option>
           {DepositType.typesOfDeposits.map((deposit:any) => (
          <option key={deposit.id} value={deposit.depositName}>
            {deposit.depositName}
          </option>
        ))}
      </select>
       {depositType && (
           <div>
               <div className='form-group'>
                <label>Amount:</label>
                <input className='form-control' type="number" value={amount} onChange={handleAmountChange}/>
               <br/>              
              </div>
               <Link to ="/"><button className="btn btn-primary" onClick={handleDeposit}>Deposit Money </button></Link>
            </div>
        )
        }
        </form>
 </div>
);
})


