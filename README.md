# 📈 Realtime Symbols

## 🚀 Overview

Realtime Symbols is a **real-time stock price tracking application** that fetches live market data using the **Finnhub WebSocket API**. The frontend displays stock prices with automatic updates every few seconds.

## 🛠️ Features

- ✅ **Live Stock Price Updates** (AAPL, TSLA, BTC, etc.)
- ✅ **WebSocket Integration** for instant updates
- ✅ **Frontend Built with React & Material UI**
- ✅ **Backend using Node.js & WebSocket Server**
- ✅ **Optimized UI with real-time price & percentage changes**

## 🏗️ Tech Stack

- **Frontend:** React, Material UI
- **Backend:** Node.js, WebSocket, Finnhub API
- **Data Source:** Finnhub WebSocket API

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```sh
 git clone https://github.com/yourusername/realtime-symbols.git
 cd realtime-symbols
```

### 2️⃣ Install Dependencies

```sh
 npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the **root** directory and add:

```
FINNHUB_API_KEY=your_finnhub_api_key_here
```

Ensure you have a valid API key from [Finnhub](https://finnhub.io/).

### 4️⃣ Start the WebSocket Server

```sh
 node server.js
```

✅ The WebSocket server will start on `ws://localhost:8080`.

### 5️⃣ Start the Frontend

```sh
 cd client
 npm start
```

🚀 Open `http://localhost:3000` in your browser to view the real-time stock prices.

---

## 🔧 Project Structure

```
realtime-symbols/
│── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── RealtimeSymbols.js  # Main UI Component
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│
│── server.js              # WebSocket Server
│── .env                   # API Key Configuration
│── package.json           # Backend Dependencies
│── README.md              # Project Documentation
```

---

## 🎯 How It Works

1. The **backend** connects to **Finnhub WebSocket API** and subscribes to stock symbols.
2. Live data is sent to **connected frontend clients** via WebSocket.
3. The **frontend** updates stock prices in real time, displaying changes in price & percentage.

---

## 🛠️ Troubleshooting

### WebSocket Not Connecting?

- Check if the backend is running: `node server.js`
- Ensure you have set the correct **Finnhub API key** in `.env`
- Verify **Finnhub API limits** (free plan may have restrictions)

### Slow Updates?

- Finnhub may delay updates on a **free plan** (try a premium API key)
- Use **setImmediate()** in `server.js` to process updates faster

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ⭐ Contributing

Want to improve this project? Feel free to **fork, clone, and submit a PR**!

---

## 🔗 Useful Links

- [Finnhub API Docs](https://finnhub.io/docs/api/websocket-stock-price)
- [WebSockets in Node.js](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Material UI Docs](https://mui.com/)

---

🚀 **Happy Coding!**
