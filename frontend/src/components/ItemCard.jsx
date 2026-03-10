"use client";
import { Film, Book, Music } from "lucide-react";

export default function ItemCard({ item }) {
    return (
        // w-[140px] assure que toutes les cartes font la même largeur
        <div className="w-[140px] flex flex-col gap-2">
            
            {/* Conteneur Image avec ratio fixe 2/3 */}
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-primary border border-white/5 shadow-lg">
                <img 
                    src={item.cover_url} 
                    alt={item.title} 
                    // object-cover est crucial pour que l'image remplisse le cadre sans se déformer
                    className="w-full h-full object-cover" 
                />
                
                {/* Petit badge type (optionnel) */}
                <div className="absolute top-2 right-2 p-1.5 bg-background/60 backdrop-blur-md rounded-lg border border-white/10">
                    {item.type === 'movie' ? <Film size={14} className="text-accent" /> : <Book size={14} className="text-accent" />}
                </div>
            </div>

            {/* Infos texte */}
            <div className="flex flex-col">
                <h3 className="text-text text-sm font-bold truncate">
                    {item.title}
                </h3>
                <p className="text-text/40 text-[11px] font-medium">
                    {item.metadata?.release_date?.split('-')[0] || "2024"}
                </p>
            </div>
        </div>
    );
}