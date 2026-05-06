// api/token.js
export default async function handler(req, res) {
    // 设置 CORS 头，允许前端调用
    res.setHeader('Access-Control-Allow-Origin', '*');

    // 只允许 GET 请求
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 获取 userId 参数
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: '缺少 userId 参数' });
    }

    // 🔐 请替换成你的真实 API Key（你之前测试成功的那一个）
    const API_KEY = 'sk-proj-xYSfBkaQBTCRHxOwnujiKODlZMWgVlUhiwrVfYvsBhRuVChC';

    try {
        const tokenUrl = `https://ms-ai.chongzhiling.com/token/accessToken?api_key=${API_KEY}&user_id=${userId}`;
        const response = await fetch(tokenUrl);
        const data = await response.json();

        if (data.code === 200 && data.data?.access_token) {
            return res.status(200).json({
                success: true,
                access_token: data.data.access_token
            });
        } else {
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
