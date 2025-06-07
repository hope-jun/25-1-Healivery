import { CartProvider } from './contexts/CartContext';
import { NutritionSettingProvider } from './contexts/NutritionSettingContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StoreDetail from './pages/StoreDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyPage from './pages/MyPage';

function App() {
  return (
    <NutritionSettingProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store/:id" element={<StoreDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </NutritionSettingProvider>
  );
}

export default App;