import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import HomePage from './pages/HomePage'
import HospitalsPage from './pages/HospitalsPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import DiagnosisModal from './components/DiagnosisModal'
import PetAiChat from './components/PetAiChat'

function App() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('home')
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const [healthSegment, setHealthSegment] = useState(null)

  // 获取当前登录用户
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener?.subscription.unsubscribe()
  }, [])

  // 跳转到 AI 诊断页面
  const navigateToAiDiagnosis = () => {
    setActiveTab('petai')
  }

  // 跳转到疫苗记录
  const navigateToVaccine = () => {
    setHealthSegment('vaccine')
    setActiveTab('profile')
  }

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="max-w-lg mx-auto px-4 pt-6">
        {activeTab === 'home' && (
          <HomePage
            user={user}
            onDiagnosis={() => setShowDiagnosis(true)}
            onNavigateToHospitals={() => setActiveTab('hospitals')}
            onNavigateToCommunity={() => setActiveTab('community')}
            onNavigateToHealth={() => setActiveTab('profile')}
            onNavigateToVaccine={navigateToVaccine}
            onNavigateToAiDiagnosis={navigateToAiDiagnosis}
          />
        )}
        {activeTab === 'hospitals' && <HospitalsPage user={user} />}
        {activeTab === 'community' && <CommunityPage user={user} />}
        {activeTab === 'profile' && (
          <ProfilePage
            user={user}
            setActiveTab={setActiveTab}
            healthSegment={healthSegment}
            clearHealthSegment={() => setHealthSegment(null)}
          />
        )}
        {activeTab === 'petai' && <PetAiChat user={user} />}
      </div>

      {/* 底部导航栏 - 只有4个按钮 */}
      <div className="tab-bar max-w-lg mx-auto left-0 right-0" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={`tab-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <span className="tab-icon">🏠</span>
          <span className="tab-label">首页</span>
        </div>
        <div className={`tab-item ${activeTab === 'hospitals' ? 'active' : ''}`} onClick={() => setActiveTab('hospitals')}>
          <span className="tab-icon">🏥</span>
          <span className="tab-label">医院</span>
        </div>
        <div className={`tab-item ${activeTab === 'community' ? 'active' : ''}`} onClick={() => setActiveTab('community')}>
          <span className="tab-icon">💬</span>
          <span className="tab-label">社区</span>
        </div>
        <div className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
          <span className="tab-icon">👤</span>
          <span className="tab-label">我的</span>
        </div>
      </div>

      {/* 问诊模态框（保留但不再使用，可通过 onDiagnosis 打开） */}
      <DiagnosisModal isOpen={showDiagnosis} onClose={() => setShowDiagnosis(false)} user={user} />
    </div>
  )
}

export default App