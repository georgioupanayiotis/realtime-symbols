import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const SOCKET_URL = "ws://localhost:8080"; // WebSocket server URL

const RealtimeSymbols = () => {
  const [symbols, setSymbols] = useState({});

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      console.log("Raw WebSocket message:", event.data); // Debugging log

      try {
        const data = JSON.parse(event.data);
        console.log("Parsed data:", data);

        setSymbols((prevSymbols) => {
          const updatedSymbols = { ...prevSymbols };

          Object.entries(data).forEach(([symbol, newData]) => {
            if (newData && newData.price !== null) {
              const prevPrice = prevSymbols[symbol]?.price || newData.price;
              const priceChange = newData.price - prevPrice;
              const percentageChange =
                prevPrice !== 0 ? ((priceChange / prevPrice) * 100).toFixed(2) : "0.00";

              updatedSymbols[symbol] = {
                price: newData.price,
                change: priceChange.toFixed(2),
                percentageChange,
              };
            }
          });

          return updatedSymbols;
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Real-time Nasdaq Stock Prices
      </Typography>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Symbol</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Change</strong></TableCell>
                <TableCell><strong>% Change</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(symbols).map(([symbol, data]) => (
                <TableRow key={symbol}>
                  <TableCell>{symbol}</TableCell>
                  <TableCell>{data.price ? `$${data.price.toFixed(2)}` : "N/A"}</TableCell>
                  <TableCell style={{ color: data.change >= 0 ? "green" : "red" }}>
                    {data.change ? `${data.change} USD` : "N/A"}
                  </TableCell>
                  <TableCell style={{ color: data.percentageChange >= 0 ? "green" : "red" }}>
                    {data.percentageChange ? `${data.percentageChange}%` : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RealtimeSymbols;
