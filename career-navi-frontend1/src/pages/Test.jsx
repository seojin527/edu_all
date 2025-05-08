import React from "react";
import { useNavigate } from "react-router-dom";

const testList = [
  { title: "성향 검사", duration: "15 minutes", active: true, path: "/test/personality" },
  { title: "흥미 검사", duration: "15 minutes", active: true, path: "/test/interest" },
  { title: "활동 내역 분석", duration: "10 minutes", active: true, path: "/test/activity" },
  // ✅ 자기소개서 분석도 이제 클릭 가능
  { title: "자기소개서 분석", duration: "10 minutes", active: true, path: "/test/selfintro" },
  { title: "희망 직업군 선택", duration: "5 minutes", active: false },
];

function TestList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-purple-50">
      <div className="flex gap-10">
        {/* 왼쪽 테스트 리스트 */}
        <div className="space-y-4 w-80">
          {testList.map((test, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-white shadow rounded-full px-4 py-3"
            >
              <div>
                <p className="font-semibold">{test.title}</p>
                <p className="text-sm text-gray-400">{test.duration}</p>
              </div>
              <button
                disabled={!test.active}
                onClick={() => test.path && navigate(test.path)}
                className={`text-white text-sm font-semibold px-4 py-2 rounded-full transition ${
                  test.active
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                ▶ Play
              </button>
            </div>
          ))}
        </div>

        {/* 오른쪽 결과 확인 버튼 */}
        <div className="flex items-center">
          <button className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold px-6 py-10 rounded-2xl shadow-xl text-lg">
            결과 확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestList;
