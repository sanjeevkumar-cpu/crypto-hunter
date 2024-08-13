import './App.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  // Fetch cryptocurrency data from CoinGecko API
  useEffect(() => {
    console.log("Attempting to fetch data from CoinGecko API");
    Axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd', // Fetch data in USD
        order: 'market_cap_desc', // Order by market cap descending
        per_page: 100, // Limit to top 100 coins
        page: 1, // First page
        sparkline: false // No sparkline data
      }
    })
      .then((res) => {
        console.log("Data fetched successfully", res.data);
        setCrypto(res.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching data", error); // Log any errors
      });
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="App">
      <h1 className='title'>Crypto Hunter</h1>
      <input 
        type="text" 
        placeholder='Search cryptocurrencies...'
        onChange={(e) => {
          setSearch(e.target.value.toLowerCase()); // Update search state on input change
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
          </tr>
        </thead>
        <tbody>
          {crypto
            .filter((val) => val.name.toLowerCase().includes(search)) // Filter data based on search input
            .map((val, id) => {
              return (
                <tr key={id}>
                  <td className='rank'>{val.market_cap_rank}</td>
                  <td className='logo'>
                    <a href={`https://www.coingecko.com/en/coins/${val.id}`}>
                      <img src={val.image} alt="logo" width="30px" />
                    </a>
                    <p>{val.name}</p>
                  </td>
                  <td className='symbol'>{val.symbol.toUpperCase()}</td>
                  <td>${val.market_cap.toLocaleString()}</td>
                  <td>${val.current_price.toFixed(2)}</td>
                  <td>{val.circulating_supply.toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
