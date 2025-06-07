import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useNutritionSetting } from "../contexts/NutritionSettingContext";
import React, { useState } from "react";

function HexagonChart({ nutrition }) {
  const { setting: singleMeal } = useNutritionSetting();
  const maxValues = {
    calories: singleMeal.calories * 2, // 3끼 기준
    protein: singleMeal.protein * 2,
    fat: singleMeal.fat * 2,
    carbs: singleMeal.carbs * 2,
    sodium: singleMeal.sodium * 2
  };
  const backgroundPoints = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 2 * Math.PI) / 5;
    const radius = 50;
    const x = 70 + radius * Math.cos(angle - Math.PI / 2);
    const y = 70 + radius * Math.sin(angle - Math.PI / 2);
    return `${x},${y}`;
  }).join(" ");

  // 한 끼 기준 초과 여부 체크
  const overList = [
    nutrition.calories > singleMeal.calories,
    nutrition.protein > singleMeal.protein,
    nutrition.fat > singleMeal.fat,
    nutrition.carbs > singleMeal.carbs,
    nutrition.sodium > singleMeal.sodium
  ];
  const isOver = overList.some(Boolean);

  const borderColor = isOver ? '#FF4B4B' : '#1ED877';
  const fillColor = isOver ? '#FF4B4B' : '#1ED877';
  const textColor = '#666'; // 항상 회색

  const getPoints = (value, max, index) => {
    const angle = (index * 2 * Math.PI) / 5;
    const radius = (value / max) * 50;
    const x = 70 + radius * Math.cos(angle);
    const y = 70 + radius * Math.sin(angle);
    return `${x},${y}`;
  };

  const points = [
    getPoints(nutrition.calories, maxValues.calories, 0),
    getPoints(nutrition.protein, maxValues.protein, 1),
    getPoints(nutrition.fat, maxValues.fat, 2),
    getPoints(nutrition.carbs, maxValues.carbs, 3),
    getPoints(nutrition.sodium, maxValues.sodium, 4),
    getPoints(nutrition.calories, maxValues.calories, 0)
  ].join(' ');

  const getLabelPosition = (index) => {
    const angle = (index * 2 * Math.PI) / 5;
    const radius = 60;
    const x = 70 + radius * Math.cos(angle);
    const y = 70 + radius * Math.sin(angle);
    return { x, y };
  };

  const labels = [
    { text: '열량', value: `${nutrition.calories}kcal` },
    { text: '단백질', value: `${nutrition.protein}g` },
    { text: '지방', value: `${nutrition.fat}g` },
    { text: '탄수화물', value: `${nutrition.carbs}g` },
    { text: '나트륨', value: `${nutrition.sodium}mg` }
  ];

  const nutrientWarnings = [];

  // 기준 넘지 말아야 할 것들
  if (nutrition.calories > singleMeal.calories) nutrientWarnings.push("⚠️ 열량이 너무 높아요");
  if (nutrition.carbs > singleMeal.carbs) nutrientWarnings.push("⚠️ 탄수화물이 기준보다 많아요");
  if (nutrition.fat > singleMeal.fat) nutrientWarnings.push("⚠️ 지방이 기준보다 많아요");
  if (nutrition.sodium > singleMeal.sodium) nutrientWarnings.push("⚠️ 나트륨이 기준보다 많아요");

  // 기준 넘겨야 하는 단백질
  if (nutrition.protein < singleMeal.protein) {
    nutrientWarnings.push("⚠️ 단백질이 부족해요! 더 챙겨주세요");
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '50%', 
      margin: '12px auto 40px auto',  // 위 12px / 아래 40px / 좌우 auto → 가운데 정렬
      padding: '10px',
      paddingTop: '20px' // 상단 여백 더 넓게
    }}>
      <svg width="100%" height="100%" viewBox="0 0 140 140" style={{ margin: '0 auto' }}>
        {/* 배경 육각형 */}
        <polygon
          points={backgroundPoints}
          fill="none"
          stroke="#eee"
          strokeWidth="1"
        />
        {/* 데이터 육각형 */}
        <polygon
          points={points}
          fill={fillColor}
          fillOpacity="0.3"
          stroke={borderColor}
          strokeWidth="2"
        />
        {/* 레이블과 값 */}
        {labels.map((label, index) => {
          const pos = getLabelPosition(index);
          return (
            <g key={index}>
              <text
                x={pos.x}
                y={pos.y - 7}
                textAnchor="middle"
                fontSize="8"
                fill={textColor}
                fontWeight="normal"
              >
                {label.text}
              </text>
              <text
                x={pos.x}
                y={pos.y + 7}
                textAnchor="middle"
                fontSize="8"
                fill={textColor}
                fontWeight="bold"
              >
                {label.value}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ 
        position: 'absolute', 
        top: '30%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '1rem',
        color: textColor,
        fontWeight: 'bold'
      }}>
        누적 영양정보
      </div>
      <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 40, fontWeight: 'bold', color: isOver ? '#FF4B4B' : '#1ED877', fontSize: '1.05rem' }}>
        {isOver
          ? '⚠️ 권장량을 초과한 영양소가 있어요!'
          : '👍 영양 균형이 잘 맞아요!'}
      </div>
      {nutrientWarnings.length > 0 && (
  <div style={{
    borderTop: '1px solid #eee',
    marginTop: 50,
    paddingTop: 12,
    textAlign: 'left'
  }}>
    <p style={{
      fontWeight: 'bold',
      color: '#666',
      marginBottom: 6,
      fontSize: '0.95rem'
    }}>
      상세 영양 주의사항:
    </p>
    <ul style={{
      color: '#666',
      fontSize: '0.9rem',
      paddingLeft: 18,
      margin: 0
    }}>
      {nutrientWarnings.map((msg, idx) => (
        <li key={idx}>{msg}</li>
      ))}
    </ul>
  </div>
)}
    </div>
  );
}

