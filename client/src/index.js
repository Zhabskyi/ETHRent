import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";
import BlockchainState from "./context/blockchain/blockchainState";

ReactDOM.render(
  <BlockchainState>
    <App />
  </BlockchainState>,
  document.getElementById("root")
);
