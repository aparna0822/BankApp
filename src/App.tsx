import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import {Home} from './Components/Home'
import store from './Redux/store'
import { Provider } from 'react-redux';
import { SendMoney } from './Components/SendMoney'
import { DepositMoney } from './Components/DepositMoney'


function App() {
  return (
    <div>
     <Provider store={store}>
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/sendmoney" element={<SendMoney/>}></Route>
         <Route path="/depositmoney" element={<DepositMoney/>}></Route>
         
      </Routes>
    </BrowserRouter>
     
     </Provider>
    </div>
   )
  }
export default App;
