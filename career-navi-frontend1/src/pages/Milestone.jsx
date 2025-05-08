import React from "react";

function Milestone() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-cyan-100 flex flex-col items-center py-10 px-4 font-sans">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">커리어 마일스톤</h1>

      {/* 마일스톤 진행률 카드 */}
      <div className="w-full max-w-md space-y-6 mb-10">
        {[
          { label: "학업 성취도", value: 80 },
          { label: "자기소개서", value: 60 },
          { label: "진로 활동", value: 50 },
          { label: "포트폴리오", value: 30 },
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">{item.label}</span>
              <span className="text-sm text-gray-500">{item.value}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* 달력 + 투두리스트 */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* 성취도 수치 */}
        <div className="text-lg font-semibold text-gray-700 mb-2">성취도 <span className="text-purple-600">42%</span></div>

        {/* 달력 UI */}
        <div className="grid grid-cols-7 text-sm text-gray-600 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center font-semibold">{day}</div>
          ))}
          {Array(2).fill(null).map((_, i) => (
            <div key={"empty-" + i}></div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
            <div
              key={day}
              className={`text-center py-1 ${day === 26 ? "text-white bg-purple-500 rounded-full font-bold" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* To Do List */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
          {[
            { label: "독후감 쓰기", due: "이번 주 마감", checked: true },
            { label: "자기소개서 쓰기", due: "오늘 마감", checked: false },
            { label: "진로 백과사전 탐색", due: "이번 주간 진행", checked: false },
            { label: "진로 상담 받기", due: "6월 29일 마감", checked: true },
            { label: "더위활동 보고서 쓰기", due: "6월 29일 마감", checked: true },
            { label: "캘린더 일정 등록", due: "내일 마감", checked: false },
          ].map((task, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
              <div>
                <p className="font-medium">{task.label}</p>
                <p className="text-xs text-gray-500">{task.due}</p>
              </div>
              <input type="checkbox" checked={task.checked} readOnly className="form-checkbox w-5 h-5 text-purple-500" />
            </div>
          ))}
        </div>
      </div>

      {/* 하단 네비게이션 바 */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center h-14 shadow-inner mt-10">
        <button className="text-purple-600 text-xl">🏠</button>
        <button className="text-purple-600 text-xl">📊</button>
        <button className="text-purple-600 text-xl">💬</button>
        <button className="text-purple-600 text-xl">⚙️</button>
      </div>
    </div>
  );
}

export default Milestone;