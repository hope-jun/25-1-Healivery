import React, { useState } from "react";
import { useNutritionSetting } from "../contexts/NutritionSettingContext";
import ChatBot from "../components/ChatBot";


const presets = {
  헬스인: { calories: 600, protein: 50, fat: 30, carbs: 100, sodium: 800 },
  비건인: { calories: 500, protein: 20, fat: 15, carbs: 70, sodium: 500 },
};

function MyPage() {
  const user = {
    name: "변준형",
    email: "jkj_ByeonIrving@yonsei.ac.kr",
    profile: "/images/person.png",
  };
  const { setting, updateSetting } = useNutritionSetting();
  const [category, setCategory] = useState("개별 맞춤형");
  const [form, setForm] = useState(setting);
  const [saved, setSaved] = useState(false);

  const handlePreset = (type) => {
    setCategory(type);
    setForm(presets[type]);
  };

  const handleChange = (e) => {
    if (category !== "개별 맞춤형") return; // 비활성화 보호
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSetting(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "1.5rem 1rem", textAlign: "center" }}>
      <div className="card" style={{ marginTop: "2rem", border: "3px solid #1ED877", boxShadow: "0 2px 12px rgba(30,216,119,0.13)" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1ED877", marginBottom: "1.5rem", letterSpacing: "-1.5px" }}>
          마이페이지
        </h2>

        {/* 프로필 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <img src={user.profile} alt="프로필" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 12 }} />
          <div style={{ fontWeight: "bold", fontSize: "1.15rem", color: "#222" }}>{user.name}</div>
          <div style={{ color: "#888", fontSize: "0.98rem" }}>{user.email}</div>
        </div>

        {/* 카테고리 선택 */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {["개별 맞춤형", "헬스인", "비건인"].map((cat) => (
            <button
              key={cat}
              onClick={() => cat === "개별 맞춤형" ? setCategory(cat) : handlePreset(cat)}
              style={{
                background: category === cat ? "#1ED877" : "#f0f0f0",
                color: category === cat ? "#fff" : "#222",
                borderRadius: 18,
                border: category === cat ? "2px solid #1ED877" : "none",
                padding: "8px 20px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 영양 설정 폼 */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {["calories", "carbs", "protein", "fat",  "sodium"].map((key, i) => {
            const labels = ["열량 (kcal)", "탄수화물 (g)", "단백질 (g)", "지방 (g)", "나트륨 (mg)"];
            return (
              <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{ marginLeft: 12, fontWeight: 500, fontSize: "0.85rem" }}>{labels[i]}</label>
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  min={0}
                  disabled={category !== "개별 맞춤형"}
                  style={{ fontSize: "0.80rem", width: 120, marginLeft: 5, background: category === "개별 맞춤형" ? "#fff" : "#f5f5f5" }}
                />
              </div>
            );
          })}
          <button type="submit" style={{ background: "#1ED877", color: "#fff", fontWeight: "bold", borderRadius: 8, padding: "10px 0", fontSize: "1.1rem", width: "100%", marginTop: 8, marginBottom: 8  }}>
            저장하기
          </button>
          {saved && <div style={{ color: "#1ED877", fontWeight: "bold", marginTop: 8 }}>저장되었습니다!</div>}
        </form>
        <div
          style={{
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#555",
          }}
        >
        💬 식단 고민? <span
            style={{
              backgroundColor: "#1ED877",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "2px",
            }}
          >
            Healivery AI
          </span> 에게 물어보세요!
        </div>

        <ChatBot />
      </div>
    </div>
  );
}

export default MyPage;