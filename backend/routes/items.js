const express = require("express");
const router = express.Router();
const Item = require("../models/Item")


router.post("/", async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        console.log("Erreur lors de la création de l'item:", error);
        res.status(400).json({ message: "Erreur lors de la création de l'item" });
    }
});

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

router.put("/:id", async (req, res) => {

});
module.exports = router;