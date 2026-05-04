import { useState } from 'react'

export default function FeedbackModal({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState('')
  const [type, setType] = useState('suggestion')

  if (!isOpen) return null

  const handleSubmit = () => {
    alert('感谢您的反馈！我们会尽快处理。')
    onClose()
  }

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-black text-lg">📢 投诉 & 反馈</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-ink-900/8 flex items-center justify-center text-sm font-black">✕</button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-black text-ink-500 mb-1.5 block">类型</label>
            <div className="grid grid-cols-2 gap-2">
              {['suggestion', 'bug', 'complaint'].map(t => (
                <div key={t} className={`radio-opt ${type === t ? 'selected' : ''}`} onClick={() => setType(t)}>
                  <div className="radio-dot"></div>
                  <span>{t === 'suggestion' ? '建议' : t === 'bug' ? 'bug反馈' : '投诉'}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-ink-500 mb-1.5 block">内容</label>
            <textarea rows="4" className="input-field" placeholder="请详细描述..." value={feedback} onChange={e => setFeedback(e.target.value)} />
          </div>
          <button onClick={handleSubmit} className="btn-primary w-full py-3 rounded-2xl text-sm">提交反馈</button>
        </div>
      </div>
    </div>
  )
}