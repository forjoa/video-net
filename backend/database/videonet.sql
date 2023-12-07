create database videonet;

use videonet;

-- Tabla users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(255),
    description TEXT,
    photo VARCHAR(255),
    email VARCHAR(255),
    pwd VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla videos
CREATE TABLE videos (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    concept TEXT,
    url VARCHAR(255),
    userID INT,
    FOREIGN KEY (userID) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla followers
CREATE TABLE followers (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    followed INT,
    follower INT,
    FOREIGN KEY (followed) REFERENCES users(id),
    FOREIGN KEY (follower) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from users;
select * from videos;
select * from followers;

