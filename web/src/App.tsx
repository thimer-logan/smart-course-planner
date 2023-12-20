import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Planner from "./pages/Planner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Planner />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
