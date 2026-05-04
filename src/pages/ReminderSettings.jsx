import { useState } from 'react'

export default function ReminderSettings() {
  const [reminders, setReminders] = useState({
    vaccine: true,
    deworm: true,
    checkup: false,
  })

  const toggle = (key) => {
    setReminders(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl p-5 shadow-soft">
        <h2 className="font-black text-lg mb-3">提醒开关</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>💉 疫苗接种提醒</span>
            <button onClick={() => toggle('vaccine')} className={`px-4 py-1 rounded-full text-sm font-bold ${reminders.vaccine ? 'bg-orange-brand text-white' : 'bg-gray-200 text-gray-600'}`}>
              {reminders.vaccine ? '开' : '关'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>🐛 驱虫提醒</span>
            <button onClick={() => toggle('deworm')} className={`px-4 py-1 rounded-full text-sm font-bold ${reminders.deworm ? 'bg-orange-brand text-white' : 'bg-gray-200 text-gray-600'}`}>
              {reminders.deworm ? '开' : '关'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>🏥 年度体检提醒</span>
            <button onClick={() => toggle('checkup')} className={`px-4 py-1 rounded-full text-sm font-bold ${reminders.checkup ? 'bg-orange-brand text-white' : 'bg-gray-200 text-gray-600'}`}>
              {reminders.checkup ? '开' : '关'}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-soft">
        <h2 className="font-black text-lg mb-3">提醒时间设置</h2>
        <div className="space-y-2 text-sm">
          <p>疫苗提醒：到期前 7 天</p>
          <p>驱虫提醒：到期前 3 天</p>
          <p>体检提醒：到期前 14 天</p>
        </div>
      </div>
    </div>
  )
}