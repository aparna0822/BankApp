import React from 'react'
import { FETCH_CREDIT, FETCH_DEBIT_MONEY, SET_DATA, SAVE_DEPOSIT_SUCCESS,  ADD_TO_BALANCE, FETCH_DATA } from "./Constants";


export interface Transaction {
                id:string,
                name: string,
                date:string,
                Amount: number,
                CreditorDebit: "credit" | "debit"

}
export type TransState = {
    data:Transaction[],
    balance : number,
    transactionsInfo:Transaction[],
    error:string | null,
    depositSuccess?:boolean,
}

export type TransAction = {
    type:string,
    data:any,
    amount?:number,

}
const initialState: TransState={
    data:[],
     balance:500, 
     transactionsInfo:[],
     error:null,
   
}
 export interface AccountState {
    accountBalance : number,
}

export interface Deposit {
    id:number;
    depositName:string;
}

export type WatchTypes = (args:TransAction) => TransAction
const Reducer = (state:TransState=initialState, action:TransAction):TransState =>{
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data:action.data
            }
            case FETCH_CREDIT:
                return {
                    ...state,
                    balance: state.balance + action.data.Amount
                }

            case FETCH_DEBIT_MONEY:
                return {
                    ...state,
                    balance: state.balance - action.data.Amount
                }
                case SAVE_DEPOSIT_SUCCESS:
                    return {
                        ...state,
                       transactionsInfo:[...state.transactionsInfo,action.data],
                        depositSuccess:true,
                    };
                    case ADD_TO_BALANCE:
                        return{
                            ...state,
                            balance: action.amount ? state.balance + action.amount : state.balance
                        };
                default:
                    return state;
    }
}
export {Reducer};