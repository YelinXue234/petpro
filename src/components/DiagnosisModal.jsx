import { useState } from 'react'

export default function DiagnosisModal({ isOpen, onClose, user }) {
    const [step, setStep] = useState(1)
    const [symptomText, setSymptomText] = useState('眼睛流泪一周了，左眼比较严重，有点睁不开')
    const [answers, setAnswers] = useState({})
    const [petImages, setPetImages] = useState([])

    if (!isOpen) return null

    const resetModal = () => {
        setStep(1)
        setAnswers({})
        setPetImages([])
    }

    const handleClose = () => {
        resetModal()
        onClose()
    }

    // 处理图片上传
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        if (files.length + petImages.length > 3) {
            alert('最多只能上传3张照片')
            return
        }
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = (event) => {
                setPetImages(prev => [...prev, event.target.result])
            }
            reader.readAsDataURL(file)
        })
    }

    const removeImage = (index) => {
        setPetImages(prev => prev.filter((_, i) => i !== index))
    }

    // 步骤2 选择答案后跳转到宠智灵
    const handleAnswer = (questionId, answer) => {
        const newAnswers = { ...answers, [questionId]: answer }
        setAnswers(newAnswers)
        if (Object.keys(newAnswers).length >= 3) {
            setStep(4) // 直接跳转到宠智灵报告页
        }
    }

    const renderStep = () => {
        // 步骤1：描述症状 + 上传照片
        if (step === 1) {
            return (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={handleClose} className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-lg font-black">✕</button>
                        <div className="text-xs font-black text-ink-500">第 1 步 / 共 2 步</div>
                    </div>
                    <div className="progress-track mb-6"><div className="progress-fill" style={{ width: '50%' }}></div></div>

                    <h2 className="font-display text-2xl font-black leading-tight mb-1">告诉我咪咪怎么了？</h2>
                    <p className="text-sm text-ink-500 font-bold mb-5">拍照并描述症状，AI 会帮你分析</p>

                    {/* 上传照片 */}
                    <p className="font-black text-sm mb-2">📸 拍照或上传照片</p>
                    <p className="text-xs text-ink-500 font-bold mb-3">皮肤、眼睛、便便、行为录像都可以</p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {petImages.map((img, idx) => (
                            <div key={idx} className="aspect-square rounded-2xl bg-gradient-to-br from-mint-soft to-yellow-soft relative">
                                <img src={img} alt="宠物照片" className="w-full h-full object-cover rounded-2xl" />
                                <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white shadow text-xs flex items-center justify-center">✕</button>
                            </div>
                        ))}
                        {petImages.length < 3 && (
                            <label className="aspect-square rounded-2xl border-2 border-dashed border-ink-300 flex items-center justify-center text-2xl text-ink-300 cursor-pointer">
                                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageUpload} multiple />
                                <span>+</span>
                            </label>
                        )}
                    </div>

                    {/* 症状描述 */}
                    <p className="font-black text-sm mb-2">✍️ 描述症状</p>
                    <div className="bg-white rounded-2xl p-4 shadow-soft mb-6">
                        <textarea 
                            className="w-full outline-none text-sm font-bold bg-transparent resize-none" 
                            rows="3" 
                            placeholder="例如：眼睛流泪、没精神、食欲不振..."
                            value={symptomText} 
                            onChange={e => setSymptomText(e.target.value)} 
                        />
                    </div>

                    <button onClick={() => setStep(2)} className="btn-primary w-full py-4 rounded-2xl text-base">下一步 →</button>
                </div>
            )
        }

        // 步骤2：追问（简化版，答完直接跳转）
        if (step === 2) {
            return (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setStep(1)} className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-lg font-black">←</button>
                        <div className="text-xs font-black text-ink-500">第 2 步 / 共 2 步</div>
                    </div>
                    <div className="progress-track mb-6"><div className="progress-fill" style={{ width: '100%' }}></div></div>

                    <div className="flex items-start gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-brand to-yellow-brand flex items-center justify-center text-xl shrink-0 ring-2 ring-white shadow-pop">🤖</div>
                        <div className="flex-1">
                            <div className="bg-white rounded-3xl rounded-tl-md p-4 shadow-soft">
                                <p className="text-xs font-black text-orange-deep mb-1">AI 兽医助手</p>
                                <p className="font-black text-base leading-snug">再回答几个问题，诊断会更准确～</p>
                            </div>
                        </div>
                    </div>

                    {/* 问题1 */}
                    <div className="bg-yellow-soft/40 rounded-3xl p-4 mb-3">
                        <p className="text-xs font-black text-orange-deep mb-2">问题 1 / 3</p>
                        <p className="font-black text-base mb-3">分泌物的颜色是？</p>
                        <div className="space-y-2">
                            {['透明 / 略带黄色', '黄绿色脓性分泌物', '几乎没有，只是流泪', '带血丝'].map(opt => (
                                <div key={opt} className={`choice-card rounded-2xl p-3 flex items-center gap-3 ${answers.q1 === opt ? 'selected' : ''}`} onClick={() => handleAnswer('q1', opt)}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cream to-yellow-soft flex items-center justify-center text-xs font-black">•</div>
                                    <span className="text-sm font-bold">{opt}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 问题2 */}
                    <div className="bg-mint-soft/30 rounded-3xl p-4 mb-3">
                        <p className="text-xs font-black text-mint-deep mb-2">问题 2 / 3</p>
                        <p className="font-black text-base mb-3">有没有频繁眨眼或抓挠眼睛？</p>
                        <div className="grid grid-cols-2 gap-2">
                            {['没有', '经常抓'].map(opt => (
                                <div key={opt} className={`choice-card rounded-2xl p-3 text-center ${answers.q2 === opt ? 'selected' : ''}`} onClick={() => handleAnswer('q2', opt)}>
                                    <p className="text-2xl mb-1">{opt === '没有' ? '😺' : '😿'}</p>
                                    <p className="text-sm font-bold">{opt}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 问题3 */}
                    <div className="bg-orange-soft/40 rounded-3xl p-4 mb-6">
                        <p className="text-xs font-black text-orange-deep mb-2">问题 3 / 3</p>
                        <p className="font-black text-base mb-3">最近食欲和精神怎么样？</p>
                        <div className="grid grid-cols-3 gap-2">
                            {['正常', '略差', '很差'].map(opt => (
                                <div key={opt} className={`choice-card rounded-2xl p-3 text-center ${answers.q3 === opt ? 'selected' : ''}`} onClick={() => handleAnswer('q3', opt)}>
                                    <p className="text-2xl mb-1">{opt === '正常' ? '😸' : opt === '略差' ? '😾' : '🙀'}</p>
                                    <p className="text-xs font-bold">{opt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }

        // 步骤4：宠智灵 AI 诊断界面（最终页）
        if (step === 4) {
            // 宠智灵 H5 地址（请替换成你从后台复制的完整链接）
            const chongzhilingUrl = 'https://h5.chongzhiling.com/pages/condition/info?ind=1&type=picture&access_token=你的token'

            return (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={handleClose} className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-lg font-black">←</button>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-base">🔖</button>
                            <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-base">↗</button>
                        </div>
                    </div>

                    <h1 className="font-display text-2xl font-black text-center mb-4">🐾 AI 智能诊断</h1>

                    {/* 宠智灵诊断 iframe */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-3 mb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🤖</span>
                            <h3 className="font-black">AI 视觉诊断</h3>
                        </div>
                        <iframe
                            src={chongzhilingUrl}
                            title="宠智灵诊断"
                            className="w-full rounded-xl border-0"
                            style={{ height: '500px' }}
                            allow="camera; microphone"
                        />
                        <p className="text-xs text-gray-400 text-center mt-2">
                            点击上方区域拍照，AI 将实时分析宠物状况
                        </p>
                    </div>

                    {/* 建议就医 */}
                    <div className="bg-gradient-to-r from-orange-soft to-yellow-soft rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span>⚠️</span>
                            <p className="font-black">温馨提示</p>
                        </div>
                        <p className="text-sm text-gray-700">
                            诊断结果仅供参考。如果宠物症状持续或加重，请及时带它前往正规宠物医院就诊。
                        </p>
                    </div>

                    <button onClick={handleClose} className="btn-primary w-full py-4 rounded-2xl text-base mb-2">
                        完成诊断
                    </button>
                </div>
            )
        }
    }

    return (
        <div className="fixed inset-0 bg-cream z-50 overflow-y-auto">
            <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
                {renderStep()}
            </div>
        </div>
    )
}