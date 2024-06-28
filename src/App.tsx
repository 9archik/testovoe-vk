import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage";
import NewsPage from "./pages/newsPage/newsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/news/:id" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
