import React, { useState } from "react";

function SelfIntroTest() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    alert("분석 요청 완료: \n" + text);
    // 추후 여기에 API 호출 연결 가능
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">자기소개서 분석</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="자기소개서를 입력하세요..."
        className="w-full h-40 p-4 border rounded-lg resize-none"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold"
      >
        분석 시작
      </button>
    </div>
  );
}

export default SelfIntroTest;
