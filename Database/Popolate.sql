INSERT INTO Animals (Name, Species, Breed, Age, Gender, Description, AdoptionStatus, PhotoUrl) VALUES
('Bella', 'Dog', 'Labrador', 3, 'Female', 'Friendly and energetic.', 'Available', 'https://drive.google.com/uc?export=view&id=1ldEbTgLkUgWWlUTOV-eMgeq-vEgLh-hb'),
('Max', 'Dog', 'German Shepherd', 5, 'Male', 'Loyal and courageous.', 'Available', 'https://drive.google.com/uc?export=view&id=1KcmedBqSCWpNzqQn4xm_F60sNOX3e9RR'),
('Charlie', 'Cat', 'Maine Coon', 4, 'Male', 'Charming and curious.', 'Available', 'https://drive.google.com/uc?export=view&id=1HbFMK7JbDACQ4BHNq7Gamcz60t7tbSN8'),
('Lucy', 'Cat', 'Persian', 2, 'Female', 'Quiet and loving.', 'Available', 'https://drive.google.com/uc?export=view&id=19oPFCbe-O6N-_ZIMnj3ajLI1-KUBBnut'),
('Zazu', 'Bird', 'Parrot', 2, 'Male', 'Vibrant and talkative.', 'Available', 'https://drive.google.com/uc?export=view&id=1Yzn9chm9M87SzwjFtA9YGSdMrHvCCHto'),
('Noodles', 'Rabbit', 'Angora', 1, 'Female', 'Soft and friendly.', 'Available', 'https://drive.google.com/uc?export=view&id=1dfY-in1Cvui1F_dPV_m019FQ1BGK-qRz'),
('Slinky', 'Snake', 'Corn Snake', 2, 'Male', 'Calm and gentle.', 'Available', 'https://drive.google.com/uc?export=view&id=1u5Y0AZpGETnJqouR1sizwrl3SuDWCZJU'),
('Gizmo', 'Lizard', 'Bearded Dragon', 4, 'Male', 'Laid-back and personable.', 'Available', 'https://drive.google.com/uc?export=view&id=1AtD83b_XvzI-mGoMLxHqHBin7hcn02W5'),
('Hedwig', 'Bird', 'Snowy Owl', 3, 'Female', 'Wise and majestic.', 'Pending', 'https://drive.google.com/uc?export=view&id=1xpHoSWKJROa2RLjYSjpyABSyax4Po1Mt'),
('Luna', 'Cat', 'Siamese', 3, 'Female', 'Playful and affectionate.', 'Available', 'https://drive.google.com/uc?export=view&id=1fg-hZE8FwN8lFosxQxDc3xFFVoOW0a68'),
('Rocky', 'Dog', 'Boxer', 6, 'Male', 'Energetic and fun-loving.', 'Available', 'https://drive.google.com/uc?export=view&id=1jY_iv2N3qyIo4JOvDHe5x0GMXwrtnSyA'),
('Jade', 'Dog', 'Border Collie', 4, 'Female', 'Intelligent and agile.', 'Available', 'https://drive.google.com/uc?export=view&id=166ZYBshrgCEFT21RnEl8vdyVdu4P4j5m'),
('Echo', 'Dolphin', 'Bottlenose', 8, 'Male', 'Smart and playful, lives in our marine sanctuary.', 'Available', 'https://drive.google.com/uc?export=view&id=1KAWe6pWTZoaC7esuk-2wy7l7YK3TTpkV'),
('Pepper', 'Guinea Pig', 'American', 2, 'Female', 'Sweet and vocal.', 'Available', 'https://drive.google.com/uc?export=view&id=1L6u3jX3Ue1Wg2ZZULEPN2EVw4ldQXj2O'),
('Flicker', 'Bird', 'Canary', 1, 'Male', 'Bright and cheerful singer.', 'Available', 'https://drive.google.com/uc?export=view&id=17dC2YB76cr6zoAQquWWxEwc-_rf2KoPb'),
('Chip', 'Squirrel', 'Grey Squirrel', 3, 'Male', 'Curious and acrobatic.', 'Available', 'https://drive.google.com/uc?export=view&id=1ZxRhxSktk5eZwiPEwsbI-fkKrhHBWSHP'),
('Thor', 'Horse', 'Clydesdale', 7, 'Male', 'Strong and gentle giant.', 'Pending', 'https://drive.google.com/uc?export=view&id=1xrpq8wBjpfXrZMEYpKu33OhsVuML_yQ-'),
('Cleo', 'Fish', 'Goldfish', 1, 'Female', 'Quiet and calming.', 'Available', 'https://drive.google.com/uc?export=view&id=1vVuyEhhn2Oao8bt9NhkLI8QEcUAz3N44'),
('Spike', 'Dog', 'Bulldog', 5, 'Male', 'Loyal and gentle couch potato.', 'Available', 'https://drive.google.com/uc?export=view&id=1YsVWW936ieAdQaN7yEINo8cMXIQocgDQ'),
('Misty', 'Cat', 'Bengal', 3, 'Female', 'Energetic and mischievous.', 'Available', 'https://drive.google.com/uc?export=view&id=1K09ruB_Dbh3yJ5p0w6lFqz0LzUtN6ZaV');

