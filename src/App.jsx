import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Stores from "./pages/Stores";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ui/ScrollToTop";

import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="nosotros" element={<About />} />
          <Route path="tiendas" element={<Stores />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
