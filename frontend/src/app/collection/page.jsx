"use client";
import { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { Search, ScanLine, List, Grid, ChevronDown } from "lucide-react";
import CollectionItem from "../../components/CollectionItem";

export default function CollectionPage() {
    const [viewMode, setViewMode] = useState("grid"); 
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const typeParam = filter !== "all" ? `?type=${filter}` : "";
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items${typeParam}`);
            const data = await res.json();
            setItems(data);
        };
        fetchData();
    }, [filter]);

    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-background text-text p-4 pb-24">
            <div className="flex gap-2 mb-6 pt-4">
                <Input
                    placeholder="Rechercher"
                    variant="flat"
                    radius="full"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    startContent={<Search size={20} className="text-text/60" />}
                    classNames={{
                        inputWrapper: "bg-primary group-data-[focus=true]:bg-primary/80 border-1 border-transparent group-data-[focus=true]:border-accent/50",
                        input: "text-text placeholder:text-text/40"
                    }}
                />
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                {["all", "music", "book", "movie"].map((cat) => (
                    <CategoryChip 
                        key={cat}
                        active={filter === cat} 
                        label={cat === "all" ? "Tout" : cat.charAt(0).toUpperCase() + cat.slice(1)} 
                        onClick={() => setFilter(cat)} 
                    />
                ))}
            </div>

            <div className="flex justify-between items-center mb-6">
                <Button 
                    variant="light" 
                    size="sm" 
                    className="text-text/80 gap-1 px-0 font-medium"
                    endContent={<ChevronDown size={14} />}
                >
                    Ajout récent
                </Button>
                
                <div className="flex bg-primary p-1 rounded-xl border border-white/5">
                    <button 
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-accent text-background shadow-lg" : "text-text/40"}`}
                    >
                        <List size={20} />
                    </button>
                    <button 
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-accent text-background shadow-lg" : "text-text/40"}`}
                    >
                        <Grid size={20} />
                    </button>
                </div>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : "flex flex-col gap-3"}>
                {filteredItems.map((item) => (
                    <CollectionItem key={item._id} item={item} mode={viewMode} />
                ))}
            </div>
        </main>
    );
}

function CategoryChip({ label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                active 
                ? "bg-accent text-background border-accent shadow-lg shadow-accent/20" 
                : "bg-primary text-text/60 border-transparent hover:border-text/20"
            }`}
        >
            {label}
        </button>
    );
}