// src/components/LanguageSwitcher.jsx
import { useState, useEffect } from 'react';

const translations = {
    zh: {
        // 底部导航
        home: '首页',
        hospitals: '医院',
        community: '社区',
        profile: '我的',
        aiDiagnosis: 'AI诊断',
        
        // 首页
        afternoonGreeting: '下午好 ☀️',
        takingCare: '在照顾',
        aiSmartDiagnosis: '⚡ AI 智能问诊',
        seconds: '30 秒',
        knowWhatHappened: '知道宠物怎么了<br/>要不要去医院、大概花多少钱',
        diagnoseNow: '立即问诊',
        nearbyHospitals: '附近医院',
        qa: '同城问答',
        healthRecord: '健康档案',
        healthReminder: '健康提醒',
        vaccineDue: '咪咪的疫苗 3 天后到期',
        view: '查看 →',
        recentDiagnosis: '最近问诊',
        eyeTears: '咪咪 · 眼睛流泪',
        observe: '观察',
        suspectedConjunctivitis: '疑似结膜炎 · 4 月 20 日',
        homeCare: '家庭护理',
        
        // 医院页面
        hospitalTitle: '附近医院',
        location: '📍 苏州太仓 · {count} 家宠物医院',
        searchPlaceholder: '搜索医院名称或地址',
        comprehensive: '综合排序',
        highestRating: '评分最高',
        lowestPrice: '价格最低',
        certified: '认证',
        reviews: '评价',
        call: '拨打',
        navigate: '导航 →',
        noHospitals: '未找到相关医院',
        
        // 社区页面
        communityTitle: '同城圈子',
        onlineCount: '📍 上海铲屎官 · 在线 1,284',
        recommend: '推荐',
        help: '求助',
        hospitalReview: '医院点评',
        daily: '日常',
        replies: '回复',
        likes: '点赞',
        views: '浏览',
        share: '分享',
        sharePost: '发布帖子',
        reply: '回复',
        cancel: '取消',
        send: '发送',
        noReplies: '暂无回复，快来抢沙发～',
        pleaseLogin: '请先登录',
        contentRequired: '内容不能为空',
        postTitle: '标题（可选）',
        shareContent: '分享你的养宠日常、求助或经验...',
        
        // 我的页面
        myPets: '我的宠物',
        addPet: '+ 添加',
        healthArchive: '健康档案',
        reminderSettings: '提醒设置',
        feedback: '投诉 & 反馈',
        settings: '设置',
        language: '语言',
        
        // 宠物信息
        vaccineStatus: '疫苗状态',
        vaccinated: '✓ 已接种',
        nextDeworm: '下次驱虫',
        physicalExam: '体检',
        
        // 健康档案
        basicInfo: '基础信息',
        vaccineRecord: '疫苗记录',
        medicalRecord: '病历档案',
        medication: '用药记录',
        deworming: '驱虫记录',
        healthTrend: '健康趋势',
        
        // 问诊模态框
        describeSymptoms: '✍️ 描述症状',
        uploadPhoto: '📸 拍照或上传照片',
        photoHint: '皮肤、眼睛、便便、行为录像都可以',
        symptomPlaceholder: '例如：眼睛流泪一周了，左眼比较严重，有点睁不开',
        next: '下一步 →',
        aiAssistant: '🤖 AI 兽医助手',
        aiMessage: '再回答几个问题，诊断会更准确～',
        question1: '分泌物的颜色是？',
        question2: '有没有频繁眨眼或抓挠眼睛？',
        question3: '最近食欲和精神怎么样？',
        option1: '正常',
        option2: '略差',
        option3: '很差',
        loading: '正在分析中...',
        aiAnalyzing: 'AI 正在结合照片和症状生成专业报告',
        diagnosisReport: '🐾 AI 智能诊断报告',
        aiVisionDiagnosis: 'AI 视觉诊断',
        photoHint2: '点击上方区域拍照，AI 将实时分析宠物状况',
        reminder: '诊断结果仅供参考。如果宠物症状持续或加重，请及时带它前往正规宠物医院就诊。',
        complete: '完成诊断'
    },
    en: {
        // Bottom Navigation
        home: 'Home',
        hospitals: 'Hospitals',
        community: 'Community',
        profile: 'Profile',
        aiDiagnosis: 'AI Diagnosis',
        
        // Home Page
        afternoonGreeting: 'Good Afternoon ☀️',
        takingCare: 'Taking care of',
        aiSmartDiagnosis: '⚡ AI Smart Diagnosis',
        seconds: '30 seconds',
        knowWhatHappened: 'Know what\'s wrong with your pet<br/>whether to go to the hospital, cost estimate',
        diagnoseNow: 'Diagnose Now',
        nearbyHospitals: 'Nearby Hospitals',
        qa: 'Community Q&A',
        healthRecord: 'Health Record',
        healthReminder: 'Health Reminder',
        vaccineDue: 'Mimi\'s vaccine due in 3 days',
        view: 'View →',
        recentDiagnosis: 'Recent Diagnosis',
        eyeTears: 'Mimi · Eye tearing',
        observe: 'Observe',
        suspectedConjunctivitis: 'Suspected conjunctivitis · Apr 20',
        homeCare: 'Home Care',
        
        // Hospitals Page
        hospitalTitle: 'Nearby Hospitals',
        location: '📍 Suzhou Taicang · {count} pet hospitals',
        searchPlaceholder: 'Search hospital name or address',
        comprehensive: 'Comprehensive',
        highestRating: 'Highest Rating',
        lowestPrice: 'Lowest Price',
        certified: 'Certified',
        reviews: 'reviews',
        call: 'Call',
        navigate: 'Navigate →',
        noHospitals: 'No hospitals found',
        
        // Community Page
        communityTitle: 'Community',
        onlineCount: '📍 Shanghai · 1,284 online',
        recommend: 'Recommend',
        help: 'Help',
        hospitalReview: 'Reviews',
        daily: 'Daily',
        replies: 'replies',
        likes: 'likes',
        views: 'views',
        share: 'Share',
        sharePost: 'Share Post',
        reply: 'Reply',
        cancel: 'Cancel',
        send: 'Send',
        noReplies: 'No replies yet, be the first to reply~',
        pleaseLogin: 'Please login first',
        contentRequired: 'Content cannot be empty',
        postTitle: 'Title (optional)',
        shareContent: 'Share your pet care stories, questions or experiences...',
        
        // Profile Page
        myPets: 'My Pets',
        addPet: '+ Add',
        healthArchive: 'Health Archive',
        reminderSettings: 'Reminders',
        feedback: 'Feedback',
        settings: 'Settings',
        language: 'Language',
        
        // Pet Info
        vaccineStatus: 'Vaccine',
        vaccinated: '✓ Vaccinated',
        nextDeworm: 'Next Deworming',
        physicalExam: 'Checkup',
        
        // Health Record
        basicInfo: 'Basic Info',
        vaccineRecord: 'Vaccines',
        medicalRecord: 'Medical Records',
        medication: 'Medications',
        deworming: 'Deworming',
        healthTrend: 'Health Trends',
        
        // Diagnosis Modal
        describeSymptoms: '✍️ Describe Symptoms',
        uploadPhoto: '📸 Take or Upload Photo',
        photoHint: 'Skin, eyes, stool, behavior videos are fine',
        symptomPlaceholder: 'e.g., eye tearing for a week, left eye more severe',
        next: 'Next →',
        aiAssistant: '🤖 AI Veterinary Assistant',
        aiMessage: 'Answer a few more questions for a more accurate diagnosis～',
        question1: 'What color is the discharge?',
        question2: 'Does it blink or scratch eyes frequently?',
        question3: 'How is its appetite and energy lately?',
        option1: 'Normal',
        option2: 'Slightly less',
        option3: 'Very poor',
        loading: 'Analyzing...',
        aiAnalyzing: 'AI is analyzing photos and symptoms to generate a professional report',
        diagnosisReport: '🐾 AI Diagnosis Report',
        aiVisionDiagnosis: 'AI Vision Diagnosis',
        photoHint2: 'Tap above to take a photo, AI will analyze in real time',
        reminder: 'For reference only. If symptoms persist or worsen, please take your pet to a vet.',
        complete: 'Complete'
    }
};

