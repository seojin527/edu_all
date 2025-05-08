import React from "react";

function InterestTest() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">흥미 검사</h2>
      <p className="text-gray-700">관심 있는 활동에 체크해주세요.</p>

      {/* 샘플 항목 */}
      <div className="mt-6 space-y-3">
        {["요리하기", "기계 조립", "사람 가르치기", "디자인 제작"].map((item, idx) => (
          <label
            key={idx}
            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow"
          >
            <input type="checkbox" className="w-5 h-5 text-purple-500" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default InterestTest;
