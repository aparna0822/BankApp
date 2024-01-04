import { FETCH_DATA, FETCH_CREDIT,  FETCH_ACCOUNT_BALANCE, SET_ACCOUNT_BALANCE,SAVE_DEPOSIT ,SEND_MONEY_SAGA, SAVE_DEPOSIT_SUCCESS} from "./Constants";
import{Deposit, Transaction} from './reducer'

type props = {
    data:{}
}

export const View_DATA = ()=>  {
        return{
            type:FETCH_DATA,
        }
}
export const  creditMoney= (amount:number) => {
    return {
        type:FETCH_CREDIT,
        payload:amount,
    }
}

export const SendMoney = (selectedPayee: string, amount: number) =>{
    return {
        type: SEND_MONEY_SAGA,
        selectedPayee,
        amount
    }
}

export const fetchAccountBalance = () =>{
    return {
        type:FETCH_ACCOUNT_BALANCE,
    }
}

export const setAccountBalance = (newBalance: number) => {
    return {
        type:SET_ACCOUNT_BALANCE,
        payload:newBalance,
    }
}

export const selectDeposit = (deposit:Deposit) => ({
     type:SAVE_DEPOSIT_SUCCESS,
     payload:deposit,
});

export const saveDeposit = (depositType:string,amount:number) => {
    return {
        type:SAVE_DEPOSIT,
            depositType,
            amount,
        
    };
};
