import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Home } from './Home';
import store from '../Redux/store';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store'

describe('Home component', () => {
  it('renders the account balance', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
           <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/AccountBalance:/)).toBeInTheDocument();
  });

  it('renders the recent transactions list', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
           <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Recent Transactions List/)).toBeInTheDocument();
  });

  it('renders the send money button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
           <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Send Money/)).toBeInTheDocument();
  });

  it('renders the deposit money button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
           <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Deposit Money/)).toBeInTheDocument();
  });
 const mockStore = configureMockStore();
  it('renders a list of transactions', () => {
    const mockData = [
      {id: 1, date: '2022-01-01', Amount: 100, CreditorDebit: 'Credit'},
      {id: 2, date: '2022-01-02', Amount: 50, CreditorDebit: 'Debit'},
    ];
    const store = mockStore({
      data:mockData,
      balance:150
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
           <Home />
        </BrowserRouter>
      </Provider>
    );
    const tableBody = screen.getByTestId('transactions-table-body') as HTMLTableElement;
    mockData.forEach((trans) => {
      const row = tableBody.insertRow();
      const firstCell = row.insertCell();
      firstCell.appendChild(document.createTextNode(String(trans.id)));
      const secondCell = row.insertCell();
      secondCell.appendChild(document.createTextNode(trans.date));
      const thirdCell = row.insertCell();
      thirdCell.appendChild(document.createTextNode(String(trans.Amount)));
      const fourthCell = row.insertCell();
      fourthCell.appendChild(document.createTextNode(trans.CreditorDebit));
    });
    mockData.forEach((trans) => {
      expect(screen.getByText(new RegExp(String(trans.id)))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(trans.date))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(String(trans.Amount)))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(trans.CreditorDebit))).toBeInTheDocument();
    });
  });
});
