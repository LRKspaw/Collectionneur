# Cahier des Charges - Gestionnaire de Collection

Ce document liste les fonctionnalités prévues pour l'application, divisées entre le produit minimum viable (MVP) et les évolutions futures (V2).

## MVP (Version 1) - Les Indispensables

### 1. Ajout d'une œuvre
- **Scanner de code-barres :** Utilisation de l'appareil photo du smartphone pour scanner les codes EAN/ISBN.
- **Ajout Automatique :** Interrogation d'API externes (Discogs pour la musique, Google Books/Open Library pour les BDs) à partir du code scanné pour récupérer les métadonnées et la couverture.
- **Ajout Manuel :** Formulaire de saisie pour les œuvres sans code-barres ou introuvables via les API.

### 2. Consultation de la collection
- **Vue Bibliothèque :** Affichage sous forme de grille (pochettes) ou liste.
- **Catégorisation :** Séparation claire entre la section "Musique" (Vinyles/CDs) et "Lecture" (BDs/Livres).
- **Recherche & Tri :** Barre de recherche textuelle et filtres de base (ordre alphabétique, date d'ajout, auteur, genre).

### 3. Gestion d'une œuvre
- **Fiche Détail :** Vue complète d'un item (Couverture, Titre, Auteur/Artiste, Éditeur/Label, Année, etc.).
- **Modification :** Possibilité d'éditer les informations d'une œuvre existante.
- **Suppression :** Retrait d'une œuvre de la collection.

---

## V2 - Évolutions futures

- **Gestion des prêts :** Suivi des items prêtés à des proches (à qui, depuis quand).
- **Statistiques :** Tableau de bord avec le nombre total d'œuvres, la répartition par genre, et une estimation de la valeur de la collection.
- **Wishlist :** Liste des œuvres à acheter.