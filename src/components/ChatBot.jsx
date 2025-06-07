import React, { useState, useRef, useEffect } from "react";

function ChatBot() {
  // const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const [messages, setMessages] = useState([
    { sender: "bot", text: "오늘도 건강한 하루되세요! 균형잡힌 식단 및 영양정보를 제공해드릴게요😊" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    console.log("✅ KEY:", API_KEY);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `사용자와 계속 대화 중인 것처럼 자연스럽게 반응해. 너무 형식적인 문장보다는 말하듯 편하게 알려줘(-해요 체). 대답은 본론부터 바로 시작해도 좋아.답변 길이는 50자 이내야. 사용자가 식단이나 영양정보에 대해 물어보면 아래 형식으로 한끼 기준으로 얼마나(g, kcal 단위) 섭취 기준을 잡으면 되는지 핵심만 조리 있게 설명해줘 \n 🔥칼로리: \n 🥩단백질: \n 🍚탄수화물: \n 🧈지방: \n 🧂나트륨: \n💡이유:\n\n질문: ${input}` }],
              },
            ],
          }),
        generationConfig: {
            maxOutputTokens: 300,  // 최대 출력 길이
            temperature: 0.6,      // 창의성 (0.0 ~ 1.0)
            topP: 0.9,
            topK: 40
          }
        }
      );

      const data = await res.json();
      console.log("🔵 Gemini 응답:", data);

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ 적절한 응답을 받지 못했어요.";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("🔴 Gemini API 호출 오류:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ 오류가 발생했어요. 다시 시도해주세요." },
      ]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 12,
        maxWidth: 480,
        height: 500,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        margin: "0 auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* 채팅 내용 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          background: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                background: msg.sender === "user" ? "#1ED877" : "#e0e0e0",
                color: msg.sender === "user" ? "#fff" : "#222",
                padding: "0.6rem 0.9rem",
                borderRadius: 16,
                maxWidth: "70%",
                fontSize: "0.80rem",
                lineHeight: "1.4",
                textAlign:  "left",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #eee",
          padding: "0.75rem",
          background: "#fff",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="헬스 후 한 끼 적정 섭취량을 알려줘!"
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: "0.95rem",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: 8,
            padding: "0.5rem 1rem",
            background: "#1ED877",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatBot;