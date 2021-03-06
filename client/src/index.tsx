import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import Customer from "./components/Customer";
import { Theme, ThemeProvider } from "@emotion/react";
import Checkout from "./components/Checkout";
import { ConfigProvider } from "./context/config";
import Subscription from "./components/Subscription";

export const theme: Theme = {
  color: {
    prussianBlue: "#031f99",
    celadonBlue: "#2453c6",
    white: "#F6F7FB",
  } as const,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <BrowserRouter>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/customer">
            <Customer />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/subscription">
            <Subscription />
          </Route>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
