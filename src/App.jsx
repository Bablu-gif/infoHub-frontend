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
              <div style=
