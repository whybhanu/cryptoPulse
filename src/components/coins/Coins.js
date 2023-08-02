import React, { useState } from 'react';
import CoinItem from './CoinItem';
import './Coins.css';
import { Link } from 'react-router-dom';
import SingleCoin from '../../routes/SingleCoin';

export default function Coins(props) {
  const [visibleCoins, setVisibleCoins] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowMore = () => {
    setVisibleCoins((prevVisibleCoins) => prevVisibleCoins + 10);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = props.coins.filter((coin) => {
    const coinName = coin.name.toLowerCase();
    const coinSymbol = coin.symbol.toLowerCase();
    const search = searchTerm.toLowerCase();
    return coinName.includes(search) || coinSymbol.includes(search);
  });

  return (
    <>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="heading">
          <p>#</p>
          <p className='coin-name'>Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className='hide-mobile'>Volume</p>
          <p className='hide-mobile'>Mkt Cap</p>
        </div>
        {filteredCoins.slice(0, visibleCoins).map((coins) => {
          return (
            <Link to={`/coin/${coins.id}`} element={<SingleCoin/>}>
              <CoinItem coins={coins} />
            </Link>
          );
        })}
        {visibleCoins < filteredCoins.length && (
          <button className="show-more-button" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </div>
    </>
  );
}
