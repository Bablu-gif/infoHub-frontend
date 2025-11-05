import React, { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("weather");

  // Weather states
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Currency states
  const [inr, setInr] = useState("");
  const [usd, setUsd] = useState(null);
  const [eur, setEur] = useState(null);

  // Quote states
  const [quote, setQuote] = useState(
    "Click the button to get a motivational quote!"
  );
  const [loadingQuote, setLoadingQuote] = useState(false);

  // 🌤️ Dynamic Weather (mock)
  const getWeather = async () => {
    if (!city) return alert("Please enter a city name!");
    setLoadingWeather(true);
    try {
      const randomTemp = Math.floor(Math.random() * 15) + 20; // 20-34°C
      const randomWind = Math.floor(Math.random() * 20) + 5; // 5-24 km/h
      const conditions = ["Sunny", "Cloudy", "Rainy", "Windy", "Stormy"];
      const randomCondition =
        conditions[Math.floor(Math.random() * conditions.length)];

      const data = {
        city,
        temperature: randomTemp,
        windspeed: randomWind,
        condition: randomCondition,
      };

      setWeather(data);
    } catch (err) {
      alert("Error fetching weather data!");
    } finally {
      setLoadingWeather(false);
    }
  };

  // 💱 Currency Converter (mock)
  const convertCurrency = () => {
    if (!inr) return alert("Enter amount in INR!");
    const amount = parseFloat(inr);
    setUsd((amount * 0.012).toFixed(2));
    setEur((amount * 0.011).toFixed(2));
  };

  // 💬 Motivational Quote (mock)
  const getQuote = async () => {
    setLoadingQuote(true);
    try {
      const quotes = [
        "Believe in yourself!",
        "You can do it!",
        "Never give up!",
        "Stay positive, work hard, make it happen!",
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    } catch (err) {
      setQuote("Failed to fetch quote!");
    } finally {
      setLoadingQuote(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#0077ff" }}>🌐 InfoHub</h1>
      <p>All your daily utilities in one place.</p>

      {/* Navigation */}
      <div style={styles.nav}>
        <button
          onClick={() => setActiveTab("weather")}
          style={activeTab === "weather" ? styles.activeBtn : styles.btn}
        >
          Weather
        </button>
        <button
          onClick={() => setActiveTab("currency")}
          style={activeTab === "currency" ? styles.activeBtn : styles.btn}
        >
          Currency
        </button>
        <button
          onClick={() => setActiveTab("quote")}
          style={activeTab === "quote" ? styles.activeBtn : styles.btn}
        >
          Quotes
        </button>
      </div>

      <div style={styles.box}>
        {/* Weather Module */}
        {activeTab === "weather" && (
          <div>
            <h2>🌤️ Weather Information</h2>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={styles.input}
            />
            <button onClick={getWeather} style={styles.btn}>
              {loadingWeather ? "Loading..." : "Get Weather"}
            </button>
            {weather && (
              <div style={styles.result}>
                <p>🌡️ Temperature: {weather.temperature}°C</p>
                <p>💨 Wind Speed: {weather.windspeed} km/h</p>
                <p>Condition: {weather.condition}</p>
              </div>
            )}
          </div>
        )}

        {/* Currency Module */}
        {activeTab === "currency" && (
          <div>
            <h2>💱 Currency Converter</h2>
            <input
              type="number"
              placeholder="Enter amount in INR"
              value={inr}
              onChange={(e) => setInr(e.target.value)}
              style={styles.input}
            />
            <button onClick={convertCurrency} style={styles.btn}>
              Convert
            </button>
            {usd && eur && (
              <div style={styles.result}>
                <p>🇺🇸 USD: ${usd}</p>
                <p>🇪🇺 EUR: €{eur}</p>
              </div>
            )}
          </div>
        )}

        {/* Quotes Module */}
        {activeTab === "quote" && (
          <div>
            <h2>💬 Motivational Quote</h2>
            <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>{quote}</p>
            <button onClick={getQuote} style={styles.btn}>
              {loadingQuote ? "Loading..." : "Get Quote"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    backgroundColor: "#f5f9ff",
    minHeight: "100vh",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    margin: "1.5rem 0",
  },
  btn: {
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#0077ff",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
  activeBtn: {
    padding: "0.6rem 1.2rem",
    border: "2px solid #0077ff",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#0077ff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  input: {
    padding: "0.5rem",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "0.5rem",
  },
  box: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1.5rem",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  result: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
};

export default App;

