const express = require("express");
const router = express.Router();
const { searchBookByBarCode } = require("../services/googleBooks");

router.get("/books/:barcode", async (req, res) => {
    const { barcode } = req.params;
    try {
        const book = await searchBookByBarCode(barcode);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;