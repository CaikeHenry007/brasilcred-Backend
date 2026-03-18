let config = {
    whatsappLink: "https://wa.me/message/ZYGDHQMPIER2G1",
};

// GET → pegar config
exports.getConfig = (req, res) => {
    res.json(config);
};

// POST → atualizar config
exports.updateConfig = (req, res) => {
    const { whatsappLink } = req.body;

    if (!whatsappLink) {
        return res.status(400).json({ error: "Link inválido" });
    }

    config.whatsappLink = whatsappLink;

    res.json({ success: true, config });
};