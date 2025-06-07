import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Navbar() {
  const location = useLocation();
  const { state } = useCart();
  const cartCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav style={{
      background: '#fff',
      borderRadius: '0 0 18px 18px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      padding: '18px 48px 12px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/images/healivery_logo4.png" alt="Healivery 로고" style={{ height: 38, marginRight: 12 }} />
      </Link>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/" style={navStyle(location.pathname === '/')}>홈</Link>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Link to="/cart" style={navStyle(location.pathname === '/cart')}>장바구니</Link>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              zIndex: 0,
              top: -12,
              right: -18,
              background: '#1ED877',
              color: '#fff',
              borderRadius: '50%',
              minWidth: 17,
              height: 17,
              fontSize: 11,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(42,193,188,0.08)',
              border: '2px solid #fff',
            }}>{cartCount}</span>
          )}
        </div>
        <Link to="/mypage" style={navStyle(location.pathname === '/mypage')}>마이페이지</Link>
      </div>
    </nav>
  );
}

function navStyle(active) {
  return {
    color: active ? '#1ED877' : '#222',
    fontWeight: active ? 'bold' : 'normal',
    fontSize: '1.1rem',
    textDecoration: 'none',
    padding: '4px 0',
    borderBottom: active ? '2.5px solid #1ED877' : 'none',
    transition: 'border 0.2s',
  };
}

export default Navbar;