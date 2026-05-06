// api/token.js
// Vercel Serverless Function - 获取宠智灵 access_token

// 你的宠智灵 API Key（请替换成真实的）
const API_KEY = 'sk-proj-xYSfBkaQBTCRHxOwnujiKODlZMWgVlUhiwrVfYvsBhRuVChC';

export default async function handler(req, res) {
    // 设置 CORS 头，允许前端调用
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 只允许 GET 请求
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 获取 userId 参数
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: '缺少 userId 参数' });
    }

    try {
        // 调用宠智灵 API 获取 access_token
        const tokenUrl = `https://ms-ai.chongzhiling.com/token/accessToken?api_key=${API_KEY}&user_id=${userId}`;
        const response = await fetch(tokenUrl);
        const data = await response.json();

        if (data.code === 200 && data.data && data.data.access_token) {
            // 成功获取 token
            return res.status(200).json({
                success: true,
                access_token: data.data.access_token,
                expires_in: data.data.expires_in || 172800
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