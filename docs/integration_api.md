# 🌐 Documentation : Gestion des APIs Externes & Harmonisation

Cette documentation détaille l'architecture utilisée pour transformer les données des APIs externes en un modèle de données unique (`Item`) au sein de notre base MongoDB.

---

## 🏗️ Architecture du Flux de Données

Le processus suit une chaîne de responsabilité stricte :
1. **Services (`/services`)** : Récupèrent les données brutes via Axios.
2. **Mappers (`/utils/harmonizedData.js`)** : Nettoient et formatent les données.
3. **Routes (`/routes`)** : Enregistrent l'objet final sur Proxmox.

---

## 📋 Modèle de Données Harmonisé

Chaque objet respecte la structure racine suivante :
* `type`: Catégorie de l'objet.
* `title`: Titre de l'œuvre.
* `cover_url`: Lien HTTPS vers l'image.
* `barcode`: Identifiant physique (ISBN/EAN).
* `metadata`: Objet flexible contenant les détails spécifiques ci-dessous.

---

## 🔍 Détail des Metadatas par Type
Chaque service remplit l'objet `metadata` avec des clés spécifiques à son domaine.

### 📚 Type : `book` / `comic` (Google Books)
| Clé | Type | Description |
| :--- | :--- | :--- |
| `authors` | Array | Liste des auteurs (ex: `["Antoine de Saint-Exupéry"]`). |
| `publisher` | String | Maison d'édition. |
| `publishedDate`| String | Date de publication (format YYYY-MM ou YYYY). |
| `pageCount` | Number | Nombre de pages. |
| `language` | String | Code langue (ex: `"fr"`). |
| `categories` | Array | Tags thématiques. |
| `description` | String | Résumé de l'ouvrage. |
| `subtitle` | String | Sous-titre ou nom de la série. |

### 🎵 Type : `music` (Discogs)
| Clé | Type | Description |
| :--- | :--- | :--- |
| `artist` | String | Nom de l'artiste ou du groupe. |
| `year` | String | Année de sortie du pressage. |
| `genres` | Array | Styles musicaux larges (ex: `["Electronic"]`). |
| `styles` | Array | Sous-genres précis (ex: `["Synth-pop"]`). |
| `format` | Array | Support physique (ex: `["Vinyl", "LP"]`). |
| `label` | String | Maison de disque (ex: `"Columbia"`). |
| `country` | String | Pays d'origine du pressage. |

### 🎬 Type : `movie` (TMDB)
| Clé | Type | Description |
| :--- | :--- | :--- |
| `id_tmdb` | Number | ID technique pour les futures mises à jour. |
| `release_date` | String | Date de sortie cinéma. |
| `overview` | String | Synopsis du film. |
| `rating` | Number | Note moyenne des utilisateurs. |
| `genres` | Array | Genres cinématographiques. |
| `runtime` | Number | Durée en minutes. |

---