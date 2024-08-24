import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { FaBars, FaUserCircle } from "react-icons/fa";

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    Axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    })
      .then((res) => {
        setCrypto(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currency]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">Crypto Bash</div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button
            className="currency-btn usd-btn"
            onClick={() => setCurrency("usd")}
          >
            USD
          </button>
          <button
            className="currency-btn inr-btn"
            onClick={() => setCurrency("inr")}
          >
            INR
          </button>
          <div className="input-container">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
      </nav>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Available Supply</th>
          </tr>
        </thead>
        <tbody>
          {crypto
            .filter((val) => val.name.toLowerCase().includes(search))
            .map((val, id) => (
              <tr key={id}>
                <td className="rank">{val.market_cap_rank}</td>
                <td className="logo">
                  <a href={`https://www.coingecko.com/en/coins/${val.id}`}>
                    <img src={val.image} alt="logo" width="30px" />
                  </a>
                  <p>{val.name}</p>
                </td>
                <td className="symbol">{val.symbol.toUpperCase()}</td>
                <td>
                  {currency === "usd" ? "$" : "₹"}
                  {val.current_price.toLocaleString()}
                </td>
                <td>
                  {currency === "usd" ? "$" : "₹"}
                  {val.market_cap.toLocaleString()}
                </td>
                <td>{val.circulating_supply.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
