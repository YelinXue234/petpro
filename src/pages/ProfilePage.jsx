import { useState } from 'react';
import { useTranslation } from '../components/LanguageSwitcher';
import HealthProfile from './HealthProfile';
import ReminderSettings from './ReminderSettings';
import SettingsPage from './SettingsPage';
import FeedbackModal from '../components/FeedbackModal';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function ProfilePage({ user, setActiveTab, healthSegment, clearHealthSegment }) {
    const { t, lang } = useTranslation();
    const [profileView, setProfileView] = useState('overview');
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [healthInitialSegment, setHealthInitialSegment] = useState('basic');

    const openHealth = (segment = 'basic') => {
        setHealthInitialSegment(segment);
        setProfileView('health');
    };

    // 健康档案页面
    if (profileView === 'health') {
        return (
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setProfileView('overview')} className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-base font-black">←</button>
                    <h1 className="font-display text-xl font-black flex-1">{t('healthArchive')}</h1>
                </div>
                <HealthProfile onNavigateToHospitals={() => setActiveTab('hospitals')} initialSegment={healthInitialSegment} />
            </div>
        );
    }

    // 提醒设置页面
    if (profileView === 'reminder') {
        return (
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setProfileView('overview')} className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-base font-black">←</button>
                    <h1 className="font-display text-xl font-black flex-1">{t('reminderSettings')}</h1>
                </div>
                <ReminderSettings />
            </div>
        );
    }

    // 设置页面
    if (profileView === 'settings') {
        return (
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setProfileView('overview')} className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-base font-black">←</button>
                    <h1 className="font-display text-xl font-black flex-1">{t('settings')}</h1>
                </div>
                <SettingsPage />
            </div>
        );
    }

    // 概览视图（我的主页）
    return (
        <div>
            {/* 用户信息卡片 */}
            <div className="bg-gradient-to-br from-orange-brand to-orange-deep rounded-3xl p-5 mb-5 text-white relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-8xl opacity-10">🐱</div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-3xl ring-2 ring-white/50">🧑</div>
                        <div>
                            <p className="font-black text-lg">{user?.email?.split('@')[0] || (lang === 'zh' ? '铲屎官' : 'Pet Owner')}</p>
                            <p className="text-xs font-bold text-white/80">{lang === 'zh' ? '铲屎等级 LV.3 · 热心市民' : 'Pet Care Level LV.3 · Enthusiast'}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white/20 backdrop-blur rounded-xl py-2"><p className="font-display font-black text-xl">12</p><p className="text-[10px] font-bold text-white/80">{lang === 'zh' ? '问诊' : 'Consult'}</p></div>
                        <div className="bg-white/20 backdrop-blur rounded-xl py-2"><p className="font-display font-black text-xl">3</p><p className="text-[10px] font-bold text-white/80">{lang === 'zh' ? '徽章' : 'Badges'}</p></div>
                        <div className="bg-white/20 backdrop-blur rounded-xl py-2"><p className="font-display font-black text-xl">280</p><p className="text-[10px] font-bold text-white/80">{lang === 'zh' ? '积分' : 'Points'}</p></div>
                    </div>
                </div>
            </div>

            {/* 我的宠物 */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-lg font-black">{t('myPets')}</h3>
                </div>
                <div className="bg-white rounded-3xl p-4 shadow-soft">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-soft to-yellow-soft flex items-center justify-center text-3xl">🐱</div>
                        <div className="flex-1">
                            <p className="font-black">咪咪</p>
                            <p className="text-xs text-ink-500 font-bold">
                                {lang === 'zh' ? '英短 · ♀ · 2 岁 · 4.2 kg' : 'British Shorthair · ♀ · 2 yrs · 4.2 kg'}
                            </p>
                        </div>
                        <button onClick={() => openHealth('basic')} className="text-xs text-orange-deep font-black">{t('healthArchive')} →</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-mint-soft/50 rounded-xl py-2 text-center">
                            <p className="text-[10px] font-bold text-mint-deep">{t('vaccineStatus')}</p>
                            <p className="text-xs font-black text-mint-deep mt-0.5">{t('vaccinated')}</p>
                        </div>
                        <div className="bg-yellow-soft/50 rounded-xl py-2 text-center">
                            <p className="text-[10px] font-bold text-orange-deep">{t('nextDeworm')}</p>
                            <p className="text-xs font-black text-orange-deep mt-0.5">5 {lang === 'zh' ? '月 12 日' : 'May 12'}</p>
                        </div>
                        <div className="bg-orange-soft/50 rounded-xl py-2 text-center">
                            <p className="text-[10px] font-bold text-orange-deep">{t('physicalExam')}</p>
                            <p className="text-xs font-black text-orange-deep mt-0.5">6 {lang === 'zh' ? '月 1 日' : 'Jun 1'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 功能菜单 */}
            <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
                <div className="px-4 py-3.5 flex items-center gap-3 border-b border-ink-300/20 cursor-pointer hover:bg-cream" onClick={() => openHealth('basic')}>
                    <div className="w-9 h-9 rounded-xl bg-orange-soft flex items-center justify-center">📋</div>
                    <span className="flex-1 text-sm font-bold">{t('healthArchive')}</span>
                    <span className="text-ink-500">→</span>
                </div>
                <div className="px-4 py-3.5 flex items-center gap-3 border-b border-ink-300/20 cursor-pointer hover:bg-cream" onClick={() => openHealth('vaccine')}>
                    <div className="w-9 h-9 rounded-xl bg-mint-soft flex items-center justify-center">💉</div>
                    <span className="flex-1 text-sm font-bold">{t('vaccineRecord')}</span>
                    <span className="text-ink-500">→</span>
                </div>
                <div className="px-4 py-3.5 flex items-center gap-3 border-b border-ink-300/20 cursor-pointer hover:bg-cream" onClick={() => openHealth('medical')}>
                    <div className="w-9 h-9 rounded-xl bg-yellow-soft flex items-center justify-center">📋</div>
                    <span className="flex-1 text-sm font-bold">{t('medicalRecord')}</span>
                    <span className="text-ink-500">→</span>
                </div>
                <div className="px-4 py-3.5 flex items-center gap-3 border-b border-ink-300/20 cursor-pointer hover:bg-cream" onClick={() => setProfileView('reminder')}>
                    <div className="w-9 h-9 rounded-xl bg-orange-soft flex items-center justify-center">⏰</div>
                    <span className="flex-1 text-sm font-bold">{t('reminderSettings')}</span>
                    <span className="text-ink-500">→</span>
                </div>
                <div className="px-4 py-3.5 flex items-center gap-3 border-b border-ink-300/20 cursor-pointer hover:bg-cream" onClick={() => setShowFeedbackModal(true)}>
                    <div className="w-9 h-9 rounded-xl bg-mint-soft flex items-center justify-center">📢</div>
                    <span className="flex-1 text-sm font-bold">{t('feedback')}</span>
                    <span className="text-ink-500">→</span>
                </div>
                <div className="px-4 py-3.5 flex items-center gap-3 border-b border-ink-300/20 cursor-pointer hover:bg-cream" onClick={() => setProfileView('settings')}>
                    <div className="w-9 h-9 rounded-xl bg-yellow-soft flex items-center justify-center">⚙️</div>
                    <span className="flex-1 text-sm font-bold">{t('settings')}</span>
                    <span className="text-ink-500">→</span>
                </div>
                {/* 语言切换 */}
                <div className="px-4 py-3.5">
                    <LanguageSwitcher />
                </div>
            </div>

            {/* 投诉反馈弹窗 */}
            <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
        </div>
    );
}