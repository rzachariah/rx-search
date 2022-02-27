// App.tsx

import * as React from "react";
import { render } from "react-dom";

import { Search } from "./Search";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Search />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
