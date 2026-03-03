const axios = require("axios");

async function searchFilmByTitle(title) {
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params:{
                api_key: process.env.TMDB_KEY,
                query: title,
                language: 'fr-FR'
            },
        });
        return res.data.results.map(movie => ({
            id_tmdb: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            overview: movie.overview
        }));
    } catch (error) {
        console.log("Erreur lors de la recherche de film par titre:", error);
        throw new Error("Erreur lors de la recherche de film par titre");
    }
};

module.exports = { searchFilmByTitle };