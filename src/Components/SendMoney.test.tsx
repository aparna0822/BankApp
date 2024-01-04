import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { SendMoney } from './SendMoney';
import { BrowserRouter } from 'react-router-dom';

describe('SendMoney Component', () => {
  const mockStore = configureMockStore();
  let store:any;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should render the component without errors', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
            <SendMoney />
        </BrowserRouter>
        
      </Provider>
    );

    const header = screen.getByText('Send Money');
    const payeeListSelect = screen.getByLabelText('PayeList:');
    const amountInput = screen.getByLabelText('Amount:');
    const sendMoneyButton = screen.getByRole('button', { name: 'Send Money ' });

    expect(header).toBeInTheDocument();
    expect(payeeListSelect).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(sendMoneyButton).toBeInTheDocument();
  });

  it('should update selected payee when the payee list select element changes', () => {
    render(
      <Provider store={store}>
       <BrowserRouter>
            <SendMoney />
        </BrowserRouter>
        
      </Provider>
    );

    const payeeListSelect = screen.getByLabelText('PayeList:') as HTMLSelectElement;
    const optionToUpdate = screen.getAllByRole('option')[1];

    userEvent.selectOptions(payeeListSelect, [optionToUpdate]);

    expect(payeeListSelect.value).toBe('John');
  });

  it('should update amount input when the user enters a valid amount', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
            <SendMoney />
        </BrowserRouter>
        
      </Provider>
    );

    const amountInput = screen.getByLabelText('Amount:') as HTMLInputElement;
    const valueToUpdate = '100';

    userEvent.type(amountInput, valueToUpdate);

    expect(amountInput.value).toBe(valueToUpdate);
  });

  it('should submit the form when the user clicks "Send Money" button', () => {
    const sendMoneyMock = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
            <SendMoney  />
        </BrowserRouter>
      </Provider>
    );

    const payeeListSelect = screen.getByLabelText('PayeList:');
    const amountInput = screen.getByLabelText('Amount:');
    const sendMoneyButton = screen.getByRole('button', { name: 'Send Money ' });

    userEvent.selectOptions(payeeListSelect, 'John');
    fireEvent.change(amountInput, { target: { value: '100' } });

    fireEvent.click(sendMoneyButton);

    expect(sendMoneyMock).toHaveBeenCalledTimes(1);
  });

  it('should display an alert when user tries to submit form without selecting a payee', async() => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <Provider store={store}>
        <BrowserRouter>
            <SendMoney />
        </BrowserRouter>  
      </Provider>
    );
    
 await waitFor(()=> {
        expect(screen.getByText('Send Money')).toBeInTheDocument();
    });

    const sendMoneyButton = screen.getByRole('button', { name: 'Send Money ' });

    fireEvent.click(sendMoneyButton);

    expect(alertMock).toHaveBeenCalledTimes(1);

    alertMock.mockRestore();
});
});

