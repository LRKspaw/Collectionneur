export default function CollectionItem({ item, mode }) {
    const isGrid = mode === "grid";

    const getSubtitle = () => {
        if (item.type === 'movie') {
            const year = item.metadata?.release_date?.split('-')[0] || "";
            const runtime = item.metadata?.runtime || "Durée inconnue";
            return `${runtime} min • ${year}`;
        }
        
        if (item.type === 'book') {
            const author = item.metadata?.authors?.[0] || "Auteur inconnu";
            const year = item.metadata?.publishedDate?.split('-')[0] || "";
            return `${author} • ${year}`;
        }

        return "Artiste - Année"; // Par défaut
    };

    return (
        <div className={`bg-[#2d1131]/40 rounded-3xl p-3 border border-white/5 transition-all ${
            isGrid ? "flex flex-col items-center text-center" : "flex items-center gap-4"
        }`}>
            <div className={`overflow-hidden rounded-2xl bg-[#3d1a42] flex-shrink-0 ${
                isGrid ? "w-full aspect-square mb-3" : "w-16 h-16"
            }`}>
                <img 
                    src={item.cover_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            <div className={isGrid ? "w-full" : "flex-1"}>
                <h3 className={`font-bold text-white truncate px-1 ${isGrid ? "text-sm" : "text-base"}`}>
                    {item.title}
                </h3>
                
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
                    {getSubtitle()}
                </p>
            </div>
        </div>
    );
}