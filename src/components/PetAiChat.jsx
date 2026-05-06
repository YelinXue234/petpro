// src/components/PetAiChat.jsx
import { useState, useEffect } from 'react';
import SimulatedLoginModal from './SimulatedLoginModal';

export default function PetAiChat() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [tokenLoading, setTokenLoading] = useState(false);

    // 检查本地登录状态
    useEffect(() => {
        const savedUser = localStorage.getItem('simulatedUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, []);

    // 登录后获取 access_token
    useEffect(() => {
        if (isLoggedIn && user) {
            fetchAccessToken();
        }
    }, [isLoggedIn, user]);

    const fetchAccessToken = async () => {
        setTokenLoading(true);
        try {
            const response = await fetch(`/api/token?userId=${encodeURIComponent(user.email)}`);
            const data = await response.json();
            if (data.success && data.access_token) {
                setAccessToken(data.access_token);
            } else {
                console.error('获取 token 失败:', data.error);
            }
        } catch (error) {
            console.error('请求 token 出错:', error);
        } finally {
            setTokenLoading(false);
        }
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        setShowLoginModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('simulatedUser');
        setIsLoggedIn(false);
        setUser(null);
        setAccessToken(null);
    };

    // 动态拼接宠智灵 H5 地址
    const petAiUrl = accessToken 
        ? `https://h5.chongzhiling.com/pages/condition/info?ind=1&type=picture&access_token=${ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT25zaWRYTmxjbDlwWkNJNklqRXhNREF5TWprNExWeDFPRFU1WWx4MU5qYzVOeTAzTWpoak16STRObVptWW1SaVpUSTBZVFE1TUdFeFpqWTJPREpoWVRoa01pSXNJbUYxZEdoZmRtbGhYMkZ3YVd0bGVTSTZkSEoxWlgwc0ltVjRjQ0k2TVRjM09ETXlORGMyTWl3aWFuUnBJam9pWlRJd01HTm1Nall0WlRKbE1DMDBOek5sTFdGaU9XTXRPREE1WkRKa01EWTFaVGd4SW4wLlRsVDVDUWVzSm5icWR5YW8tbFo5TzN2bFItRVZROHVrXzRPN2FxQjFkWDA=}`
        : '';

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
                <SimulatedLoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            </div>
        );
    }

    // 已登录但 token 还在获取中
    if (tokenLoading || !accessToken) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">正在连接AI诊断服务...</p>
                </div>
            </div>
        );
    }

    // 已登录且有 token：显示宠智灵 H5 页面
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