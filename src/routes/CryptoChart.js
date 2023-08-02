import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleCoin.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CryptoChart = () => {
  const params = useParams();
  const [duration, setDuration] = useState("max"); // State to track the selected duration
  const [coin, setCoin] = useState([]);
  const [lowerLimit, setLowerLimit] = useState(0); // State for lower limit
  const [upperLimit, setUpperLimit] = useState(0); // State for upper limit

  const handleButtonClick = (selectedDuration) => {
    setDuration(selectedDuration);
  };

  useEffect(() => {
    // Function to fetch data from the API and update the graph
    const fetchData = () => {
      const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=inr&days=${duration}&random=${Math.random()}`;
      axios
        .get(url)
        .then((res) => {
          setCoin(
            res.data.prices.map((priceData) => ({
              name: new Date(priceData[0]).toLocaleString(),
              dates: priceData[1],
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Initial fetch
    fetchData();

    // Fetch data every 1 minute (60000 milliseconds)
    const interval = setInterval(fetchData, 60000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [params.coinId, duration]);

  useEffect(() => {
    // Check for price alerts and show notifications (same as before)
    if (coin.length > 0) {
      const currentPrice = coin[coin.length - 1].dates;
      if (currentPrice < lowerLimit) {
        // Trigger lower limit alert
        if (Notification.permission === "granted") {
          new Notification("Price Alert", {
            body: `The price of ${params.coinId} has fallen below your defined lower limit!`,
          });
        }
      } else if (currentPrice > upperLimit) {
        // Trigger upper limit alert
        if (Notification.permission === "granted") {
          new Notification("Price Alert", {
            body: `The price of ${params.coinId} has exceeded your defined upper limit!`,
          });
        }
      }
    }
  }, [coin, params.coinId, lowerLimit, upperLimit]);

  // useEffect(() => {
  //   if (Notification.permission !== "granted") {
  //     Notification.requestPermission();
  //   }
  // }, []);

  return (
    <div className="container">
      <div className="buttons-container">
        <button className="designButton" onClick={() => handleButtonClick("max")}>Max</button>
        <button className="designButton" onClick={() => handleButtonClick("1")}>1 Day</button>
        <button className="designButton" onClick={() => handleButtonClick("14")}>14 Days</button>
        <button className="designButton" onClick={() => handleButtonClick("30")}>30 Days</button>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={coin}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="dates"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="price-alerts">
        <div>
          <h3>Set Lower Limit</h3>
        <input
          type="number"
          placeholder="Set Lower Limit"
          value={lowerLimit}
          onChange={(e) => setLowerLimit(parseFloat(e.target.value))}
        />
        </div>
        <div>
        <h3>Set Upper Limit</h3>
        <input
          type="number"
          placeholder="Set Upper Limit"
          value={upperLimit}
          onChange={(e) => setUpperLimit(parseFloat(e.target.value))}
        />
        </div>
      </div>
    </div>
  );
};

export default CryptoChart;
