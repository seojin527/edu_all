import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ 1. 이전 대화 불러오기
  useEffect(() => {
    axios.get("http://localhost:8080/api/chat/messages")
      .then((res) => {
        setMessages(res.data);
        console.log("✅ 초기 메시지 불러오기 완료");
      })
      .catch((err) => {
        console.error("❌ 메시지 불러오기 오류:", err);
      });
  }, []);

  // ✅ 2. 메시지 전송
  const handleSend = async () => {
    if (!input.trim()) {
      console.log("⚠️ 빈 입력 - 메시지 전송 안 함");
      return;
    }

    const userMessage = {
      role: "user",
      message: input,
    };

    console.log("📤 메시지 전송 시도:", userMessage);

    setInput("");

    try {
      const response = await axios.post("http://localhost:8080/api/chat/send", userMessage);
      console.log("✅ GPT 응답 수신:", response.data);

      setMessages(response.data);
    } catch (error) {
      console.error("❌ 백엔드 호출 오류:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", message: "죄송해요! 답변을 가져오지 못했어요." },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col">
      <div className="text-2xl font-bold text-center text-purple-700 py-6">AI 진로 상담</div>

      <div className="flex-1 px-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-4 py-2 rounded-2xl shadow text-sm whitespace-pre-line ${
              msg.role === "ai"
                ? "bg-white text-left text-gray-700 self-start"
                : "bg-purple-500 text-white self-end ml-auto"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="border-t bg-white p-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-600"
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default Chat;
