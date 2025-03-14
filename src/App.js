import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RealtimeSymbols from "./RealtimeSymbols";
import IBANCalculator from "./IBANCalculator";
import { Container, AppBar, Toolbar, Button } from "@mui/material";

function App() {
  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/symbols">Realtime Symbols</Button>
            <Button color="inherit" component={Link} to="/iban">IBAN Calculator</Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<h1>Welcome to the App</h1>} />
          <Route path="/symbols" element={<RealtimeSymbols />} />
          <Route path="/iban" element={<IBANCalculator />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
