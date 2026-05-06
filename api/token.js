// api/token.js
export default async function handler(req, res) {
    // 只允许 GET 请求
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 获取前端传来的 userId，如果没有就用默认值
    const userId = req.query.userId || 'test_user';

    // 🔐 请把这里的 KEY 换成你刚才测通的那个（就是你发给我的那一长串）
    const API_KEY = 'sk-proj-xYSfBkaQBTCRHxOwnujiKODlZMWgVlUhiwrVfYvsBhRuVChC';

    try {
        // 宠智灵 access_token 接口（和你手动测试那个 URL 完全一样）
        const response = await fetch(
            `https://ms-ai.chongzhiling.com/token/accessToken?api_key=${sk-proj-xYSfBkaQBTCRHxOwnujiKODlZMWgVlUhiwrVfYvsBhRuVChC}&user_id=${薛林}`
        );
        const data = await response.json();

        if (data.code === 200 && data.data?.access_token) {
            // 把 token 安全地返回给前端
            res.status(200).json({
                success: true,
                access_token: data.data.access_token
            });
        } else {
            throw new Error(data.message || '获取令牌失败');
        }
    } catch (error) {
        console.error('Token 获取失败:', error.message);
        res.status(500).json({
            success: false,
            error: 'AI 服务凭证获取失败，请稍后重试'
        });
    }
}