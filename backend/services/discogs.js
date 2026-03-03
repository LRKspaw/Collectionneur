const axios = require("axios");

async function searchMusicByBarCode(barcode) {
    try{
        console.log("Recherche de musique par code-barres:", barcode);
        const res = await axios.get(`https://api.discogs.com/database/search?barcode=${barcode}&type=release`, {
            params: {
                barcode: barcode,
                type: 'release',
                token: process.env.DISCOGS_TOKEN
            },
            headers: {
                'User-Agent': process.env.APP_NAME
            }
        } );
        if (res.data.results && res.data.results.length > 0) {
            return res.data.results[0];
        } else{
            return null;
        }
        
    } catch (error) {
        console.error("Erreur de recherche de musique par code-barres:", error);
        throw new Error("Erreur de recherche de musique par code-barres");
    }
}

module.exports = { searchMusicByBarCode };