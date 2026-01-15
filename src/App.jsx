import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

function App() {
  // Simple path-based rendering so /shop loads the Shop page directly
  const path = window.location.pathname || "/";
  const isShop = path.startsWith("/shop");

  if (isShop) {
    // Render the shop page inside the MainLayout so it shares header/footer and theme
    return (
      <MainLayout>
        <Shop />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}

export default App;
