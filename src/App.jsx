import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Stores from "./pages/Stores";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/tiendas" element={<Stores />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
