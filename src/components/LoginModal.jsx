import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setMessage(error.message);
            else {
                onLoginSuccess();
                onClose();
            }
        } else {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) setMessage(error.message);
            else {
                setMessage('注册成功！请登录');
                setIsLogin(true);
            }
        }
        setLoading(false);
    };

    return (
        <div 
    className="fixed bg-black/50 flex items-center justify-center z-50" 
    style={{ top: 0, left: 0, right: 0, bottom: 0 }}
    onClick={onClose}
>
            <div className="bg-white rounded-3xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{isLogin ? '登录' : '注册'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="邮箱"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border rounded-xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="密码"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />

                    {message && <p className="text-sm text-red-500 mb-3">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50"
                    >
                        {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    {isLogin ? '还没有账号？' : '已有账号？'}
                    <button
                        onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
                        className="text-orange-500 ml-1 hover:underline"
                    >
                        {isLogin ? '立即注册' : '立即登录'}
                    </button>
                </p>
            </div>
        </div>
    );
}