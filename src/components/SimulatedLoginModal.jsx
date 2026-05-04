import { useState } from 'react';

export default function SimulatedLoginModal({ isOpen, onClose, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 模拟验证：只要邮箱不为空且密码长度>=3就认为成功
        if (!email || password.length < 3) {
            setError('请输入有效的邮箱和密码（至少3位）');
            return;
        }

        // 模拟用户数据（用于展示）
        const mockUser = {
            email: email,
            name: email.split('@')[0],
            avatar: '🐱'
        };
        
        // 保存到 localStorage 模拟登录状态
        localStorage.setItem('simulatedUser', JSON.stringify(mockUser));
        
        setError('');
        onLoginSuccess(mockUser);
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* 宠物装饰 */}
                <div className="text-center mb-4">
                    <span className="text-5xl">🐾</span>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">PetPro 宠物助手</h2>
                    <p className="text-gray-500 text-sm mt-1">登录后体验AI智能诊断</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">邮箱</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-orange-400 transition"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">密码</label>
                        <input
                            type="password"
                            placeholder="输入任意密码"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-orange-400 transition"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-orange-600 transition shadow-md"
                    >
                        {isLogin ? '开始体验' : '注册'}
                    </button>
                </form>

            </div>
        </div>
    );
}