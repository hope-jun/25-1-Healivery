import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import stores from "../data/stores.json";

function Home() {
  const [storeList, setStoreList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    setStoreList(stores);
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    "전체",
    ...Array.from(new Set(stores.flatMap((s) => s.category)))
  ];

  const filteredStores =
    selectedCategory === "전체"
      ? storeList
      : storeList.filter((s) => s.category.includes(selectedCategory));

  const sortedStores = sortBy === "name"
    ? [...filteredStores].sort((a, b) => a.name.localeCompare(b.name))
    : filteredStores;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Hero Section */}
      <div style={{
        background: '#e9fbf3',
        borderRadius: 18,
        padding: '32px 18px 24px 18px',
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 12px rgba(30,216,119,0.08)'
      }}>
        <img src="/images/app_main2.png" alt="Healivery 앱" style={{ width: 120, height: 'auto', marginBottom: 18 }} />
        <h1 style={{ fontSize: '1.7rem', color: '#1ED877', fontWeight: 'bold', margin: 0, letterSpacing: '-1.5px', fontFamily: 'Jua, Apple SD Gothic Neo, Noto Sans KR, sans-serif' }}>
        We’re now in <span style={{ backgroundColor: "#1ED877", padding: "4px 8px", borderRadius: "5px",color: "#fff",}}>Sinchon</span> 🚀 
        </h1>
        <p style={{ color: '#222', fontSize: '1.1rem', margin: '12px 0 0 0', textAlign: 'center', fontWeight: 500 }}>
          내 몸에 맞는 식단, <span style={{ color: '#1ED877', fontWeight: 700 }}>Healivery</span>에서 쉽고 빠르게!
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            style={{
              background: selectedCategory === cat ? '#1ED877' : '#f0f0f0',
              color: selectedCategory === cat ? '#fff' : '#222',
              border: selectedCategory === cat ? '2px solid #1ED877' : 'none',
              borderRadius: '18px',
              padding: '8px 20px',
              fontWeight: selectedCategory === cat ? 'bold' : 'normal',
              fontSize: '1.05rem',
              marginBottom: '6px',
              boxShadow: selectedCategory === cat ? '0 2px 8px rgba(30,216,119,0.13)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setSortBy(sortBy === "name" ? null : "name")}
          style={{
            background: sortBy === "name" ? '#1ED877' : '#f0f0f0',
            color: sortBy === "name" ? '#fff' : '#222',
            border: sortBy === "name" ? '2px solid #1ED877' : 'none',
            borderRadius: '18px',
            padding: '8px 20px',
            fontWeight: sortBy === "name" ? 'bold' : 'normal',
            fontSize: '1.05rem',
            marginBottom: '6px',
            boxShadow: sortBy === "name" ? '0 2px 8px rgba(30,216,119,0.13)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          이름순 정렬
        </button>
      </div>

      {sortedStores.length === 0 && (
        <div style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }}>
          해당 카테고리 매장이 없습니다.
        </div>
      )}

      {sortedStores.map((store) => (
        <div
          key={store.id}
          className="card"
          style={{ display: 'flex', alignItems: 'center', gap: '18px', border: '2px solid #1ED877' }}
        >
          <img
            src={store.storeImage}
            alt={store.name}
            style={{ width: 80, height: 80, borderRadius: 14, objectFit: 'cover', background: '#eee', border: '0px solid #1ED877' }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#222' }}>{store.name}</h3>
            <p style={{ color: '#1ED877', fontWeight: 'bold', margin: '4px 0 8px 0', fontSize: '1rem' }}>{store.category.join(' · ')}</p>
            <Link to={`/store/${store.id}`} style={{ color: '#fff', background: '#1ED877', borderRadius: 8, padding: '6px 16px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.98rem', boxShadow: '0 2px 8px rgba(30,216,119,0.13)' }}>
              메뉴 보기
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;