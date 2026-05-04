import { useState, useEffect } from 'react';
import SimulatedLoginModal from './SimulatedLoginModal';

export default function PetAiChat() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    // 检查本地登录状态
    useEffect(() => {
        const savedUser = localStorage.getItem('simulatedUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        setShowLoginModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('simulatedUser');
        setIsLoggedIn(false);
        setUser(null);
    };

    // 宠智灵 H5 地址（你之前可用的那个）
    const petAiUrl = 'https://h5.chongzhiling.com/pages/condition/info?ind=1&type=picture&access_token=你的token';

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">加载中...</p>
                </div>
            </div>
        );
    }

    // 未登录状态
    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
                {/* 自定义诊断卡片 */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 max-w-md shadow-xl">
                    <div className="text-6xl mb-4">🐕‍🦺</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">AI 智能诊断</h2>
                    <p className="text-gray-600 mb-6">
                        上传宠物照片，AI 智能识别<br/>
                        健康状况、品种特征
                    </p>
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition"
                    >
                        开始诊断 →
                    </button>
                </div>

                {/* 登录模态框 */}
                <SimulatedLoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            </div>
        );
    }

    // 已登录：显示宠智灵界面 + 自定义头部
    return (
        <div className="flex flex-col h-full">
            {/* 自定义顶部栏 */}
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur">🤖</div>
                    <div>
                        <h3 className="text-white font-bold">AI 诊断助手</h3>
                        <p className="text-white/80 text-xs">已为您提供专业分析</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition"
                >
                    退出
                </button>
            </div>

            {/* 宠智灵 iframe */}
            <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-lg">
                <iframe
                    src={petAiUrl}
                    title="宠智灵 AI 宠物助手"
                    className="w-full h-full border-0"
                    style={{ minHeight: '600px', height: 'calc(100vh - 200px)' }}
                    allow="camera; microphone"
                />
            </div>

            {/* 底部提示 */}
            <div className="mt-3 text-center text-xs text-gray-400">
                诊断结果仅供参考，如有严重症状请及时就医
            </div>
        </div>
    );
}