function getTotalNutrition(cartItems) {
  const total = { calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0 };
  cartItems.forEach(item => {
    if (item.nutrition) {
      total.calories += (item.nutrition.calories || 0) * item.quantity;
      total.protein += (item.nutrition.protein || 0) * item.quantity;
      total.fat += (item.nutrition.fat || 0) * item.quantity;
      total.carbs += (item.nutrition.carbs || 0) * item.quantity;
      total.sodium += (item.nutrition.sodium || 0) * item.quantity;
    }
  });
  return total;
}

function Cart() {
  const { state, dispatch } = useCart();
  const cartItems = state.items;
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalNutrition = getTotalNutrition(cartItems);

  //추가 
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const inputStyle = {
    width: "95%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem"
  };

  const handleOrder = async () => {
    const payload = {
        name,
        address,
        total,
        items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };
  
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzT9VwP0o7WNoLUsvOMv2Ehdc6N_yY-wkLi9uyDB7ONfAp_k5ur3jUl0mkKteKfXP_5/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      alert("주문이 완료되었어요!");
    } catch (err) {
      console.error("❌ 주문 전송 실패:", err);
      alert("주문 처리 중 오류가 발생했어요.");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#222', marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
        🛒 장바구니
      </h2>
      {cartItems.length > 0 && <HexagonChart nutrition={totalNutrition} />}
      {cartItems.length === 0 ? (
        <div style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem', fontSize: '1.1rem' }}>
          장바구니가 비어 있습니다.
        </div>
      ) : (
        <div style={{  background: '#fafafa',
          borderRadius: '12px',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: '20px'}}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '18px', border: '2px solid #1ED877' }}
            >
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#222' }}>{item.name}</h4>
                <p style={{ color: '#1ED877', margin: '4px 0', fontWeight: 'bold', fontSize: '1rem' }}>{item.price.toLocaleString()}원</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button style={{ ...btnStyle, background: '#1ED877' }} onClick={() => dispatch({ type: 'DECREASE', payload: item })}>-</button>
                <span style={{ margin: '0 8px', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.quantity}</span>
                <button style={{ ...btnStyle, background: '#1ED877' }} onClick={() => dispatch({ type: 'INCREASE', payload: item })}>+</button>
              </div>
            </div>
          ))}

          <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1.5px solid #eee' }} />
          <p style={{ fontWeight: 'bold', fontSize: '1.15rem', color: '#222', textAlign: 'right' }}>총 합계: <span style={{ color: '#1ED877' }}>{total.toLocaleString()}원</span></p>
          <div style={{ marginTop: 16 }}>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="연락 가능한 전화번호 알려주세요!"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ ...inputStyle, marginTop: 8 }}
            />
            <input
              type="text"
              placeholder="저희가 배달 갈 주소는 어디죠?🚀"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ ...inputStyle, marginTop: 8 }}
            />
          </div>
          <Link to="/checkout">
            <button style={{ ...orderBtnStyle, background: '#1ED877' }}>주문하기</button>
          </Link>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  width: '32px',
  height: '32px',
  border: 'none',
  background: '#1ED877',
  color: '#fff',
  borderRadius: '8px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(30,216,119,0.13)',
};

const orderBtnStyle = {
  marginTop: '1.5rem',
  width: '100%',
  padding: '16px',
  border: 'none',
  background: '#1ED877',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.15rem',
  borderRadius: '12px',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(30,216,119,0.13)',
};

export default Cart;
