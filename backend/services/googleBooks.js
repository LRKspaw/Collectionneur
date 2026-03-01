const axios = require("axios");

async function searchBookByBarCode(barcode) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}&key=${process.env.GOOGLE_KEY_BOOKS}`);
        if (response.data.totalItems > 0) {
            return response.data.items[0].volumeInfo; 
        } else {
            return null; 
        }
    } catch (error) {
        console.error("Détails de l'erreur Google API:", error.response ? error.response.data : error.message);
        throw new Error("Erreur lors de la recherche du livre par code barre");
    }
}

module.exports = { searchBookByBarCode };