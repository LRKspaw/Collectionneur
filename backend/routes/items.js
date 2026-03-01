const express = require("express");
const router = express.Router();
const Item = require("../models/Item")

//CRUD (Create Read Update Delete)


//PUT (create)
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

//GET a partir d'un id pour le tri
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