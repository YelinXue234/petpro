// api/token.js
export default async function handler(req, res) {
    // 允许跨域
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

    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: '缺少 userId 参数' });
    }

    // 请将下面的字符串替换为你的宠智灵真实 API_KEY
    const API_KEY = 'sk-proj-xYSfBkaQBTCRHxOwnujiKODlZMWgVlUhiwrVfYvsBhRuVChC';

    try {
        const url = `https://ms-ai.chongzhiling.com/token/accessToken?api_key=${sk-proj-xYSfBkaQBTCRHxOwnujiKODlZMWgVlUhiwrVfYvsBhRuVChC}&user_id=${薛林}`;
        const response = await fetch(url);
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
