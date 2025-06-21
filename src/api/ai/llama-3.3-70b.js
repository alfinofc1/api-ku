const axios = require('axios');

module.exports = function(app) {
    async function fetchLlamaAI(text) {
        try {
            const url = `https://api.nekorinn.my.id/ai/llama-3.3-70b?text=${encodeURIComponent(text)}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching from llama-3.3-70b:", error.response?.data || error.message);
            throw new Error("Gagal terhubung ke llama-3.3-70b");
        }
    }

    app.get('/ai/llama-3.3-70b', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }

            const result = await fetchLlamaAI(text);

            res.status(200).json({
                status: true,
                creator: "alfin",
                result: result.result || result.message || "Tidak ada respons dari llama-3.3-70b AI ðŸ¥º"
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                creator: "alfin",
                result: "Maaf, terjadi kesalahan saat memproses permintaan Anda."
            });
        }
    });
};
