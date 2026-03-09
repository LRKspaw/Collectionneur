function mapGoogleBook(apiResponse) {
    if (!apiResponse.items || apiResponse.items.length === 0) return null;

    const volume = apiResponse.items[0].volumeInfo;

    const categories = volume.categories || [];
    const isComic = categories.some(cat => 
        cat.toLowerCase().includes("comic") || 
        cat.toLowerCase().includes("graphic novel") ||
        cat.toLowerCase().includes("bande dessinée")
    );

    const isbn13 = volume.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier;
    const fallbackIsbn = volume.industryIdentifiers?.[0]?.identifier;

    let cover = volume.imageLinks?.thumbnail || "";
    if (cover) {
        cover = cover.replace("http://", "https://").replace("&edge=curl", "");
    }

    return {
        type: isComic ? 'comic' : 'book', 
        title: volume.title,
        cover_url: cover,
        barcode: isbn13 || fallbackIsbn || "",
        estimated_value: 0,
        metadata: {
            authors: volume.authors || [],
            publisher: volume.publisher || "Inconnu", 
            publishedDate: volume.publishedDate,
            pageCount: volume.pageCount,
            language: volume.language,
            categories: categories, 
            description: volume.description || "",
            subtitle: volume.subtitle || "" 
        }
    };
};

function mapDiscogs(apiResponse) {
    if (!apiResponse.results || apiResponse.results.length === 0) return null;

    const release = apiResponse.results[0];
    const cleanBarCode = release.barcode 
        ? release.barcode
            .map(b => b.replace(/\s+/g, ''))
            .find(b => /^\d+$/.test(b))
        : "";
    const parts = release.title.split(" - ");
    const artist = parts[0] ? parts[0].trim() : "Artiste inconnu";
    const album = parts[1] ? parts[1].trim() : artist;

    return {
        type: 'music',
        title: album,
        cover_url: release.cover_image || release.thumb || "",
        barcode: cleanBarCode || (release.barcode ? release.barcode[0] : ""),
        estimated_value: 0, 
        metadata: {
            artist: artist,
            year: release.year || "Année inconnue",
            genres: release.genre || [],
            styles: release.style || [],
            format: release.format || [],
            label: release.label?.[0] || "Indépendant",
            country: release.country || "Inconnu"
        }
    };
};

function mapTMDBSimple(movie) {
    if (!movie) return null;

    const posterPath = movie.poster_path || movie.poster || "";
    
    return {
        id_tmdb: movie.id,
        title: movie.title,
        release_date: movie.release_date ? movie.release_date.split('-')[0] : "N/C",
        poster: posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : null 
    };
};

function mapTMDBFull(movie){
    if (!movie) return null;

    const posterPath = movie.poster_path || movie.poster || "";
    
    return {
        type: 'movie',
        title: movie.title || movie.original_title,
        cover_url: posterPath.startsWith('http')
            ? posterPath 
            : `https://image.tmdb.org/t/p/w500${posterPath}`,
        barcode: "", 
        metadata: {
            id_tmdb: movie.id || movie.id_tmdb,
            release_date: movie.release_date,
            overview: movie.overview,
            rating: movie.vote_average,
            original_language: movie.original_language,
            genres: movie.genres ? movie.genres.map(g => g.name) : [],
            runtime: movie.runtime || null
        }
    };
}
module.exports = { mapGoogleBook, mapDiscogs, mapTMDBSimple, mapTMDBFull };