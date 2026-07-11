/* api/gemini.js - Vercel Serverless Function AI Proxy */

export default async function handler(req, res) {
    // Add CORS headers for public API
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(455).json({ error: 'Chỉ chấp nhận phương thức POST' });
    }

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Nội dung prompt không được để trống' });
    }

    // Get developer's API key from environment variables (configured securely on Vercel)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ 
            error: 'Chưa cấu hình GEMINI_API_KEY trên Vercel Environment Variables. Hãy cấu hình để sử dụng AI miễn phí.' 
        });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            return res.status(response.status).json({ error: errData.error?.message || 'Lỗi từ Gemini API' });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (e) {
        console.error("AI Proxy Error:", e);
        return res.status(500).json({ error: 'Lỗi kết nối Serverless Proxy: ' + e.message });
    }
}
