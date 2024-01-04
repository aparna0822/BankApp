
import React, { useEffect } from 'react';
import { useSelector,useDispatch ,shallowEqual} from 'react-redux';
import { View_DATA, } from '../Redux/actions';
import { Transaction } from '../Redux/reducer'
import {Link } from 'react-router-dom'
import { Header } from '../Header';

 

const Home: React.FC=React.memo(()=>{
   
    const dispatch = useDispatch();
    let data = useSelector((state:any)=>state.data, shallowEqual);
    let balance=useSelector((state:any)=>state.balance, shallowEqual);
    React.useEffect(()=>{
        dispatch(View_DATA());
    },[]);
    console.log("fetching",data)
    return ( 
    <div >
         <Header/>
        <div  className='col-md-9 mt-3 container'>
        <h2  className='mt-6 mb-6 font-heading text-center'>
               AccountBalance:{balance}
         </h2>
            <h3 className='mt-6 mb-6 font-heading text-center'> Recent Transactions List</h3>
            <table className="table table-striped" >
            <thead>
            <tr className='table-primary'>
                <th scope='col'>ID</th>
                <th scope='col'>Date</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Credit/Debit</th>  
            </tr>
        </thead>
        <tbody data-testid="transactions-table-body"> 
        {
          data.map((trans:Transaction,index:number)=> (
            <tr key={index} >
                <td>{trans.id}</td>
                <td>{trans.date}</td>
                <td>{trans.Amount}</td>
               <td>{trans.CreditorDebit}</td>
            </tr>
          ))}
</tbody>
</table>  
            <span className='p-3 mt-4 mb-5' >
            <Link to="/sendmoney"> <button type="button" className="btn btn-primary m-5 p-3">Send Money</button> </Link>
            <Link to="/depositmoney"> <button className="btn btn-secondary m-5 p-3">Deposit Money</button></Link>
        </span>
       </div>
   </div>
    )
 })

export {Home}
