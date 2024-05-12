-- Create the 'shelter' database
CREATE DATABASE IF NOT EXISTS shelter;
USE shelter;

-- Create a table for users
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARBINARY(256) NOT NULL,
    IsAdmin BOOLEAN NOT NULL DEFAULT FALSE,
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for animals
CREATE TABLE IF NOT EXISTS Animals (
    AnimalID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Species VARCHAR(255) NOT NULL,
    Breed VARCHAR(255),
    Age INT,
    Gender ENUM('Male', 'Female', 'Unknown') DEFAULT 'Unknown',
    Description TEXT,
    PhotoUrl VARCHAR(255),
    AdoptionStatus ENUM('Available', 'Adopted', 'Pending') DEFAULT 'Available',
    ArrivalDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for adoptions
CREATE TABLE IF NOT EXISTS Adoptions (
    AdoptionID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    AnimalID INT,
    AdoptionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'Approved', 'Denied') DEFAULT 'Pending',
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AnimalID) REFERENCES Animals(AnimalID)
);

-- Create a table for forum posts
CREATE TABLE IF NOT EXISTS ForumPosts (
    PostID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Title VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    PostDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create a table for comments on forum posts
CREATE TABLE IF NOT EXISTS Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    PostID INT,
    UserID INT,
    CommentText TEXT NOT NULL,
    CommentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES ForumPosts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create a table for private messages
CREATE TABLE IF NOT EXISTS PrivateMessages (
    MessageID INT AUTO_INCREMENT PRIMARY KEY,
    SenderID INT,
    ReceiverID INT,
    MessageText TEXT NOT NULL,
    SendDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SenderID) REFERENCES Users(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES Users(UserID)
);

-- Create a table for support tickets
CREATE TABLE IF NOT EXISTS SupportTickets (
    TicketID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Subject VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    SubmissionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Open', 'Closed', 'Pending') DEFAULT 'Open',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
