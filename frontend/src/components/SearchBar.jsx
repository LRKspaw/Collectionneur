"use client";
import { Autocomplete, AutocompleteItem, Modal, ModalContent, ModalBody, Button, Spinner } from "@heroui/react";
import { Search, ScanLine, ChevronLeft, Star, Plus, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchBar({ onAddSuccess, showScan = true }) {
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (inputValue.length >= 3) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/search-external?q=${inputValue}`);
                const data = await res.json();
                setSearchResults(Array.isArray(data) ? data : []);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [inputValue]);

    const handleSelect = async (id_tmdb) => {
        if (!id_tmdb) return;
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/external-details/movie/${id_tmdb}`);
            const data = await res.json();
            
            if (data) {
                setSelectedMovie(data);
                setIsPreviewOpen(true); 
            }
        } catch (error) {
            console.error("Erreur de chargement des détails", error);
        }
    };

    const handleConfirmAdd = async () => {
        if (!selectedMovie?.metadata?.id_tmdb) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/add-movie`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_tmdb: selectedMovie.metadata.id_tmdb })
        });
        if (res.ok) {
            setIsPreviewOpen(false);
            setInputValue("");
            setSelectedMovie(null);
            if (onAddSuccess) onAddSuccess();
        }
    };

    return (
        <div className="w-full px-4 pt-6">
            <Autocomplete
                placeholder="Rechercher un film..."
                variant="flat"
                radius="full"
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSelectionChange={handleSelect}
                startContent={<Search className="text-text/60" size={20} />}
                endContent={showScan ? <ScanLine className="text-accent cursor-pointer" size={20} /> : null}
                inputProps={{
                    classNames: {
                        input: "text-text placeholder:text-text/40",
                        inputWrapper: "bg-primary group-data-[focus=true]:bg-primary border border-white/5",
                    },
                }}
                popoverProps={{
                    classNames: { content: "bg-primary border border-accent/20 p-1 shadow-2xl" },
                }}
                listboxProps={{
                    itemClasses: {
                        base: ["text-text", "rounded-xl", "data-[hover=true]:bg-accent/10"],
                    },
                }}
            >
                {searchResults.map((item) => (
                    <AutocompleteItem
                        key={item.id_tmdb}
                        textValue={item.title}
                        startContent={<img src={item.poster} className="w-10 h-14 object-cover rounded-lg shadow-sm" alt="" />}
                    >
                        <div className="flex flex-col">
                            <span className="font-bold text-text">{item.title}</span>
                            <span className="text-[10px] text-text/40">{item.release_date}</span>
                        </div>
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            <Modal 
                isOpen={isPreviewOpen} 
                onOpenChange={(open) => { 
                    setIsPreviewOpen(open); 
                    if(!open) setSelectedMovie(null); 
                }} 
                size="full" 
                hideCloseButton 
                className="bg-background text-text"
            >
                <ModalContent>
                    {(onClose) => (
                        <ModalBody className="p-6 overflow-y-auto">
                            {selectedMovie ? (
                                <>
                                    <button onClick={onClose} className="flex items-center gap-2 text-xl font-bold mb-6">
                                        <ChevronLeft size={24} /> Retour
                                    </button>

                                    <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden bg-primary mb-6 shadow-2xl border border-white/5">
                                        <img src={selectedMovie?.cover_url} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="text-center mb-6">
                                        <h1 className="text-3xl font-bold mb-1">{selectedMovie?.title}</h1>
                                        <p className="text-text/40 font-medium uppercase tracking-widest text-xs">
                                            {selectedMovie?.metadata?.release_date?.split('-')[0] || "Année N/C"}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center gap-2">
                                            <Star className="text-secondary" fill="currentColor" size={20} />
                                            <span className="text-lg font-bold">
                                                {selectedMovie?.metadata?.rating?.toFixed(1) || "0.0"}
                                            </span>
                                        </div>
                                        <Button 
                                            onPress={handleConfirmAdd}
                                            className="bg-transparent border-2 border-accent text-accent rounded-full px-8 py-6 text-lg font-bold"
                                            startContent={<Plus size={20} />}
                                        >
                                            Collec
                                        </Button>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold border-b border-white/10 pb-2">Détails</h3>
                                        <DetailRow icon={<Calendar size={20} />} label="Sortie" value={selectedMovie?.metadata?.release_date} />
                                        <DetailRow icon={<Clock size={20} />} label="Durée" value={selectedMovie?.metadata?.runtime ? `${selectedMovie.metadata.runtime} min` : "N/C"} />
                                        <div className="mt-4 pb-10">
                                            <p className="text-[10px] opacity-40 uppercase tracking-widest mb-2">Synopsis</p>
                                            <p className="text-sm leading-relaxed text-text/80">
                                                {selectedMovie?.metadata?.overview || "Aucun résumé disponible."}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center">
                                    <Spinner color="accent" size="lg" />
                                    <p className="mt-4 text-text/60">Chargement des données...</p>
                                </div>
                            )}
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

function DetailRow({ icon, label, value }) {
    return (
        <div className="flex items-center gap-4 text-text/80">
            <div className="p-2 bg-primary rounded-lg text-accent border border-white/5">{icon}</div>
            <div>
                <p className="text-[10px] opacity-40 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="font-medium text-sm">{value || "N/A"}</p>
            </div>
        </div>
    );
}