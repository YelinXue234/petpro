export default async function handler(req, res) {
    // 只允许 GET 请求
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: '缺少 userId 参数' });
    }

    // 请替换为你的真实 API Key
    const apiKey = 'sk-proj-6yVs6ZT4yPe8kmcFxMCyDOkTrOVmCzGBIZU5FPUXaNGSoYY7';

    const tokenUrl = `https://ms-ai.chongzhiling.com/token/accessToken?api_key=${apiKey}&user_id=${userId}`;

    try {
        const response = await fetch(tokenUrl);
        const data = await response.json();

        if (data.code === 200 && data.data && data.data.access_token) {
            // 确保返回格式正确
            res.status(200).json({ 
                success: true, 
                access_token: data.data.access_token 
            });
        } else {
            throw new Error(data.message || '获取 token 失败');
        }
    } catch (error) {
        console.error('Token 获取失败:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'AI 服务凭证获取失败，请稍后重试' 
        });
    }
}