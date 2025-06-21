const axios = require('axios');

module.exports = function(app) {
    async function fetchAi4chat(text) {
        try {
            const url = `https://api.nekorinn.my.id/ai-img/ai4chat?text=${encodeURIComponent(text)}&ratio=${encodeURIComponent(model)`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching from llama-3.3-70b:", error.response?.data || error.message);
            throw new Error("Gagal terhubung ke llama-3.3-70b");
        }
    }

    app.get('/ai/ai4chat', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }
            const { model } = req.query;
            if (!model) {
                return res.status(400).json({ status: false, error: 'model is required' });
                }

            const result = await fetchAi4chat(text);

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
