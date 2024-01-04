import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Planner from "./pages/Planner";
import Home from "./pages/Home";
import { ConfigProvider, ThemeConfig } from "antd";

const theme: ThemeConfig = {
  components: {
    Input: {
      colorPrimary: "#f87060",
      algorithm: true,
    },
    Select: {
      colorPrimary: "#f87060",
      algorithm: true,
    },
    DatePicker: {
      colorPrimary: "#f87060",
      algorithm: true,
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="planner" element={<Planner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
