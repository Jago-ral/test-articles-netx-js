# Application Lecture d'articles en Next.js


## Stack Technique

- **Framework** : Next.js 15 (stable) avec App Router
- **Runtime** : React 19
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **API** : JSONPlaceholder

## Installation et Lancement

### Prérequis
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
# Accessible sur http://localhost:3000 (si le port 300 est libre)
```

### Production
```bash
npm run build
npm start
```


## Gestion du Rendu et Cache

### Stratégies de Rendu Implémentées

#### 1. ISR (Incremental Static Regeneration)
**Utilisé pour** : Liste des articles (`/posts`)

Le choix de l'ISR s'explique par :
- Les articles changent peu fréquemment sur l'API externe
- Besoin d'améliorer la performance de l'app
- Possibilité de revalidation automatique toutes les heures (3600s)

```typescript
fetch("https://jsonplaceholder.typicode.com/posts", {
  next: { revalidate: 3600, tags: ["posts"] }
});
```

**Avantages** :
- Temps de réponse instantané (contenu en cache)
- Mise à jour automatique 
- Réduction de charge sur l'API externe

#### 2. SSG (Static Site Generation)
**Utilisé pour** : Pages détail des 9 premiers articles (`/posts/[id]`)

Les 9 premiers articles sont pré-générés au build via `generateStaticParams()`. Ce choix est justifié pour :
- Performances optimales (pages statiques servies depuis CDN)
- SEO maximal pour le contenu populaire

#### 3. SSR (Server-Side Rendering)
**Utilisé pour** : Articles au-delà de l'ID 10

Les articles non pré-générés sont rendus à la demande côté serveur, avec cache ISR (revalidation 3600s).

**Raison du choix** : Équilibre entre couverture complète (tous les articles accessibles) et optimisation des ressources build.

### Implémentation du Rafraîchissement du Cache

#### Méthode Choisie : API Route + revalidateTag

**Fichier** : `app/api/revalidate/route.ts`

```typescript
export async function POST() {
  revalidateTag("posts");
  return NextResponse.json({ revalidated: true });
}
```

**Fonctionnement** :
1. Utilisateur clique sur "Rafraîchir" dans l'interface
2. Requête POST envoyée vers `/api/revalidate`
3. `revalidateTag("posts")` invalide tout le cache portant le tag "posts"
4. Rechargement de la page pour afficher les nouvelles données
5. Le fetch suivant régénère le cache avec données fraîches

**Choix technique** : API Route plutôt que Server Action pour garantir compatibilité maximale avec le mode développement de Next.js.

### Améliorations Futures

Avec plus de temps, j'aurais implémenté :

1. **Optimistic UI** : Afficher immédiatement le changement avant confirmation serveur pour meilleure perception de réactivité

2. **Debouncing sur recherche** : Éviter re-renders excessifs lors de la frappe dans le champ de recherche

3. **Pagination serveur** : Actuellement, les 100 articles sont chargés d'un coup. Une pagination réduirait charge initiale et consommation mémoire

4. **Metadata dynamique** : Générer `generateMetadata()` pour chaque article avec titre et description pour améliorer SEO et partage social

5. **Revalidation différenciée** : Distinction entre revalidation globale (liste) et revalidation d'un article spécifique pour granularité accrue

6. **Service Worker** : Mise en cache côté client avec stratégie stale-while-revalidate pour expérience offline et performances mobiles

