# Bienvenue

## Sommaire

1. [🧰 Stack technique](#stack-technique)  
2. [🚀 Lancer le projet](#lancer-le-projet)

## Stack technique

Ce projet mobile est construit avec les technologies suivantes :

- **React Native** — Base du développement mobile multiplateforme  
- **Expo** — Outils de développement, compilation et déploiement  
- **Nativewind** — Utilisation de Tailwind CSS dans React Native  
- **React Native Size Matters** — Gestion responsive des tailles d’éléments  
- **React Native Animatable** — Animations simples et performantes  
- **Appwrite** — Backend open-source (authentification, base de données, stockage, etc.)

## 🧱 Lancer le backend Appwrite localement

L'application utilise [**Appwrite**](https://appwrite.io/) comme backend (authentification, base de données, stockage, etc.).

### 🐳 Option recommandée : via Docker

> Assurez-vous d'avoir **Docker** et **Docker Compose** installés sur votre machine.

1. **Cloner le dépôt**

```bash
git clone https://github.com/richazim/magags.git
cd appwrite
```

2. **Allez dans le dossier appwrite**

3. **Démarrer les services Appwrite**

```bash
docker compose up -d
```
>Par défaut, l'interface Appwrite sera disponible sur http://localhost:80.

4. **Accéder à l'interface Appwrite**

Rendez-vous sur http://localhost dans votre navigateur pour :
- Créer un compte Appwrite local puis
- Créer un projet Appwrite
- ...

5. **Configuration du projet mobile**

Dans votre app Expo, créez un fichier .env à la racine avec vos paramètres Appwrite :

```python
EXPO_PUBLIC_APPWRITE_ENDPOINT=http://localhost/v1

EXPO_PUBLIC_APPWRITE_PROJECT_ID=<votre_project_id>

EXPO_PUBLIC_APPWRITE_APPLICATION_ID=<votre_application_id>

EXPO_PUBLIC_APPWRITE_DATABASE_ID=<votre_database_id>

EXPO_PUBLIC_APPWRITE_USER_ID=<votre_user_id>

EXPO_PUBLIC_APPWRITE_VIDEO_ID=<votre_video_id>

EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID=<votre_bookmarks_id>

EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=<votre_bucket_id>
```

>Si vous développez sur Expo Go d'un mobile physique (et non dans le simulateur de votre pc ou mac), remplacez localhost par l’IP locale de votre machine, accessible depuis le téléphone.
```
APPWRITE_ENDPOINT=http://192.168.X.XXX/v1
```

## Démarrer le projet

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer l’application en local

```bash
npx expo start
```
Une fois le serveur Expo lancé, vous pouvez ouvrir l’application dans :

- Émulateur Android
- Simulateur iOS
- Expo Go (dans votre téléphone mobile)
