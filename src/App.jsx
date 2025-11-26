import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useCartStore } from "./store/cartStore";
import { useProductListStore } from "./store/productListStore";
import { Layout } from "antd";

function App() {
  useEffect(() => {
    useCartStore.getState().fetchCart();
    useProductListStore.getState().fetchData();
  }, []);

  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
}

export default App;
