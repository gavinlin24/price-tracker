import Header from "./components/Header";
import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login";
import About from "./pages/About"
import Missing from "./pages/Missing";
import Footer from "./components/Footer";
import { Routes, Route } from 'react-router-dom'
// import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header title="Uniqlo Tracker" />
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
