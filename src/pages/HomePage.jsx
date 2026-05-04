import { useTranslation } from '../components/LanguageSwitcher';

export default function HomePage({ 
    user, 
    onDiagnosis, 
    onNavigateToHospitals, 
    onNavigateToCommunity, 
    onNavigateToHealth, 
    onNavigateToVaccine,
    onNavigateToAiDiagnosis   // 新增参数
}) {
    const { t } = useTranslation();

    return (
        <div>
            {/* 顶部问候 */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <p className="text-xs text-ink-500 font-bold tracking-widest">{t('afternoonGreeting')}</p>
                    <h1 className="text-2xl font-black mt-0.5">{t('takingCare')} <span className="gradient-text">{user?.email?.split('@')[0] || '毛孩子'}</span>吗？</h1>
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-soft to-yellow-soft flex items-center justify-center text-2xl ring-2 ring-white shadow-soft">🐱</div>
            </div>

            {/* 核心 CTA 卡片 */}
            <div className="rounded-3xl p-5 mb-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B2C 60%, #E5722A 100%)' }}>
                <div className="absolute -right-4 -top-4 text-7xl opacity-20 select-none">🐶</div>
                <div className="absolute -right-8 -bottom-6 text-6xl opacity-15 select-none">🐱</div>
                <div className="relative z-10">
                    <p className="text-yellow-brand text-xs font-black tracking-widest mb-1">{t('aiSmartDiagnosis')}</p>
                    <h2 className="text-white font-display text-2xl font-black leading-tight mb-1">{t('seconds')}</h2>
                    <p className="text-white/90 text-sm font-bold mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: t('knowWhatHappened') }} />
                    {/* 修改这里：onClick 改为 onNavigateToAiDiagnosis */}
                    <button onClick={onNavigateToAiDiagnosis} className="bg-white text-orange-deep font-black text-sm px-5 py-3 rounded-2xl flex items-center gap-2 hover-lift">
                        {t('diagnoseNow')}
                        <span>→</span>
                    </button>
                </div>
            </div>

            {/* 快捷入口 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div onClick={onNavigateToHospitals} className="bg-white rounded-2xl p-3 text-center shadow-soft hover-lift cursor-pointer">
                    <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl bg-mint-soft flex items-center justify-center text-xl">🏥</div>
                    <p className="text-xs font-bold">{t('nearbyHospitals')}</p>
                </div>
                <div onClick={onNavigateToCommunity} className="bg-white rounded-2xl p-3 text-center shadow-soft hover-lift cursor-pointer">
                    <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl bg-yellow-soft flex items-center justify-center text-xl">💬</div>
                    <p className="text-xs font-bold">{t('qa')}</p>
                </div>
                <div onClick={onNavigateToHealth} className="bg-white rounded-2xl p-3 text-center shadow-soft hover-lift cursor-pointer">
                    <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl bg-orange-soft flex items-center justify-center text-xl">📋</div>
                    <p className="text-xs font-bold">{t('healthRecord')}</p>
                </div>
            </div>

            {/* 健康提醒 */}
            <div className="bg-white rounded-3xl p-4 mb-4 shadow-soft border border-yellow-soft/50">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-yellow-soft flex items-center justify-center">⏰</div>
                    <div className="flex-1">
                        <p className="text-xs text-ink-500 font-bold">{t('healthReminder')}</p>
                        <p className="text-sm font-black">{t('vaccineDue')}</p>
                    </div>
                    <button onClick={onNavigateToVaccine} className="text-xs text-orange-deep font-black">{t('view')}</button>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '88%' }}></div></div>
            </div>

            {/* 最近问诊记录 */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-lg font-black">{t('recentDiagnosis')}</h3>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-soft hover-lift cursor-pointer">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-mint-soft flex items-center justify-center text-2xl shrink-0">🐱</div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                                <p className="font-black text-sm">{t('eyeTears')}</p>
                                <span className="severity-pill severity-mild" style={{ fontSize: '10px', padding: '2px 8px' }}>{t('observe')}</span>
                            </div>
                            <p className="text-xs text-ink-500 mb-2">{t('suspectedConjunctivitis')}</p>
                            <div className="flex gap-1.5">
                                <span className="chip bg-mint-soft text-mint-deep">{t('homeCare')}</span>
                                <span className="chip bg-orange-soft text-orange-deep">¥200-500</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}