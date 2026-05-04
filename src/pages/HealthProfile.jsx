import { useState } from 'react'

export default function HealthProfile({ onNavigateToHospitals, initialSegment = 'basic' }) {
  // ---- 宠物信息状态 ----
  const [petData, setPetData] = useState(defaultPet)
  const [showEditPetModal, setShowEditPetModal] = useState(false)
  const [editForm, setEditForm] = useState({ ...petData })

  // ---- 过敏记录状态 ----
  const [allergies, setAllergies] = useState([{ id: 1, name: '头孢类抗生素', description: '过敏 · 就诊时请告知医生' }])
  const [showAllergyModal, setShowAllergyModal] = useState(false)
  const [newAllergy, setNewAllergy] = useState({ name: '', description: '' })

  // ---- 界面状态 ----
  const [activeSegment, setActiveSegment] = useState(initialSegment)
  const [openCollapses, setOpenCollapses] = useState({})
  const [modals, setModals] = useState({
    vaccine: false,
    medical: false,
    med: false,
    deworming: false,
  })
  const [newWeight, setNewWeight] = useState(petData.weight)

  // 图片上传预览状态
  const [proofImage, setProofImage] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentProofTitle, setCurrentProofTitle] = useState('')

  // ---- 模拟数据（疫苗、病历、驱虫）----
  const vaccines = [
    { id: 'v1', name: '猫三联 (FVRCP)', status: 'completed', date: '2025-03-10', hospital: '瑞鹏宠物医院', nextDate: '2026-03-10', batch: 'FV-2025-0310' },
    { id: 'v2', name: '狂犬疫苗', status: 'completed', date: '2025-03-10', hospital: '瑞鹏宠物医院', nextDate: '2026-03-10', note: '与猫三联同日接种' },
    { id: 'v3', name: '猫三联（第一针）', status: 'completed', date: '2024-08-20' },
  ]
  const medicalRecords = [
    { id: 'm1', title: '眼睛流泪', date: '2026-04-20', severity: '轻度', diagnosis: '细菌性结膜炎', treatment: '托百士眼药水 × 7天', cost: 280, hospital: '瑞鹏宠物医院' },
    { id: 'm2', title: '呕吐 2 次', date: '2026-02-10', severity: '已痊愈', diagnosis: '急性肠胃炎', treatment: '禁食 12h + 益生菌' },
  ]
  const dewormings = [
    { id: 'd1', type: '体内驱虫', name: '拜耳 Drontal', date: '2026-04-01', nextDate: '2026-05-01', status: 'upcoming' },
    { id: 'd2', type: '体外驱虫', name: '福来恩 Frontline', date: '2026-03-15', nextDate: '2026-04-15', status: 'overdue' },
  ]

  // ---- 辅助函数 ----
  const toggleCollapse = (id) => setOpenCollapses(prev => ({ ...prev, [id]: !prev[id] }))
  const openModal = (name) => setModals(prev => ({ ...prev, [name]: true }))
  const closeModal = (name) => setModals(prev => ({ ...prev, [name]: false }))
  const daysRemaining = (dateStr) => Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24))

  // 体重更新
  const updateWeight = () => {
    setPetData(prev => ({ ...prev, weight: parseFloat(newWeight), lastWeightDate: new Date().toISOString().slice(0,10) }))
  }

  // 过敏记录添加
  const addAllergy = () => {
    if (newAllergy.name.trim()) {
      setAllergies(prev => [...prev, { id: Date.now(), name: newAllergy.name, description: newAllergy.description || '过敏' }])
      setNewAllergy({ name: '', description: '' })
      setShowAllergyModal(false)
    }
  }

  // 图片上传处理（临时预览）
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProofImage(reader.result)
        setShowImageModal(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const openProofUpload = (title) => {
    setCurrentProofTitle(title)
    document.getElementById('proof-file-input').click()
  }

  // 宠物编辑相关
  const openEditPetModal = () => { setEditForm({ ...petData }); setShowEditPetModal(true) }
  const savePetEdit = () => {
    setPetData(editForm)
    setShowEditPetModal(false)
  }
  const calculateAge = (birthDateStr) => {
    const birth = new Date(birthDateStr)
    const today = new Date()
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    if (months < 0) { years--; months += 12 }
    return `${years} 岁 ${months} 个月`
  }
  const handleBirthDateChange = (newDate) => {
    const age = calculateAge(newDate)
    setEditForm({ ...editForm, birthDate: newDate, age })
  }

  // 跳转医院
  const handleExpiredReminder = () => {
    if (onNavigateToHospitals) onNavigateToHospitals()
  }

  return (
    <div className="pb-20">
      {/* 隐藏的文件上传 input */}
      <input type="file" id="proof-file-input" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />

      {/* ===== 头部 ===== */}
      <div className="flex items-center justify-end mb-4">
    <button onClick={openEditPetModal} className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-base">✏️</button>
</div>

      {/* ===== 宠物头部卡片 ===== */}
      <div className="rounded-3xl p-4 mb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B2C 60%, #E5722A 100%)' }}>
        <div className="absolute -right-4 -top-4 text-8xl opacity-15 select-none">🐱</div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center text-4xl ring-2 ring-white/40">🐱</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-white font-display text-2xl font-black">{petData.name}</h2>
              <span className="chip bg-white/25 text-white" style={{ fontSize: '10px' }}>{petData.gender}</span>
            </div>
            <p className="text-white/85 text-xs font-bold">{petData.breed} · {petData.age}</p>
            <p className="text-white/85 text-xs font-bold">{petData.color} · 出生 {petData.birthDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 relative z-10">
          <div className="bg-white/20 backdrop-blur rounded-xl py-2 text-center"><p className="font-display font-black text-white text-lg leading-none">{petData.weight}</p><p className="text-white/75 text-[10px] font-bold mt-0.5">kg 体重</p></div>
          <div className="bg-white/20 backdrop-blur rounded-xl py-2 text-center"><p className="font-display font-black text-white text-lg leading-none">{petData.healthScore}</p><p className="text-white/75 text-[10px] font-bold mt-0.5">健康分</p></div>
          <div className="bg-white/20 backdrop-blur rounded-xl py-2 text-center"><p className="font-display font-black text-white text-lg leading-none">{petData.pendingReminders}</p><p className="text-white/75 text-[10px] font-bold mt-0.5">待处理</p></div>
        </div>
      </div>

      {/* ===== 待处理提醒（体外驱虫过期）===== */}
      <div className="bg-yellow-soft/70 border border-yellow-brand/30 rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
        <span className="text-xl">⚠️</span>
        <div className="flex-1">
          <p className="text-xs font-black text-ink-900">体外驱虫已过期 · 需要补打</p>
          <p className="text-[10px] text-ink-700 font-bold">福来恩 Frontline · 逾期 11 天</p>
        </div>
        <button onClick={handleExpiredReminder} className="text-xs font-black text-orange-deep">处理 →</button>
      </div>

      {/* ===== 分段控制器 ===== */}
      <div className="seg-ctrl mb-4">
        <div className={`seg-btn ${activeSegment === 'basic' ? 'active' : ''}`} onClick={() => setActiveSegment('basic')}>基础</div>
        <div className={`seg-btn ${activeSegment === 'vaccine' ? 'active' : ''}`} onClick={() => setActiveSegment('vaccine')}>疫苗</div>
        <div className={`seg-btn ${activeSegment === 'medical' ? 'active' : ''}`} onClick={() => setActiveSegment('medical')}>病历</div>
        <div className={`seg-btn ${activeSegment === 'meds' ? 'active' : ''}`} onClick={() => setActiveSegment('meds')}>用药</div>
        <div className={`seg-btn ${activeSegment === 'trend' ? 'active' : ''}`} onClick={() => setActiveSegment('trend')}>趋势</div>
      </div>

      {/* ===== 基础信息 ===== */}
      {activeSegment === 'basic' && (
        <div>
          {/* 基础信息卡片 */}
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-ink-300/15 flex items-center gap-2">
              <span className="text-base">🐾</span><h3 className="font-display font-black text-base">基础信息</h3>
              <button onClick={openEditPetModal} className="ml-auto text-xs font-black text-orange-deep">编辑</button>
            </div>
            <div className="divide-y divide-ink-300/10">
              <div className="px-4 py-3 flex items-center justify-between"><span className="text-xs font-bold text-ink-500">姓名</span><span className="text-sm font-black">{petData.name}</span></div>
              <div className="px-4 py-3 flex items-center justify-between"><span className="text-xs font-bold text-ink-500">类型</span><span className="text-sm font-black">🐱 猫</span></div>
              <div className="px-4 py-3 flex items-center justify-between"><span className="text-xs font-bold text-ink-500">品种</span><span className="text-sm font-black">{petData.breed}</span></div>
              <div className="px-4 py-3 flex items-center justify-between"><span className="text-xs font-bold text-ink-500">性别</span><span className="chip badge-ok text-xs">{petData.gender}</span></div>
              <div className="px-4 py-3 flex items-center justify-between"><span className="text-xs font-bold text-ink-500">出生日期</span><div className="text-right"><p className="text-sm font-black">{petData.birthDate}</p><p className="text-[10px] text-ink-500 font-bold">{petData.age}</p></div></div>
              <div className="px-4 py-3 flex items-center justify-between"><span className="text-xs font-bold text-ink-500">体重</span><div className="flex items-center gap-2"><span className="text-sm font-black">{petData.weight} kg</span><span className="chip badge-info" style={{ fontSize:'9px' }}>建议每月更新</span></div></div>
              <div className="px-4 py-3 flex items-center justify-between"><span className="text-xs font-bold text-ink-500">毛色 / 特征</span><span className="text-sm font-black">{petData.color}</span></div>
            </div>
          </div>

          {/* 过敏记录 */}
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-ink-300/15 flex items-center gap-2">
              <span className="text-base">⚠️</span><h3 className="font-display font-black text-base">过敏记录</h3>
              <button onClick={() => setShowAllergyModal(true)} className="ml-auto text-xs font-black text-orange-deep">+ 添加</button>
            </div>
            <div className="px-4 py-3 space-y-2">
              {allergies.map(allergy => (
                <div key={allergy.id} className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-xl">🚫</span>
                  <div><p className="text-sm font-black text-red-700">{allergy.name}</p><p className="text-[10px] text-red-500 font-bold">{allergy.description}</p></div>
                </div>
              ))}
            </div>
          </div>

          {/* 快速更新体重 */}
          <div className="bg-gradient-to-br from-orange-soft/50 to-yellow-soft/50 rounded-3xl p-4 mb-4 border border-orange-soft">
            <div className="flex items-center gap-2 mb-3"><span className="text-base">⚖️</span><p className="font-black text-sm">快速更新体重</p><span className="chip badge-info ml-auto" style={{ fontSize:'9px' }}>上次：{petData.lastWeightDate}</span></div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-soft">
                <input className="flex-1 outline-none text-sm font-black bg-transparent" type="number" step="0.1" value={newWeight} onChange={e => setNewWeight(e.target.value)} />
                <span className="text-xs font-bold text-ink-500">kg</span>
              </div>
              <button onClick={updateWeight} className="btn-primary px-5 py-2.5 rounded-2xl text-sm">记录</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 疫苗记录 ===== */}
      {activeSegment === 'vaccine' && (
        <div>
          <div className="flex items-center justify-between mb-3"><h3 className="font-display font-black text-base">💉 疫苗记录</h3><button onClick={() => openModal('vaccine')} className="chip bg-orange-brand text-white">+ 添加</button></div>
          {vaccines.map(v => (
            <div key={v.id} className="bg-white rounded-3xl shadow-soft mb-3 overflow-hidden hover-lift" onClick={() => toggleCollapse(v.id)}>
              {/* 卡片主体 */}
              <div className="px-4 py-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint-soft flex items-center justify-center text-xl shrink-0">💉</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1"><p className="font-black text-sm leading-tight">{v.name}</p><span className="chip badge-ok shrink-0">✓ 已完成</span></div>
                  <p className="text-[10px] text-ink-500 font-bold">📅 {v.date} · {v.hospital || ''}</p>
                  {v.nextDate && (<div className="mt-2 bg-yellow-soft/60 rounded-xl px-3 py-1.5 flex items-center gap-2"><span className="text-xs">⏰</span><p className="text-xs font-black text-orange-deep">下次接种：{v.nextDate} <span className="font-bold text-ink-700">（还有 {daysRemaining(v.nextDate)} 天）</span></p></div>)}
                </div>
              </div>
              <div className={`collapse-body ${openCollapses[v.id] ? 'open' : ''}`}>
                <div className="px-4 pb-4 border-t border-ink-300/10 pt-3">
                  {v.batch && (<div className="bg-cream rounded-xl p-2.5 mb-3"><p className="text-[10px] text-ink-500 font-bold">批次号</p><p className="text-xs font-black mt-0.5">{v.batch}</p></div>)}
                  {v.note && (<div className="bg-cream rounded-xl p-2.5 mb-3"><p className="text-[10px] text-ink-500 font-bold">备注</p><p className="text-xs font-black mt-0.5">{v.note}</p></div>)}
                  <button onClick={() => openProofUpload(`${v.name} 接种证明`)} className="w-full bg-mint-soft text-mint-deep font-black text-xs py-2.5 rounded-xl">📄 查看接种证明</button>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-3xl shadow-soft p-4 mb-4">
            <div className="flex items-center gap-2 mb-3"><span>📊</span><p className="font-black text-sm">接种完成度</p></div>
            <div className="space-y-2.5">
              <div><div className="flex justify-between text-xs font-bold mb-1"><span>猫三联 FVRCP</span><span className="text-mint-deep">100%</span></div><div className="progress-track"><div className="progress-fill" style={{ width:'100%', background:'linear-gradient(90deg,#7FD8BE,#4FB89A)' }}></div></div></div>
              <div><div className="flex justify-between text-xs font-bold mb-1"><span>狂犬疫苗</span><span className="text-mint-deep">100%</span></div><div className="progress-track"><div className="progress-fill" style={{ width:'100%', background:'linear-gradient(90deg,#7FD8BE,#4FB89A)' }}></div></div></div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 病历档案 ===== */}
      {activeSegment === 'medical' && (
        <div>
          <div className="flex items-center justify-between mb-3"><h3 className="font-display font-black text-base">📋 病历档案</h3><button onClick={() => openModal('medical')} className="chip bg-orange-brand text-white">+ 添加</button></div>
          {medicalRecords.map(rec => (
            <div key={rec.id} className="bg-white rounded-3xl shadow-soft mb-3 overflow-hidden hover-lift" onClick={() => toggleCollapse(rec.id)}>
              {/* 病历卡片主体 */}
              <div className="px-4 py-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-soft flex items-center justify-center text-xl shrink-0">🔍</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1"><div><p className="font-black text-sm">{rec.title}</p><p className="text-[10px] text-ink-500 font-bold">📅 {rec.date}</p></div><span className={`chip ${rec.severity === '轻度' ? 'badge-warn' : 'badge-ok'} shrink-0`}>{rec.severity}</span></div>
                  <p className="text-xs font-bold text-ink-700 mt-1">诊断：{rec.diagnosis}</p>
                  <div className="flex gap-1.5 mt-1.5"><span className="chip bg-orange-soft text-orange-deep">建议就医</span><span className="chip bg-mint-soft text-mint-deep">¥ {rec.cost || '?'}</span></div>
                </div>
              </div>
              <div className={`collapse-body ${openCollapses[rec.id] ? 'open' : ''}`}>
                <div className="px-4 pb-4 border-t border-ink-300/10 pt-3">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-cream rounded-xl p-2.5"><p className="text-[10px] text-ink-500 font-bold">治疗方案</p><p className="text-xs font-black mt-0.5">{rec.treatment}</p></div>
                    <div className="bg-cream rounded-xl p-2.5"><p className="text-[10px] text-ink-500 font-bold">就诊医院</p><p className="text-xs font-black mt-0.5">{rec.hospital || '-'}</p></div>
                    {rec.cost && (<div className="bg-cream rounded-xl p-2.5"><p className="text-[10px] text-ink-500 font-bold">费用</p><p className="text-xs font-black mt-0.5">¥ {rec.cost}</p></div>)}
                  </div>
                  <button onClick={() => openProofUpload(`${rec.title} 病历详情`)} className="w-full bg-orange-soft text-orange-deep font-black text-xs py-2.5 rounded-xl">📄 查看完整病历</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== 用药 & 驱虫 ===== */}
      {activeSegment === 'meds' && (
        <div>
          <div className="flex items-center justify-between mb-3"><h3 className="font-display font-black text-base">💊 用药记录</h3><button onClick={() => openModal('med')} className="chip bg-orange-brand text-white">+ 添加</button></div>
          <div className="bg-white rounded-3xl shadow-soft mb-5 overflow-hidden"><div className="px-4 py-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-mint-soft flex items-center justify-center text-xl">💊</div><div className="flex-1"><p className="font-black text-sm">正在服用的药物</p><p className="text-xs text-ink-500 font-bold mt-0.5">暂无</p></div><span className="chip badge-ok">正常</span></div></div>

          <div className="flex items-center justify-between mb-3"><h3 className="font-display font-black text-base">🐛 驱虫记录</h3><button onClick={() => openModal('deworming')} className="chip bg-orange-brand text-white">+ 添加</button></div>
          {dewormings.map(d => (
            <div key={d.id} className="bg-white rounded-3xl shadow-soft mb-3 overflow-hidden hover-lift" onClick={() => toggleCollapse(d.id)}>
              <div className="px-4 py-3.5 flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${d.status === 'overdue' ? 'bg-red-100' : 'bg-mint-soft'} flex items-center justify-center text-xl shrink-0`}>🐛</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1"><p className="font-black text-sm">{d.type}</p><span className={`chip ${d.status === 'overdue' ? 'badge-err' : 'badge-ok'} shrink-0`}>{d.status === 'overdue' ? '⚠️ 已过期' : '✓ 已完成'}</span></div>
                  <p className="text-[10px] text-ink-500 font-bold">📅 {d.date} · {d.name}</p>
                  <div className={`mt-2 rounded-xl px-3 py-1.5 flex items-center gap-2 ${d.status === 'overdue' ? 'bg-red-50 border border-red-200' : 'bg-yellow-soft/60'}`}>
                    <span className="text-xs">{d.status === 'overdue' ? '⚠️' : '⏰'}</span>
                    <p className={`text-xs font-black ${d.status === 'overdue' ? 'text-red-600' : 'text-orange-deep'}`}>下次驱虫：{d.nextDate} <span className="font-bold text-ink-700">{d.status === 'overdue' ? '（已逾期）' : `（还有 ${daysRemaining(d.nextDate)} 天）`}</span></p>
                  </div>
                </div>
              </div>
              <div className={`collapse-body ${openCollapses[d.id] ? 'open' : ''}`}>
                <div className="px-4 pb-4 border-t border-ink-300/10 pt-3">
                  <div className="bg-cream rounded-xl p-2.5 mb-3"><p className="text-[10px] text-ink-500 font-bold">药品</p><p className="text-xs font-black mt-0.5">{d.name}</p></div>
                  {d.status === 'overdue' && (<button className="w-full btn-primary py-2.5 rounded-xl text-xs">立即记录补打</button>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== 健康趋势 ===== */}
      {activeSegment === 'trend' && (
        <div>
          <h3 className="font-display font-black text-base mb-3">📊 健康趋势</h3>
          <div className="bg-white rounded-3xl shadow-soft p-4 mb-4">
            {/* 趋势图表 */}
            <div className="flex items-center justify-between mb-3"><p className="font-black text-sm">体重变化</p><div className="flex gap-1"><button className="chip bg-orange-brand text-white" style={{ fontSize:'10px' }}>3月</button><button className="chip bg-white shadow-soft text-ink-700" style={{ fontSize:'10px' }}>6月</button><button className="chip bg-white shadow-soft text-ink-700" style={{ fontSize:'10px' }}>全部</button></div></div>
            <div className="relative" style={{ height: 120 }}>
              <svg width="100%" height="120" viewBox="0 0 320 120" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="320" y2="20" stroke="#F0E5D5" strokeWidth="1"/>
                <line x1="0" y1="50" x2="320" y2="50" stroke="#F0E5D5" strokeWidth="1"/>
                <line x1="0" y1="80" x2="320" y2="80" stroke="#F0E5D5" strokeWidth="1"/>
                <line x1="0" y1="110" x2="320" y2="110" stroke="#F0E5D5" strokeWidth="1"/>
                <defs><linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF8C42" stopOpacity="0.3"/><stop offset="100%" stopColor="#FF8C42" stopOpacity="0"/></linearGradient></defs>
                <path d="M 30 80 L 100 65 L 170 70 L 240 55 L 290 58 L 290 110 L 30 110 Z" fill="url(#weightGrad)"/>
                <polyline points="30,80 100,65 170,70 240,55 290,58" fill="none" stroke="#FF8C42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="30" cy="80" r="4" fill="white" stroke="#FF8C42" strokeWidth="2"/>
                <circle cx="100" cy="65" r="4" fill="white" stroke="#FF8C42" strokeWidth="2"/>
                <circle cx="170" cy="70" r="4" fill="white" stroke="#FF8C42" strokeWidth="2"/>
                <circle cx="240" cy="55" r="4" fill="white" stroke="#FF8C42" strokeWidth="2"/>
                <circle cx="290" cy="58" r="5" fill="#FF8C42" stroke="white" strokeWidth="2"/>
              </svg>
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] font-bold text-ink-500 pointer-events-none" style={{ padding:'14px 0 8px' }}><span>5.0</span><span>4.5</span><span>4.0</span><span>3.5</span></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-ink-500 mt-1 px-4"><span>1月</span><span>2月</span><span>3月</span><span>4月</span></div>
            <div className="mt-3 bg-cream rounded-xl px-3 py-2 flex items-center gap-2"><span className="text-xs">📈</span><p className="text-xs font-bold text-ink-700">近 3 个月体重 <span className="font-black text-mint-deep">+0.3 kg</span>，增长趋势正常</p></div>
          </div>

          <div className="bg-white rounded-3xl shadow-soft p-4 mb-4">
            <div className="flex items-center gap-2 mb-3"><span>🔔</span><p className="font-black text-sm">近期异常记录</p></div>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 bg-yellow-soft/50 rounded-2xl"><div className="timeline-dot shrink-0 mt-0.5" style={{ background:'#FFD93D', boxShadow:'0 0 0 3px rgba(255,217,61,0.25)' }}></div><div className="flex-1"><div className="flex items-center justify-between mb-0.5"><p className="text-xs font-black">食欲下降</p><span className="text-[10px] font-bold text-ink-500">04/20</span></div><p className="text-[10px] font-bold text-ink-700">正常食量 60% · 持续观察中</p></div></div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-2xl"><div className="timeline-dot shrink-0 mt-0.5" style={{ background:'#7FB8FF', boxShadow:'0 0 0 3px rgba(127,184,255,0.25)' }}></div><div className="flex-1"><div className="flex items-center justify-between mb-0.5"><p className="text-xs font-black">饮水量增加</p><span className="text-[10px] font-bold text-ink-500">04/18</span></div><p className="text-[10px] font-bold text-ink-700">观察中 · 如持续建议就医</p></div></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-mint-soft to-yellow-soft rounded-3xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3"><span>💚</span><p className="font-black text-sm">综合健康评分</p></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-soft shrink-0"><span className="font-display font-black text-xl gradient-text">{petData.healthScore}</span></div>
              <div className="flex-1 space-y-1.5">
                <div><div className="flex justify-between text-[10px] font-bold mb-0.5"><span>体重</span><span className="text-mint-deep">良好</span></div><div className="progress-track" style={{ height:'4px' }}><div className="progress-fill" style={{ width:'85%', background:'linear-gradient(90deg,#7FD8BE,#4FB89A)' }}></div></div></div>
                <div><div className="flex justify-between text-[10px] font-bold mb-0.5"><span>疫苗</span><span className="text-mint-deep">完整</span></div><div className="progress-track" style={{ height:'4px' }}><div className="progress-fill" style={{ width:'100%', background:'linear-gradient(90deg,#7FD8BE,#4FB89A)' }}></div></div></div>
                <div><div className="flex justify-between text-[10px] font-bold mb-0.5"><span>驱虫</span><span className="text-orange-deep">待处理</span></div><div className="progress-track" style={{ height:'4px' }}><div className="progress-fill" style={{ width:'40%' }}></div></div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 添加过敏记录模态框 ===== */}
      {showAllergyModal && (
        <div className="modal-overlay active" onClick={() => setShowAllergyModal(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="font-display font-black text-lg">➕ 添加过敏记录</h3><button onClick={() => setShowAllergyModal(false)} className="w-8 h-8 rounded-full bg-ink-900/8 flex items-center justify-center text-sm font-black">✕</button></div>
            <div className="space-y-3">
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">过敏原 *</label><input className="input-field" placeholder="例如：青霉素" value={newAllergy.name} onChange={e => setNewAllergy({ ...newAllergy, name: e.target.value })} /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">备注</label><input className="input-field" placeholder="例如：就诊时请告知医生" value={newAllergy.description} onChange={e => setNewAllergy({ ...newAllergy, description: e.target.value })} /></div>
              <button onClick={addAllergy} className="btn-primary w-full py-3.5 rounded-2xl text-sm">保存</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 图片预览模态框 ===== */}
      {showImageModal && proofImage && (
        <div className="modal-overlay active" onClick={() => setShowImageModal(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-black text-lg">{currentProofTitle}</h3>
              <button onClick={() => setShowImageModal(false)} className="w-8 h-8 rounded-full bg-ink-900/8 flex items-center justify-center text-sm font-black">✕</button>
            </div>
            <img src={proofImage} alt="证明" className="w-full rounded-2xl mb-3" />
            <button onClick={() => setShowImageModal(false)} className="btn-primary w-full py-3 rounded-2xl text-sm">关闭</button>
          </div>
        </div>
      )}

      {/* ===== 编辑宠物信息模态框 ===== */}
      {showEditPetModal && (
        <div className="modal-overlay active" onClick={() => setShowEditPetModal(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-black text-lg">✏️ 编辑宠物信息</h3>
              <button onClick={() => setShowEditPetModal(false)} className="w-8 h-8 rounded-full bg-ink-900/8 flex items-center justify-center text-sm font-black">✕</button>
            </div>
            <div className="space-y-3">
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">姓名 *</label><input className="input-field" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">品种</label><input className="input-field" value={editForm.breed} onChange={e => setEditForm({ ...editForm, breed: e.target.value })} /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">性别</label><div className="grid grid-cols-2 gap-2">{['♀ 已绝育', '♂ 已绝育', '♀ 未绝育', '♂ 未绝育'].map(opt => (<div key={opt} className={`radio-opt ${editForm.gender === opt ? 'selected' : ''}`} onClick={() => setEditForm({ ...editForm, gender: opt })}><div className="radio-dot"></div><span>{opt}</span></div>))}</div></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">出生日期</label><input type="date" className="input-field" value={editForm.birthDate} onChange={e => handleBirthDateChange(e.target.value)} /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">体重 (kg)</label><input type="number" step="0.1" className="input-field" value={editForm.weight} onChange={e => setEditForm({ ...editForm, weight: parseFloat(e.target.value) || 0 })} /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">毛色 / 特征</label><input className="input-field" value={editForm.color} onChange={e => setEditForm({ ...editForm, color: e.target.value })} /></div>
              <button onClick={savePetEdit} className="btn-primary w-full py-3.5 rounded-2xl text-sm mt-2">保存修改</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 添加疫苗模态框 ===== */}
      {modals.vaccine && (
        <div className="modal-overlay active" onClick={() => closeModal('vaccine')}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="font-display font-black text-lg">💉 添加疫苗记录</h3><button onClick={() => closeModal('vaccine')} className="w-8 h-8 rounded-full bg-ink-900/8 flex items-center justify-center text-sm font-black">✕</button></div>
            <div className="space-y-3">
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">疫苗名称 *</label><input className="input-field" placeholder="例如：猫三联 FVRCP" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">接种日期 *</label><input className="input-field" type="date" defaultValue="2026-04-28" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">接种医院</label><input className="input-field" placeholder="例如：瑞鹏宠物医院" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">下次接种日期</label><input className="input-field" type="date" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">上传接种证明</label><div className="border-2 border-dashed border-ink-300 rounded-2xl py-6 flex flex-col items-center gap-2 cursor-pointer hover:border-orange-brand transition-colors"><span className="text-2xl">📷</span><p className="text-xs font-bold text-ink-500">点击拍照或选择图片</p></div></div>
              <button onClick={() => closeModal('vaccine')} className="btn-primary w-full py-3.5 rounded-2xl text-sm mt-2">保存记录</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 添加病历模态框 ===== */}
      {modals.medical && (
        <div className="modal-overlay active" onClick={() => closeModal('medical')}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="font-display font-black text-lg">📋 添加病历记录</h3><button onClick={() => closeModal('medical')} className="w-8 h-8 rounded-full bg-ink-900/8 flex items-center justify-center text-sm font-black">✕</button></div>
            <div className="space-y-3">
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">症状描述 *</label><input className="input-field" placeholder="例如：眼睛流泪、食欲不振" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">就诊日期 *</label><input className="input-field" type="date" defaultValue="2026-04-28" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">诊断结果</label><input className="input-field" placeholder="例如：细菌性结膜炎" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">严重程度</label><div className="grid grid-cols-3 gap-2"><div className="radio-opt selected"><div className="radio-dot"></div><span>轻度</span></div><div className="radio-opt"><div className="radio-dot"></div><span>中度</span></div><div className="radio-opt"><div className="radio-dot"></div><span>重度</span></div></div></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">治疗方案</label><input className="input-field" placeholder="例如：托百士眼药水 × 7天" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">费用（元）</label><input className="input-field" placeholder="例如：280" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">就诊医院</label><input className="input-field" placeholder="例如：瑞鹏宠物医院" /></div>
              <button onClick={() => closeModal('medical')} className="btn-primary w-full py-3.5 rounded-2xl text-sm mt-2">保存记录</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 添加用药模态框 ===== */}
      {modals.med && (
        <div className="modal-overlay active" onClick={() => closeModal('med')}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="font-display font-black text-lg">💊 添加用药记录</h3><button onClick={() => closeModal('med')} className="w-8 h-8 rounded-full bg-ink-900/8 flex items-center justify-center text-sm font-black">✕</button></div>
            <div className="space-y-3">
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">药品名称 *</label><input className="input-field" placeholder="例如：托百士眼药水" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">开始日期 *</label><input className="input-field" type="date" defaultValue="2026-04-28" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">用药周期</label><input className="input-field" placeholder="例如：7天 / 长期" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">用量说明</label><input className="input-field" placeholder="例如：每日 2 次，每次 1 滴" /></div>
              <button onClick={() => closeModal('med')} className="btn-primary w-full py-3.5 rounded-2xl text-sm mt-2">保存记录</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 添加驱虫模态框 ===== */}
      {modals.deworming && (
        <div className="modal-overlay active" onClick={() => closeModal('deworming')}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="font-display font-black text-lg">🐛 添加驱虫记录</h3><button onClick={() => closeModal('deworming')} className="w-8 h-8 rounded-full bg-ink-900/8 flex items-center justify-center text-sm font-black">✕</button></div>
            <div className="space-y-3">
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">驱虫类型 *</label><div className="grid grid-cols-2 gap-2"><div className="radio-opt selected"><div className="radio-dot"></div><span>体内驱虫</span></div><div className="radio-opt"><div className="radio-dot"></div><span>体外驱虫</span></div></div></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">药品名称 *</label><input className="input-field" placeholder="例如：拜耳 Drontal" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">驱虫日期 *</label><input className="input-field" type="date" defaultValue="2026-04-28" /></div>
              <div><label className="text-xs font-black text-ink-500 mb-1.5 block">下次驱虫日期</label><input className="input-field" type="date" /></div>
              <button onClick={() => closeModal('deworming')} className="btn-primary w-full py-3.5 rounded-2xl text-sm mt-2">保存记录</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 默认宠物数据
const defaultPet = {
  name: '咪咪',
  type: '猫',
  breed: '英国短毛猫',
  gender: '♀ 已绝育',
  birthDate: '2024-01-15',
  age: '1 岁 3 个月',
  weight: 4.2,
  color: '橘白相间',
  allergy: '头孢类抗生素',
  healthScore: 86,
  pendingReminders: 1,
  lastWeightDate: '2026-04-01',
}