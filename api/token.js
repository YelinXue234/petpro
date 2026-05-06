// api/token.js
export default async function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');

    // 只允许 GET 请求
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 获取 userId 参数（没有就给个默认值）
    const userId = req.query.userId || 'test_user';

    // 🔐 请替换成你的真实 API_KEY（就是你手动测试时用的那个）
    const API_KEY = 'sk-proj-xYSfBkaQBTCRHxOwnujiKODlZMWgVlUhiwrVfYvsBhRuVChC';

    // 宠智灵获取 access_token 的接口（和你手动测试的完全一致）
    const tokenUrl = `https://ms-ai.chongzhiling.com/token/accessToken?api_key=sk-proj-xYSfBkaQBTCRHxOwnujiKODlZMWgVlUhiwrVfYvsBhRuVChC&user_id=%E8%96%9B%E6%9E%97`;

    try {
        // 发起请求
        const response = await fetch(tokenUrl);
        const data = await response.json();

        // 检查返回结果
        if (data.code === 200 && data.data?.access_token) {
            // 成功：返回 token 给前端
            return res.status(200).json({
                success: true,
                access_token: data.data.access_token
            });
        } else {
            // 失败：返回错误信息
            throw new Error(data.message || '获取 token 失败');
        }
    } catch (error) {
        console.error('Token 获取失败:', error.message);
        return res.status(500).json({
            success: false,
            error: 'AI 服务凭证获取失败，请稍后重试'
        });
    }
}
