import React from "react";
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1rem', textAlign: 'center' }}>
      <div className="card" style={{ marginTop: '2rem', border: '2px solid #1ED877', boxShadow: '0 2px 12px rgba(30,216,119,0.13)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1ED877', marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
          건강한 한 끼, 이제 곧 출발해요 🛵
        </h2>
        <p style={{ color: '#222', fontSize: '1.1rem', marginBottom: '2rem' }}>
        30분 안에 따끈하게 찾아갈게요 😊
        </p>
        <Link to="/">
          <button style={{ width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', background: '#1ED877', color: '#fff', boxShadow: '0 2px 8px rgba(30,216,119,0.13)' }}>
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;