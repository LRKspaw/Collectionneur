"use client";

import Link from 'next/link';
import { Home, Library, Eye , User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname(); //Recupere l'URL actuelle

    return (
        <nav className="fixed bottom-0 w-full h-16 bg-background border-t border-primary flex justify-around items-center">
            <Link href="/" className="flex flex-col items-center justify-center">
                <Home size={24} className={pathname === "/" ? "text-accent" : "text-text"} />
                <span className={`text-xs text-center leading-none ${pathname === "/" ? "text-accent" : "text-text"}`}>Accueil</span>
             </Link>
             <Link href="/collection" className="flex flex-col items-center justify-center">
                <Library size={24} className={pathname === "/collection" ? "text-accent" : "text-text"} />
                <span className={`text-xs text-center leading-none ${pathname === "/collection" ? "text-accent" : "text-text"}`}>Collection</span>
             </Link>
             <Link href="/wantlist" className="flex flex-col items-center justify-center">
                <Eye size={24} className={pathname === "/wantlist" ? "text-accent" : "text-text"} />
                <span className={`text-xs text-center leading-none ${pathname === "/wantlist" ? "text-accent" : "text-text"}`}>Wantlist</span>
             </Link>
             <Link href="/profile" className="flex flex-col items-center justify-center">
                <User size={24} className={pathname === "/profile" ? "text-accent" : "text-text"} />
                <span className={`text-xs text-center leading-none ${pathname === "/profile" ? "text-accent" : "text-text"}`}>Profil</span>
             </Link>
        </nav>
    )
};