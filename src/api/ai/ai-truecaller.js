const axios = require('axios');

module.exports = function(app) {
    async function fetchTruecaller(text) {
        try {
            const url = `https://api.nekorinn.my.id/ai/truecaller-chat?text=${encodeURIComponent(text)}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching from Truecaller:", error.response?.data || error.message);
            throw new Error("Gagal terhubung ke Truecaller.");
        }
    }

    app.get('/ai/truecaller', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }

            const result = await fetchTruecaller(text);

            res.status(200).json({
                status: true,
                creator: "alfin",
                result: result.result || result.message || "Tidak ada respons dari Truecaller 🥺"
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
