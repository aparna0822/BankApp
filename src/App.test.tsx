import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter ,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/store';

describe('App component', () => {
  it('renders the header component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Banking Application')).toBeInTheDocument();
  });

  it('renders the Home component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          < Route path="/" element={<App/>}/>
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Welcome to the Banking App')).toBeInTheDocument();
  });

  it('renders the SendMoney component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/sendmoney" element={<App/>}></Route>
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Send Money')).toBeInTheDocument();
  });

  it('renders the DepositMoney component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/depositmoney" element={<App />} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Deposit Money')).toBeInTheDocument();
  });
});

