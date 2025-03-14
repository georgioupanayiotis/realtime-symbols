require("dotenv").config();
const WebSocket = require("ws");
const http = require("http");

// Ensure the API key is loaded
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
if (!FINNHUB_API_KEY) {
  console.error("❌ Missing FINNHUB_API_KEY in .env file");
  process.exit(1);
}

// Construct the WebSocket URL
const FINNHUB_SOCKET_URL = `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`;

console.log("✅ Finnhub WebSocket URL:", FINNHUB_SOCKET_URL);

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const externalSocket = new WebSocket(FINNHUB_SOCKET_URL);

// Track live stock data
const symbols = {
  AAPL: null,
  ABNB: null,
  ADBE: null,
  ADI: null,
  ADP: null,
  ADSK: null,
  AEP: null,
  AMAT: null,
  AMD: null,
  AMGN: null,
  AMZN: null,
  ANSS: null,
  APP: null,
  ARM: null,
  ASML: null,
  AVGO: null,
  AXON: null,
  AZN: null,
  BIIB: null,
  BKNG: null,
  BKR: null,
  CCEP: null,
  CDNS: null,
  CDW: null,
  CEG: null,
  CHTR: null,
  CMCSA: null,
  COST: null,
  CPRT: null,
  CRWD: null,
  CSCO: null,
  CSGP: null,
  CSX: null,
  CTAS: null,
  CTSH: null,
  DASH: null,
  DDOG: null,
  DXCM: null,
  EA: null,
  EXC: null,
  FANG: null,
  FAST: null,
  FTNT: null,
  GEHC: null,
  GFS: null,
  GILD: null,
  GOOG: null,
  GOOGL: null,
  HON: null,
  IDXX: null,
  INTC: null,
  INTU: null,
  ISRG: null,
  KDP: null,
  KHC: null,
  KLAC: null,
  LIN: null,
  LRCX: null,
  LULU: null,
  MAR: null,
  MCHP: null,
  MDB: null,
  MDLZ: null,
  MELI: null,
  META: null,
  MNST: null,
  MRVL: null,
  MSFT: null,
  MSTR: null,
  MU: null,
  NFLX: null,
  NVDA: null,
  NXPI: null,
  ODFL: null,
  ON: null,
  ORLY: null,
  PANW: null,
  PAYX: null,
  PCAR: null,
  PDD: null,
  PEP: null,
  PLTR: null,
  PYPL: null,
  QCOM: null,
  REGN: null,
  ROP: null,
  ROST: null,
  SBUX: null,
  SNPS: null,
  TEAM: null,
  TMUS: null,
  TSLA: null,
  TTD: null,
  TTWO: null,
  TXN: null,
  VRSK: null,
  VRTX: null,
  WBD: null,
  WDAY: null,
  XEL: null,
  ZS: null
};

const symbolsArray = [
  "AAPL", "ABNB", "ADBE", "ADI", "ADP", "ADSK", "AEP", "AMAT", "AMD", "AMGN", 
  "AMZN", "ANSS", "APP", "ARM", "ASML", "AVGO", "AXON", "AZN", "BIIB", "BKNG", 
  "BKR", "CCEP", "CDNS", "CDW", "CEG", "CHTR", "CMCSA", "COST", "CPRT", "CRWD", 
  "CSCO", "CSGP", "CSX", "CTAS", "CTSH", "DASH", "DDOG", "DXCM", "EA", "EXC", 
  "FANG", "FAST", "FTNT", "GEHC", "GFS", "GILD", "GOOG", "GOOGL", "HON", "IDXX", 
  "INTC", "INTU", "ISRG", "KDP", "KHC", "KLAC", "LIN", "LRCX", "LULU", "MAR", 
  "MCHP", "MDB", "MDLZ", "MELI", "META", "MNST", "MRVL", "MSFT", "MSTR", "MU", 
  "NFLX", "NVDA", "NXPI", "ODFL", "ON", "ORLY", "PANW", "PAYX", "PCAR", "PDD", 
  "PEP", "PLTR", "PYPL", "QCOM", "REGN", "ROP", "ROST", "SBUX", "SNPS", "TEAM", 
  "TMUS", "TSLA", "TTD", "TTWO", "TXN", "VRSK", "VRTX", "WBD", "WDAY", "XEL", "ZS"
];
// Subscribe to Finnhub WebSocket for live updates
externalSocket.on("open", () => {
  console.log("Connected to Finnhub WebSocket");

  // Subscribe to AAPL, TSLA, and BTC
  symbolsArray.forEach((symbol) => {
    externalSocket.send(JSON.stringify({ type: "subscribe", symbol }));
  });
});

// Handle incoming messages from Finnhub
externalSocket.on("message", (data) => {
  const parsedData = JSON.parse(data);

  if (parsedData.type === "trade") {
    parsedData.data.forEach((trade) => {
      const symbol = trade.s; // Symbol name
      const price = trade.p; // Latest price

      // Update only if the symbol exists in our tracking list
      if (symbols[symbol] !== undefined) {
        symbols[symbol] = { price, time: new Date().toISOString() };
      }
    });

    console.log("Updated symbols:", symbols);
  }
});

// Handle errors
externalSocket.on("error", (error) => {
  console.error("Finnhub WebSocket error:", error);
});

// Handle WebSocket connection closure
externalSocket.on("close", () => {
  console.log("Finnhub WebSocket closed. Reconnecting...");
  setTimeout(() => {
    externalSocket = new WebSocket(FINNHUB_SOCKET_URL);
  }, 3000); // Reconnect after 5 seconds
});

// WebSocket server for client connections
wss.on("connection", (ws) => {
  console.log("New client connected");
  
  // Send the latest stock prices immediately upon connection
  ws.send(JSON.stringify(symbols));

  // Periodically send updates every 2 seconds
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(symbols));
    }
  }, 3000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

// Start the WebSocket server on port 8080
server.listen(8080, () => {
  console.log("WebSocket server running on ws://localhost:8080");
});

console.log("Server is running...");
