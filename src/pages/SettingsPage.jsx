import { useState } from 'react'

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="font-bold">深色模式</span>
          <button onClick={() => setDarkMode(!darkMode)} className={`px-4 py-1 rounded-full text-sm font-bold ${darkMode ? 'bg-orange-brand text-white' : 'bg-gray-200 text-gray-600'}`}>
            {darkMode ? '开' : '关'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-soft">
        <h2 className="font-black text-lg mb-3">账号管理</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>修改密码</span>
            <span className="text-orange-deep text-sm">→</span>
          </div>
          <div className="flex justify-between items-center">
            <span>注销账号</span>
            <span className="text-red-500 text-sm">→</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-soft">
        <h2 className="font-black text-lg mb-3">关于</h2>
        <p className="text-sm text-ink-700">PetPro v1.0.0</p>
        <p className="text-xs text-ink-500 mt-2">让养宠更简单，更温暖</p>
      </div>
    </div>
  )
}