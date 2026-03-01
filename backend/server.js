const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const itemsRoutes = require("./routes/items");

//Initialisation de l'app express
const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Dire a Express d'utiliser les routes itemsRoutes pour les addresses qui commencent par /api/items
app.use("/api/items", itemsRoutes);

//Connexion a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch((err) => console.log("Erreur de connexion à MongoDB:", err));

app.get('/api/status', (req, res) =>{
    res.json({message: "Backend en ligne !"});
});

app.listen(PORT, () => {
    console.log(`Serveur sur http://localhost:${PORT}`);
});
