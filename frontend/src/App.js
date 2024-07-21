import Header from "./components/Header";
import Layout from "./components/Layout"
import DashLayout from "./components/DashLayout";
import Login from "./pages/Login";
import About from "./pages/About"
import Search from "./pages/Search";
import Missing from "./pages/Missing";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/products"

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const onSearch = async (product) => {
      console.log(product)
      try {
        setIsLoading(true);
        const response = await api.get(`/${product}`);
        setProducts(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error}`);
        }
      } finally {
        setIsLoading(false);
      }
    }
  
  return (
    <div className="App">
      <Header title="Price Tracker" />
      <Routes>
        <Route exact path="/" element={<Layout />} >
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
        </Route>
        <Route exact path="/dash" element={<DashLayout 
          search={search} 
          setSearch={setSearch} 
          onSearch={onSearch} />} 
        >
          <Route exact path="/dash/search" element={<Search 
            products={products} 
            isLoading={isLoading}/>} 
          />
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
