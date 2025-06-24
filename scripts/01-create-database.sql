    -- Création de la base de données
    CREATE DATABASE IF NOT EXISTS psychology_cabinet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

    USE psychology_cabinet;

    -- Table des praticiens
    CREATE TABLE practitioners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        photo_url VARCHAR(500),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Table des services
    CREATE TABLE services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Table des rendez-vous
    CREATE TABLE appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        practitioner_id INT NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (practitioner_id) REFERENCES practitioners(id)
    );

    -- Table des messages de contact
    CREATE TABLE contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Table des articles
    CREATE TABLE articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        published_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );