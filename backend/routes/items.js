const express = require("express");
const router = express.Router();
const Item = require("../models/Item")


// --- Services (Appels API) ---
const { searchBookByBarCode } = require("../services/googleBooks");
const { searchMusicByBarCode } = require("../services/discogs");
const { getFilmById, searchFilmByTitle} = require("../services/tmdb");

// --- Mappers (Transformation de données) ---
const { mapGoogleBook, mapDiscogs, mapTMDBFull } = require("../utils/hamonizedData");

//CRUD (Create Read Update Delete)


//POST (create)
router.post("/add-book", async (req, res) => {
    try {
        const { barcode } = req.body;
        const rawData = await searchBookByBarCode(barcode);
        console.log("Structure de rawData :", Object.keys(rawData));
        const mappedData = mapGoogleBook(rawData);
        if (!mappedData) return res.status(404).json({ message: "Livre introuvable", barcode: barcode });
        const item = new Item(mappedData);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du livre" });
    }
});

router.post("/add-music", async (req, res) => {
    try {
        const { barcode } = req.body;
        const rawData = await searchMusicByBarCode(barcode); 
        const mappedData = mapDiscogs(rawData);
        if (!mappedData) return res.status(404).json({ message: "Vinyle introuvable" });
        const item = new Item(mappedData);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la musique" });
    }
});
router.post("/add-movie", async (req, res) => {
    try {
        const { id_tmdb } = req.body;

        if (!id_tmdb) {
            return res.status(400).json({ message: "ID TMDB manquant" });
        }

        const fullMovieData = await getFilmById(id_tmdb);
        if (!fullMovieData) {
            return res.status(404).json({ message: "Film introuvable" });
        }
        const item = new Item(fullMovieData);

        await item.save();
        res.status(201).json(item);

    } catch (error) {
        console.log("Erreur lors de l'ajout du film via TMDB:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des détails du film" });
    }
});
//GET sur toute la collection, avec option de filtrage
router.get("/", async (req, res) => {
    try {
        let filter = {};
        let sortOption = { createdAt: -1 }; 

        if(req.query.type){
            filter.type = req.query.type;
        }
        if(req.query.sort){
            sortOption = req.query.sort === 'asc' ? { createdAt: 1 } : { createdAt: -1 };
        }
        const collection = await Item.find(filter).sort(sortOption);
        res.status(200).json(collection);

    } catch (error) {
        console.log("Erreur lors de la récupération des items:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des items" });
    }
});

router.get("/search-external", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.length < 3) return res.json([]);
        const results = await searchFilmByTitle(q);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Erreur recherche TMDB" });
    }
});

//GET a partir d'un id pour le tri
router.get("/external-details/movie/:id", async (req, res) => {
    try {
        const details = await getFilmById(req.params.id);
        res.json(details);
    } catch (error) {
        res.status(500).json({ message: "Erreur détails TMDB" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        if(!item) {
            console.log("Item non trouvé");
            res.status(404).json({ message: "Item non trouvé" });
        } else {
            res.json(item);
        }
    } catch (error) {
        console.log("Erreur lors de la récupération de l'item:", error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'item" });
    }
});

//PUT (modif) a partir d'un id
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!updatedItem) {
            res.status(404).json({ message: "Item non trouvé" });
        } else {
            res.status(200).json(updatedItem);
        }
    } catch (error) {
        console.log("Erreur lors de la mise à jour de l'item:", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'item" });
    }
});


//DELETE a partir d'un id
router.delete("/:id", async (req,res) => {
    const id = req.params.id;
    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if(!deletedItem) {
            res.status(404).json({ message: "Item non trouvé" });
        } else {
            res.status(200).json({ message: "Item supprimé avec succès" });
        }
    } catch (error) {
        console.log("Erreur lors de la suppression de l'item:", error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'item" });
    }
});

module.exports = router;