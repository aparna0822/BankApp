import React from 'react'
import reduxSaga, {SagaMiddleware} from 'redux-saga'
import { Reducer } from './reducer'

import TransactionSaga from './saga';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware :SagaMiddleware=reduxSaga();

const store = configureStore(
    {
    reducer:Reducer,
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware().prepend(sagaMiddleware)
   }
)
sagaMiddleware.run(TransactionSaga);


export default store;