-- Inserting Users
INSERT INTO Users (Username, Email, PasswordHash, IsAdmin) VALUES
('john_doe', 'john@example.com', UNHEX(SHA2('johnspassword',256)), FALSE),
('jane_smith', 'jane@example.com', UNHEX(SHA2('janespassword',256)), TRUE),
('alice_jones', 'alice@example.com', UNHEX(SHA2('alicespassword',256)), FALSE),
('bob_brown', 'bob@example.com', UNHEX(SHA2('bobspassword',256)), FALSE),
('sarah_connor', 'sarah@example.com', UNHEX(SHA2('sarahspassword',256)), FALSE);

-- Inserting Adoptions (linking them to users and animals)
INSERT INTO Adoptions (UserID, AnimalID, AdoptionDate, Status) VALUES
(1, 1, NOW(), 'Approved'),
(2, 2, NOW(), 'Pending'),
(3, 3, NOW(), 'Approved'),
(4, 4, NOW(), 'Approved'),
(5, 5, NOW(), 'Pending');

-- Inserting ForumPosts
INSERT INTO ForumPosts (UserID, Title, Content, PostDate) VALUES
(1, 'Looking for Pet Advice', 'What food do you recommend for a Labrador?', NOW()),
(2, 'Cat Training Tips', 'How do I stop my cat from scratching furniture?', NOW()),
(3, 'Bird Care', 'Best cage setups for parrots?', NOW()),
(4, 'Meet My New Pet', 'Just adopted a German Shepherd, meet Max!', NOW()),
(5, 'Adoption Stories', 'Share your adoption stories here!', NOW());

-- Inserting Comments on ForumPosts
INSERT INTO Comments (PostID, UserID, CommentText, CommentDate) VALUES
(1, 2, 'Try high protein foods!', NOW()),
(1, 3, 'Our Lab loves chicken-based foods.', NOW()),
(2, 4, 'Use a scratching post.', NOW()),
(3, 5, 'Make sure the cage is spacious.', NOW()),
(4, 1, 'He looks very handsome!', NOW());

-- Inserting PrivateMessages
INSERT INTO PrivateMessages (SenderID, ReceiverID, MessageText, SendDate) VALUES
(1, 2, 'Can you help me with dog training?', NOW()),
(2, 3, 'Thanks for the advice!', NOW()),
(3, 4, 'Want to meet up for a pet play date?', NOW()),
(4, 5, 'How do I update my adoption application?', NOW()),
(5, 1, 'Thank you for your support!', NOW());

-- Inserting SupportTickets
INSERT INTO SupportTickets (UserID, Subject, Description, SubmissionDate, Status) VALUES
(1, 'Login Issue', 'I cannot log into my account.', NOW(), 'Open'),
(2, 'Profile Update', 'Need help updating my profile picture.', NOW(), 'Open'),
(3, 'Adoption Question', 'Can I adopt two pets at once?', NOW(), 'Pending'),
(4, 'Found a Bug', 'There is a bug in the adoption listing page.', NOW(), 'Open'),
(5, 'Suggestion', 'Add more bird species to the adoption list.', NOW(), 'Pending');
