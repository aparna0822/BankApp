import {type} from '@testing-library/user-event/dist/type'
import {takeEvery, put, all, call} from 'redux-saga/effects'
import { SET_DATA,FETCH_DATA, SAVE_DEPOSIT_SUCCESS,SAVE_DEPOSIT,SEND_MONEY_SAGA ,FETCH_DEBIT_MONEY, ADD_TO_BALANCE} from './Constants'

function* getData():Generator<any,void,any>{
    let data = yield fetch("http://localhost:3007/Transactions-info")
    data=yield data.json();
    yield put({type:SET_DATA,data})
}


function* DepositSaga({ depositType, amount }: {depositType:string, amount:number}) {
    try {
      if(!depositType){
          alert('Select a deposit type');
          return;
      }
      const data  =  {
          id: +Math.random().toFixed(), 
          depositName:depositType,
          date: new Date().toString(),
          Amount: amount,   
          CreditorDebit: 'debit'
      }
      yield call(postTransactionDataToAPI, data);
      yield put({type:SAVE_DEPOSIT_SUCCESS, data});
      alert('Successfully Money Deposited')
    } catch(error) {
        console.log('Error:',error);
        alert('Error occured')
    }
  }  

function* getDepositSuccess(action:any){
    yield put({type:ADD_TO_BALANCE,amount:action.data.Amount})
}

 export function* TransactionSaga():Generator<any,void,any>
{
    yield all ([
        takeEvery(FETCH_DATA, getData),
        takeEvery(SEND_MONEY_SAGA,sendMoneySaga),
        takeEvery(SAVE_DEPOSIT as any,DepositSaga),
        takeEvery(SAVE_DEPOSIT_SUCCESS,getDepositSuccess)

    ]);
   
}

function* postTransactionDataToAPI(data:any) {
    yield call(fetch, "http://localhost:3007/Transactions-info", {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

function* sendMoneySaga(actions:any) {
    const { selectedPayee, amount } = actions;
  
    try {
      if(!selectedPayee){
        alert('Select a payee');
        return;
      }
      const data =  {
        id: +Math.random().toFixed(),
        name: selectedPayee, 
        date: new Date().toISOString(),
        Amount: amount, 
        CreditorDebit: 'Credit',
      };
      yield put({type: FETCH_DEBIT_MONEY, data});
      yield call(postTransactionDataToAPI, data);
      alert('Money sent successfully');
    } catch (error) {
      console.log('Money send Error:', error);
      alert('Error occurred while sending money');
    }
}

export default TransactionSaga;
