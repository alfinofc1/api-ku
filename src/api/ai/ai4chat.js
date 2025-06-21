const axios = require('axios');

module.exports = function(app) {
    async function fetchAi4chat(text) {
        try {
            const url = `https://api.nekorinn.my.id/ai-img/ai4chat?text=${encodeURIComponent(text)}&ratio=${encodeURIComponent(ratio)}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching from Copilot AI:", error.response?.data || error.message);
            throw new Error("Gagal terhubung ke Copilot AI.");
        }
    }

    app.get('/ai/ai4chat', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
                }
                const { ratio } = req.query;
            if (!ratio) {
                return res.status(400).json({ status: false, error: 'ratio is required' });
            }

            const result = await fetchAi4chat(text);

            res.status(200).json({
                status: true,
                creator: "Hazel",
                result: result.result || result.message || "Tidak ada respons dari Copilot AI ðŸ¥º"
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                creator: "Hazel",
                result: "Maaf, terjadi kesalahan saat memproses permintaan Anda."
            });
        }
    });
};
