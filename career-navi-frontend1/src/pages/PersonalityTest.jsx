import React from "react";

function PersonalityTest() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">성향 검사</h2>
      <p className="text-gray-700">이곳에서 성향 관련 질문을 보고 응답을 선택하세요.</p>

      {/* 샘플 질문 */}
      <div className="mt-6 space-y-4">
        {["나는 사람들과 어울리는 것을 좋아한다.", "나는 계획적인 편이다."].map((q, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <p className="mb-2">{q}</p>
            <div className="flex gap-3">
              {["전혀 아니다", "아니다", "보통", "그렇다", "매우 그렇다"].map((opt, j) => (
                <button
                  key={j}
                  className="px-3 py-1 bg-gray-100 hover:bg-purple-100 rounded-full text-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalityTest;
