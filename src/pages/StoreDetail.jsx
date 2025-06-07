import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stores from "../data/stores.json";
import { useCart } from "../contexts/CartContext";

function HexagonChart({ nutrition }) {
  const maxValues = {
    calories: 600,
    protein: 30,
    fat: 25,
    carbs: 60,
    sodium: 600
  };

  const getPoints = (value, max, index) => {
    const angle = (index * 2 * Math.PI) / 5;
    const radius = (value / max) * 35;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return `${x},${y}`;
  };

  const points = [
    getPoints(nutrition.calories / maxValues.calories * 100, 100, 0),
    getPoints(nutrition.protein / maxValues.protein * 100, 100, 1),
    getPoints(nutrition.fat / maxValues.fat * 100, 100, 2),
    getPoints(nutrition.carbs / maxValues.carbs * 100, 100, 3),
    getPoints(nutrition.sodium / maxValues.sodium * 100, 100, 4),
    getPoints(nutrition.calories / maxValues.calories * 100, 100, 0)
  ].join(' ');

  const getLabelPosition = (index) => {
    const angle = (index * 2 * Math.PI) / 5;
    const radius = 45; // 레이블 위치를 그래프보다 약간 바깥으로
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y };
  };

  const labels = [
    { text: '열량', value: `${nutrition.calories}kcal` },
    { text: '단백질', value: `${nutrition.protein}g` },
    { text: '지방', value: `${nutrition.fat}g` },
    { text: '탄수화물', value: `${nutrition.carbs}g` },
    { text: '나트륨', value: `${nutrition.sodium}mg` }
  ];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '160px',
      marginTop: '12px',
      padding: '10px'
    }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ margin: '0 auto' }}>
        {/* 배경 육각형 */}
        <polygon
          points="50,0 100,25 100,75 50,100 0,75 0,25"
          fill="none"
          stroke="#eee"
          strokeWidth="1"
        />
        {/* 데이터 육각형 */}
        <polygon
          points={points}
          fill="#1ED877"
          fillOpacity="0.3"
          stroke="#1ED877"
          strokeWidth="1"
        />
        {/* 레이블과 값 */}
        {labels.map((label, index) => {
          const pos = getLabelPosition(index);
          return (
            <g key={index}>
              <text
                x={pos.x}
                y={pos.y - 5}
                textAnchor="middle"
                fontSize="6"
                fill="#666"
              >
                {label.text}
              </text>
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize="6"
                fill="#666"
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
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#666'
      }}>
        영양정보
      </div>
    </div>
  );
}

function NutritionInfo({ nutrition }) {
  const getColor = (type, value) => {
    const thresholds = {
      calories: { low: 400, high: 600 },
      protein: { low: 10, high: 40 },
      fat: { low: 20, high: 30 },
      carbs: { low: 30, high: 100 },
      sodium: { low: 500, high: 1000 }
    };

    if (value <= thresholds[type].low) return '#1ED877';
    if (value <= thresholds[type].high) return '#FFB800';
    return '#FF4B4B';
  };

  const nutritionInfo = {
    calories: { label: '열량', unit: 'kcal' },
    protein: { label: '단백질', unit: 'g' },
    fat: { label: '지방', unit: 'g' },
    carbs: { label: '탄수화물', unit: 'g' },
    sodium: { label: '나트륨', unit: 'mg' }
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '8px',
        padding: '8px',
        background: '#f8f8f8',
        borderRadius: '8px'
      }}>
        {Object.entries(nutrition).map(([key, value]) => (
          <div key={key} style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>
              {nutritionInfo[key].label}
            </div>
            <div style={{ 
              fontSize: '0.9rem', 
              fontWeight: 'bold',
              color: getColor(key, value)
            }}>
              {value}{nutritionInfo[key].unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreDetail() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const { dispatch } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const found = stores.find((s) => s.id === Number(id));
    setStore(found);
  }, [id]);

  const handleAddCart = (menu) => {
    dispatch({ type: 'ADD_ITEM', payload: menu });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1500);
  };

  if (!store) return <div>매장을 찾을 수 없습니다.</div>;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {showMessage && (
        <div style={{ background: '#1ED877', color: '#fff', borderRadius: 10, padding: '10px', textAlign: 'center', marginBottom: 18, fontWeight: 'bold', fontSize: '1.05rem', boxShadow: '0 2px 8px rgba(30,216,119,0.13)' }}>
          장바구니에 추가되었습니다!
        </div>
      )}
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#222', marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>{store.name}</h2>

      {store.menu && store.menu.length > 0 ? (
        store.menu.map((menu) => (
          <div
            key={menu.name}
            className="card"
            style={{ display: 'flex', alignItems: 'center', marginBottom: '22px', gap: '18px', border: '2px solid #1ED877' }}
          >
            <img
              src={menu.image || '/images/app_main2.png'}
              alt={menu.name}
              style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: 14, background: '#eee', border: '0px solid #1ED877' }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 'bold', color: '#222' }}>{menu.name}</h3>
              <p style={{ color: '#888', margin: '6px 0', fontSize: '0.98rem' }}>{menu.description || ''}</p>
              {menu.nutrition && <NutritionInfo nutrition={menu.nutrition} />}
              <p style={{ fontWeight: 'bold', color: '#1ED877', fontSize: '1.05rem', marginTop: '8px' }}>{menu.price.toLocaleString()}원</p>
              <button
                onClick={() => handleAddCart(menu)}
                style={{ marginTop: '8px', width: '100%', borderRadius: 8, fontWeight: 'bold', fontSize: '1rem', background: '#1ED877', boxShadow: '0 2px 8px rgba(30,216,119,0.13)' }}
              >
                장바구니에 담기
              </button>
            </div>
          </div>
        ))
      ) : (
        <div style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem', fontSize: '1.1rem' }}>
          등록된 메뉴가 없습니다.
        </div>
      )}
    </div>
  );
}

export default StoreDetail;