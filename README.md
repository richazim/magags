# Bienvenue

## Sommaire

1. [Stack technique](#stack-technique)  
2. [Lancer le backend du projet](#lancer-le-backend-appwrite-localement)
3. [Base de données et Bucket Appwrite](#base-de-données-et-bucket-appwrite)
4. [Lancer le projet Expo](#lancer-le-projet-expo)

## Stack technique

Ce projet mobile est construit avec les technologies suivantes :

- **React Native** — Base du développement mobile multiplateforme  
- **Expo** — Outils de développement, compilation et déploiement  
- **Nativewind** — Utilisation de Tailwind CSS dans React Native  
- **React Native Size Matters** — Gestion responsive des tailles d’éléments  
- **React Native Papper** — UI réellement adaptative
- **React Native Animatable** — Animations simples et performantes  
- **Appwrite** — Backend open-source (authentification, base de données, stockage, etc.)

## Lancer le backend Appwrite localement

L'application utilise [**Appwrite**](https://appwrite.io/) comme backend (authentification, base de données, stockage, etc.).

### Option recommandée : via Docker

> Assurez-vous d'avoir **Docker** et **Docker Compose** installés sur votre machine. Pour cela, installer [**docker**](https://www.docker.com) sur votre machine.

#### 1. **Cloner le dépôt**

```bash
git clone https://github.com/richazim/magags.git
```

#### 2. **Allez dans le dossier appwrite**

```bash
cd appwrite
```

#### 3. **Démarrer les services Appwrite**

```bash
docker compose up -d
```

>Par défaut, l'interface Appwrite sera disponible sur [http://localhost:80](http://localhost:80).

#### 4. **Accéder à l'interface Appwrite**

Rendez-vous sur [http://localhost:80](http://localhost:80) dans votre navigateur pour :

#### 5. **Configuration du projet mobile**

> Dans votre interface appwrite:

- Créer un compte Appwrite local.
- Créer un projet Appwrite puis copier l'identifiant du projet pour l'utiliser dans le fichier .env.
- Ajouter une platforme au projet Appwrite de préférence la platforme Android puis copier également l'id du platforme pour pouvoir l'utiliser dans .env
- Suivre la même procédé pour la création d'une base de donnée, ses tables.
- Faire pareil également pour la création d'un bucket

>Dans votre app Expo, votre fichier .env à la racine doit ressemblez à ça :

```env
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

```zsh
APPWRITE_ENDPOINT=http://192.168.X.XXX/v1
```

## Base de données et Bucket Appwrite

Vous avez la possibilité de configurer appwrite en local à partir du dossier **/appwrite** si vous disposer de docker déjà installer sur votre machine.

### Tables Appwrite à créer

---

#### `users`

| Colonne       | Type        | Contraintes              | Description                  |
|---------------|-------------|---------------------------|------------------------------|
| `username`    | `String` | Required        | Nom d'utilisateur            |
| `email`       | `Email` | Required       | Email de l'utilisateur       |
| `avatarUrl`    | `Url`      |                  | Mot de passe hashé           |
| `accountId`  | `TIMESTAMP` | Required | Identifiant d'authentification appwrite             |

---

#### `videos`

| Colonne       | Type        | Contraintes               | Description                  |
|---------------|-------------|---------------------------|------------------------------|
| `creatorId`     | `RELATIONSHIP`   | FK → `users.id`, NOT NULL | Auteur de la vidéo           |
| `title`       | `VARCHAR(255)` | NOT NULL               | Titre de la vidéo            |
| `thumbnailUrl` | `TEXT`      |                           | Description facultative      |
| `videoUrl`   | `TEXT`      | NOT NULL                  | Chemin du fichier vidéo      |
| `videoStorageId`  | `TIMESTAMP` | DEFAULT CURRENT_TIMESTAMP | Date d’ajout                 |
| `thumbnailStorageId`  | `TIMESTAMP` | DEFAULT CURRENT_TIMESTAMP | Date d’ajout                 |

---

#### `favorites`

| Colonne       | Type        | Contraintes                    | Description                  |
|---------------|-------------|--------------------------------|------------------------------|
| `userId`     | `INTEGER`   | FK → `users.id`, NOT NULL      | Utilisateur qui a bookmarké |
| `videoId`    | `INTEGER`   | FK → `videos.id`, NOT NULL     | Vidéo bookmarkée             |

### Bucket Appwrite

---

## Lancer le projet Expo

### 1. Se placer à la racine du projet

### 2. Installer les dépendances

```bash
npm install
```

### 3. Démarrer l’application en local

```bash
npx expo start
```

>Vous aurez la possibilité d'ouvrir l’application dans :

- Émulateur Android
- Simulateur iOS
- Expo Go (dans votre téléphone mobile)
