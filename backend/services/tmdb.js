const axios = require("axios");
const { mapTMDBSimple, mapTMDBFull } = require("../utils/hamonizedData"); 

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function searchFilmByTitle(title) {
    try {
        const url = `${TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(title)}&language=fr-FR`;
        const response = await axios.get(url);
        return response.data.results.map(movie => mapTMDBSimple(movie));
    } catch (error) {
        console.error("Erreur TMDB Search:", error.message);
        throw new Error("Impossible de trouver des films avec ce titre.");
    }
}

async function getFilmById(id) {
    try {
        const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_KEY}&language=fr-FR`;
        const response = await axios.get(url);
        return mapTMDBFull(response.data);
    } catch (error) {
        console.error("Erreur TMDB Details:", error.message);
        throw new Error("Impossible de récupérer les détails de ce film.");
    }
}

module.exports = { searchFilmByTitle, getFilmById };