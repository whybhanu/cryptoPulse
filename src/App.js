import React , {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coins from './components/coins/Coins';
import SingleCoin from './routes/SingleCoin';
import Navbar from './components/Nav/Navbar';
import { Route, Routes } from 'react-router-dom';

function App() {

  const[coins, setCoins] = useState([]);
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'

  useEffect(()=>{
    axios.get(url).then((response) => {
      setCoins(response.data); 
      console.log(response.data[0]);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Coins coins = {coins}/>}></Route>
        <Route path='/coin/:coinId' element={<SingleCoin/>}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
