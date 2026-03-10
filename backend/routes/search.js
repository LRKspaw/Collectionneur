const express = require("express");
const router = express.Router();
const { searchBookByBarCode } = require("../services/googleBooks");
const { searchMusicByBarCode } = require("../services/discogs");
const { searchFilmByTitle } = require("../services/tmdb");

router.get("/books/:barcode", async (req, res) => {
    const { barcode } = req.params;
    try {
        const book = await searchBookByBarCode(barcode);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/music/:barcode", async (req, res) => {
    const { barcode }  = req.params;
    try {
        const record = await searchMusicByBarCode(barcode);
        res.status(200).json(record);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
});

router.get("/movie/:title", async (req, res) => {
    const { title } = req.params;
    try {
        const films = await searchFilmByTitle(title);
        res.status(200).json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;