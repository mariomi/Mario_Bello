INSERT INTO Animals (Name, Species, Breed, Age, Gender, Description, AdoptionStatus, PhotoUrl) VALUES
('Bella', 'Dog', 'Labrador', 3, 'Female', 'Friendly and energetic.', 'Available', 'https://drive.google.com/file/d/1ldEbTgLkUgWWlUTOV-eMgeq-vEgLh-hb/view?usp=sharing'),
('Max', 'Dog', 'German Shepherd', 5, 'Male', 'Loyal and courageous.', 'Available', 'https://drive.google.com/file/d/1KcmedBqSCWpNzqQn4xm_F60sNOX3e9RR/view?usp=sharing'),
('Charlie', 'Cat', 'Maine Coon', 4, 'Male', 'Charming and curious.', 'Available', 'https://drive.google.com/file/d/1HbFMK7JbDACQ4BHNq7Gamcz60t7tbSN8/view?usp=sharing'),
('Lucy', 'Cat', 'Persian', 2, 'Female', 'Quiet and loving.', 'Available', 'https://drive.google.com/file/d/19oPFCbe-O6N-_ZIMnj3ajLI1-KUBBnut/view?usp=sharing'),
('Zazu', 'Bird', 'Parrot', 2, 'Male', 'Vibrant and talkative.', 'Available', 'https://drive.google.com/file/d/1Yzn9chm9M87SzwjFtA9YGSdMrHvCCHto/view?usp=sharing'),
('Noodles', 'Rabbit', 'Angora', 1, 'Female', 'Soft and friendly.', 'Available', 'https://drive.google.com/file/d/1dfY-in1Cvui1F_dPV_m019FQ1BGK-qRz/view?usp=sharing'),
('Slinky', 'Snake', 'Corn Snake', 2, 'Male', 'Calm and gentle.', 'Available', 'https://drive.google.com/file/d/1u5Y0AZpGETnJqouR1sizwrl3SuDWCZJU/view?usp=sharing'),
('Gizmo', 'Lizard', 'Bearded Dragon', 4, 'Male', 'Laid-back and personable.', 'Available', 'https://drive.google.com/file/d/1AtD83b_XvzI-mGoMLxHqHBin7hcn02W5/view?usp=sharing'),
('Hedwig', 'Bird', 'Snowy Owl', 3, 'Female', 'Wise and majestic.', 'Pending', 'https://drive.google.com/file/d/1xpHoSWKJROa2RLjYSjpyABSyax4Po1Mt/view?usp=sharing'),
('Luna', 'Cat', 'Siamese', 3, 'Female', 'Playful and affectionate.', 'Available', 'https://drive.google.com/file/d/1fg-hZE8FwN8lFosxQxDc3xFFVoOW0a68/view?usp=sharing'),
('Rocky', 'Dog', 'Boxer', 6, 'Male', 'Energetic and fun-loving.', 'Available', 'https://drive.google.com/file/d/1jY_iv2N3qyIo4JOvDHe5x0GMXwrtnSyA/view?usp=sharing'),
('Jade', 'Dog', 'Border Collie', 4, 'Female', 'Intelligent and agile.', 'Available', 'https://drive.google.com/file/d/166ZYBshrgCEFT21RnEl8vdyVdu4P4j5m/view?usp=sharing'),
('Echo', 'Dolphin', 'Bottlenose', 8, 'Male', 'Smart and playful, lives in our marine sanctuary.', 'Available', 'https://drive.google.com/file/d/1KAWe6pWTZoaC7esuk-2wy7l7YK3TTpkV/view?usp=sharing'),
('Pepper', 'Guinea Pig', 'American', 2, 'Female', 'Sweet and vocal.', 'Available', 'https://drive.google.com/file/d/1L6u3jX3Ue1Wg2ZZULEPN2EVw4ldQXj2O/view?usp=sharing'),
('Flicker', 'Bird', 'Canary', 1, 'Male', 'Bright and cheerful singer.', 'Available', 'https://drive.google.com/file/d/17dC2YB76cr6zoAQquWWxEwc-_rf2KoPb/view?usp=sharing'),
('Chip', 'Squirrel', 'Grey Squirrel', 3, 'Male', 'Curious and acrobatic.', 'Available', 'https://drive.google.com/file/d/1ZxRhxSktk5eZwiPEwsbI-fkKrhHBWSHP/view?usp=sharing'),
('Thor', 'Horse', 'Clydesdale', 7, 'Male', 'Strong and gentle giant.', 'Pending', 'https://drive.google.com/file/d/1xrpq8wBjpfXrZMEYpKu33OhsVuML_yQ-/view?usp=sharing'),
('Cleo', 'Fish', 'Goldfish', 1, 'Female', 'Quiet and calming.', 'Available', 'https://drive.google.com/file/d/1vVuyEhhn2Oao8bt9NhkLI8QEcUAz3N44/view?usp=sharing'),
('Spike', 'Dog', 'Bulldog', 5, 'Male', 'Loyal and gentle couch potato.', 'Available', 'https://drive.google.com/file/d/1YsVWW936ieAdQaN7yEINo8cMXIQocgDQ/view?usp=sharing'),
('Misty', 'Cat', 'Bengal', 3, 'Female', 'Energetic and mischievous.', 'Available', 'https://drive.google.com/file/d/1K09ruB_Dbh3yJ5p0w6lFqz0LzUtN6ZaV/view?usp=sharing');

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