export default function LanguageSwitcher() {
    const [currentLang, setCurrentLang] = useState('zh');

    useEffect(() => {
        const savedLang = localStorage.getItem('petpro_language');
        if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
            setCurrentLang(savedLang);
            document.documentElement.lang = savedLang;
        } else {
            // 默认中文
            document.documentElement.lang = 'zh';
        }
    }, []);

    const switchLanguage = (lang) => {
        setCurrentLang(lang);
        localStorage.setItem('petpro_language', lang);
        document.documentElement.lang = lang;
        // 刷新页面让所有组件重新加载翻译
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-mint-soft flex items-center justify-center text-base">🌐</div>
                <span className="flex-1 text-sm font-bold">{translations[currentLang].language}</span>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => switchLanguage('zh')}
                    className={`px-3 py-1 rounded-full text-sm font-bold transition ${
                        currentLang === 'zh' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    中文
                </button>
                <button
                    onClick={() => switchLanguage('en')}
                    className={`px-3 py-1 rounded-full text-sm font-bold transition ${
                        currentLang === 'en' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    English
                </button>
            </div>
        </div>
    );
}

// 导出翻译 Hook，供其他组件使用
export function useTranslation() {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('petpro_language') || 'zh';
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setLang(localStorage.getItem('petpro_language') || 'zh');
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const t = (key, params = {}) => {
        let text = translations[lang][key] || key;
        // 替换参数 {count} 等
        Object.keys(params).forEach(k => {
            text = text.replace(`{${k}}`, params[k]);
        });
        return text;
    };

    return { t, lang };
}