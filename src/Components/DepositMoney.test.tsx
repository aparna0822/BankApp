import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render, screen, fireEvent } from '@testing-library/react';
import { DepositMoney } from './DepositMoney';
import { Provider } from 'react-redux';

// import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Reducer } from '../Redux/reducer';
import { TransactionSaga }from '../Redux/saga';

describe('DepositMoney Component', () => {
  const sagaMiddleware = createSagaMiddleware();
  let store:any;

  beforeEach(() => {
    store = configureStore({
        reducer:Reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });
  sagaMiddleware.run(TransactionSaga);
});

  it('should render the component without errors', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DepositMoney />
        </BrowserRouter>
      </Provider>
    );

    const header = screen.getByText('Depositing Money');
    const depositTypeSelect = screen.getByRole('combobox',{name:'Types Of Deposits:'});
    const amountInput = screen.getByLabelText('Amount:');

    expect(header).toBeInTheDocument();
    expect(depositTypeSelect).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
  });

  it('should update selected deposit type when the deposit type select element changes', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DepositMoney />
        </BrowserRouter>
      </Provider>
    );
    const depositTypeSelect = screen.getByLabelText('Types Of Deposits:')as HTMLOptionElement;
    const optionToUpdate = screen.getAllByRole('option')[1] as HTMLOptionElement;

    fireEvent.change(depositTypeSelect, { target: { value: optionToUpdate.value } });

    expect(depositTypeSelect.value).toBe('Savings Account');
  });

  it('should update amount input when the user enters a valid amount', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DepositMoney />
        </BrowserRouter>
      </Provider>
    );

    const amountInput = screen.getByLabelText('Amount:') as HTMLInputElement ;
    const valueToUpdate = '100';

    fireEvent.change(amountInput, { target: { value: valueToUpdate } });

    expect(amountInput.value).toBe(valueToUpdate);
  });

  it('should submit the form when the user clicks "Deposit Money" button', () => {
    const saveDepositMock = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DepositMoney saveDeposit={saveDepositMock} />
        </BrowserRouter>
      </Provider>
    );

    const depositTypeSelect = screen.getByLabelText('Types Of Deposits:');
    const amountInput = screen.getByLabelText('Amount:');
    const depositMoneyButton = screen.getByRole('button', { name: 'Deposit Money ' });

    fireEvent.change(depositTypeSelect, { target: { value: 'Savings Account' } });
    fireEvent.change(amountInput, { target: { value: '100' } });

    fireEvent.click(depositMoneyButton);

    expect(saveDepositMock).toHaveBeenCalledTimes(1);
  });

  it('should display an alert when user tries to submit form without selecting a deposit type', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DepositMoney />
        </BrowserRouter>
      </Provider>
    );

    const depositMoneyButton = screen.getByRole('button', { name: 'Deposit Money' });

    fireEvent.click(depositMoneyButton);

    expect(alertMock).toHaveBeenCalledTimes(1);

    alertMock.mockRestore();
  });
});
