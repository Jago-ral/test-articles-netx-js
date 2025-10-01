# **Test technique Frontend**

## **🎯 Objectif**

Créer une mini application **Next.js 15 (App Router)** + **Tailwind**.

On veut évaluer ta capacité à :

- Coder proprement et clairement
- Utiliser le cache / la revalidation de Next.js
- Expliquer tes choix techniques

---

## **📚 Fonctionnalités attendues**

### **1. Page liste**

### **/posts**

- Affiche une liste d’articles depuis :
 
 https://jsonplaceholder.typicode.com/posts
 
- Ajoute un champ de recherche côté client (filtrage en mémoire)
- Chaque carte doit mener vers une page détail

---

### **2. Page détail**

### **/posts/[id]**

- Affiche les infos de l’article
- Inclure un petit “extra” UX (par ex. modal avec le JSON brut ou autre idée)

---

### **3. Cache & Revalidation**

- Les données ne doivent pas être systématiquement refetch côté serveur
- Mets en place le système de **cache/revalidation** de Next.js
- Ajoute un bouton qui permet de **rafraîchir la liste** manuellement

---

### **4. États & UX**

- Gérer le chargement et les erreurs proprement
- UI simple, propre et lisible avec Tailwind

---

## **⚙️ Contraintes techniques**

- Utiliser **App Router** (app/) avec composants serveur par défaut
- Utiliser **Tailwind** pour le style
- Pas de librairie externe de state management

---

## **📦 Livrables**

- Repo GitHub avec instructions de lancement (npm ou pnpm)
- Un **README (max 1 page)** qui explique :
 - Comment tu as géré le rendu (SSG / ISR / SSR) et pourquoi
 - Comment tu as implémenté le rafraîchissement du cache
 - Ce que tu améliorerais avec plus de temps

---

## **⏱️ Durée indicative**

**2 à 3 heures**

---

## **✅ Ce qu’on va regarder**

- Bonne utilisation du cache et de la revalidation
- Clarté et propreté du code
- Explication des choix dans le README
- UX de base (loading, error, recherche, refresh)