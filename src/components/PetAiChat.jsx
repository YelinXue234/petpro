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

    // 不请求云函数，直接使用硬编码的有效 token
    useEffect(() => {
        if (isLoggedIn && user) {
            setTokenLoading(true);
            // 直接使用你手动测试得到的有效 access_token
            const hardcodedToken = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT25zaWRYTmxjbDlwWkNJNklqRXhNREF5TWprNExWeDFPRFU1WWx4MU5qYzVOeTAzTWpoak16STRObVptWW1SaVpUSTBZVFE1TUdFeFpqWTJPREpoWVRoa01pSXNJbUYxZEdoZmRtbGhYMkZ3YVd0bGVTSTZkSEoxWlgwc0ltVjRjQ0k2TVRjM09ETXpORE01TlN3aWFuUnBJam9pWVdGaE5tRmpZVGd0TjJGbU5pMDBZelJrTFRnNVpEWXRORGhrWTJFMFpHSmhZVEprSW4wLjhhdkY3T2VERl96ZFhiaTVqdHVSeVlTMFVVdXNkQUVpbE1oUDBGR05iWWc=';
            setAccessToken(hardcodedToken);
            setTokenLoading(false);
        }
    }, [isLoggedIn, user]);

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

    const petAiUrl = accessToken 
        ? `https://h5.chongzhiling.com?access_token=${encodeURIComponent(accessToken)}`
        : '';

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[400px]"><div className="text-center">加载中...</div></div>;
    }

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 max-w-md shadow-xl">
                    <div className="text-6xl mb-4">🐕‍🦺</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">AI 智能诊断</h2>
                    <p className="text-gray-600 mb-6">上传宠物照片，AI 智能识别<br/>健康状况、品种特征</p>
                    <button onClick={() => setShowLoginModal(true)} className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition">开始诊断 →</button>
                </div>
                <SimulatedLoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
            </div>
        );
    }

    if (tokenLoading || !accessToken) {
        return <div className="flex items-center justify-center min-h-[400px]"><div className="text-center">正在连接AI诊断服务...</div></div>;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur">🤖</div>
                    <div><h3 className="text-white font-bold">AI 诊断助手</h3><p className="text-white/80 text-xs">已为您提供专业分析</p></div>
                </div>
                <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition">退出</button>
            </div>
            <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-lg">
                <iframe src={petAiUrl} title="宠智灵 AI 宠物助手" className="w-full h-full border-0" style={{ minHeight: '600px', height: 'calc(100vh - 200px)' }} allow="camera; microphone" />
            </div>
            <div className="mt-3 text-center text-xs text-gray-400">诊断结果仅供参考，如有严重症状请及时就医</div>
        </div>
    );
}
