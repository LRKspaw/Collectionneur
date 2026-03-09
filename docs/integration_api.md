# Documentation : Gestion des APIs Externes & Harmonisation

Cette documentation détaille l'architecture utilisée pour transformer les données des APIs externes en un modèle de données unique (`Item`) au sein de notre base MongoDB.

---

## 🏗️ Architecture du Flux de Données

Le processus suit une chaîne de responsabilité stricte pour garantir que la base de données reste propre :

1.  **Services (`/services`)** : Récupèrent les données brutes via HTTP (Axios).
2.  **Mappers (`/utils/harmonizedData.js`)** : Nettoient et formatent les données selon notre schéma.
3.  **Routes (`/routes`)** : Orchestrent l'appel au service et la persistance en base.

---

## 📋 Modèle de Données Harmonisé (Schema `Item`)

Chaque objet enregistré, qu'il s'agisse d'un livre, d'un film ou d'un vinyle, doit respecter cette structure :

| Champ | Type | Description |
| :--- | :--- | :--- |
| `type` | String | `book`, `comic`, `music`, ou `movie`. |
| `title` | String | Titre principal de l'œuvre. |
| `cover_url` | String | URL sécurisée (HTTPS) de l'image de couverture. |
| `barcode` | String | Code-barres (EAN/ISBN) - Vide pour les films TMDB. |
| `estimated_value` | Number | Valeur par défaut : 0. Modifiable manuellement. |
| `metadata` | Mixed | Données spécifiques (Auteurs, Réalisateur, Label, etc.). |

---

## 🛠️ Les Mappers par Catégorie

### 1. Livres & BD (Google Books)
* **Source** : `https://www.googleapis.com/books/v1/volumes?q=isbn:{barcode}`
* **Logique spécifique** : 
    * Détection automatique du type `comic` si les catégories contiennent "Bande dessinée" ou "Graphic Novel".
    * Priorité à l'**ISBN_13**.
    * Nettoyage des URLs d'images pour forcer le HTTPS et retirer les bordures artificielles (`&edge=curl`).

### 2. Musique (Discogs)
* **Source** : `https://api.discogs.com/database/search?barcode={barcode}`
* **Logique spécifique** :
    * Séparation du titre "Artiste - Album" via un split sur ` - `.
    * Nettoyage des espaces dans les codes-barres.
    * Extraction du premier label de la liste.

### 3. Films (TMDB)
* **Source** : `https://api.themoviedb.org/3/movie/{id}`
* **Logique spécifique** :
    * Utilisation de deux mappers : `Simple` (pour la recherche) et `Full` (pour l'ajout en base).
    * Reconstruction de l'URL de l'image via le `poster_path` et le CDN TMDB.


## 🚀 Évolutions Futures
- [ ] Gérer le "fallback" si une image est introuvable (image par défaut locale).
- [ ] Implémenter un détecteur de doublons basé sur le `barcode`.