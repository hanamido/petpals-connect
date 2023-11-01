-- CS367 - PetPals Connect
-- Breanna Tran, Alyssa Feutz, Hanami Do, Julian Macleod

-- Sample Data for App Development

-- Adds sample data to Prospective_Owners table
INSERT INTO Prospective_Owners (first_name, last_name, phone_number, email, street, city, state, zip_code)
VALUES ('Carlos', 'Wilson', '706-719-0889', 'cwilson@gmail.com', '3285 Radio Park Drive', 'Madison', 'GA', '30650'),
('Ida', 'Rutledge', '951-818-0325', 'irutledge@gmail.com', '4807 Thunder Road', 'Palo Alto', 'CA', '94306'),
('Sylvia', 'Cordell', '407-722-5399', 'scordell@gmail.com', '3338 Grand Avenue', 'Orlando', 'FL', '32805');

-- Adds sample data to Breeds table
INSERT INTO Breeds (breed_name, type_id)
VALUES ('German Shepherd', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('Bulldog', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('Golden Retriever', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('French Bulldog', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('Poodle', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('Chihuahua', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('Siberian Husky', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('Dachshund', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('Abyssinian', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Balinese', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Bengal', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Burmese', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Calico', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Domestic Longhair', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Domestic Shorthair', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Russian Blue', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Sphynx', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Other', (SELECT type_id FROM Types WHERE type_name = 'Dog')),
('Other', (SELECT type_id FROM Types WHERE type_name = 'Cat')),
('Other', (SELECT type_id FROM Types WHERE type_name = 'Other'));

-- Adds sample data to Animals table
INSERT INTO Animals (name, animal_type, picture, animal_availability, description)
VALUES ('Orion', (SELECT type_id FROM Types WHERE type_name = 'Dog'), 'Orion.jpeg', (SELECT availability_id FROM Availability_Options WHERE description = 'Available'), 'I am a neutered male, black and white Siberian Husky. I am about 8 years old. I have been at the shelter since Oct 25, 2023.'),
('Daffodil', (SELECT type_id FROM Types WHERE type_name = 'Dog'), 'Daffodil.jpeg', (SELECT availability_id FROM Availability_Options WHERE description = 'Pending'), 'I am a spayed female, brown and tan Chihuahua. I am about 11 months old. I have been at the shelter since Oct 9, 2023.'),
('Mochi', (SELECT type_id FROM Types WHERE type_name = 'Cat'), 'Mochi.jpeg', (SELECT availability_id FROM Availability_Options WHERE description = 'Available'), 'I am a neutered male, orange and white Domestic Shorthair. I am about 6 months old. I have been at the shelter since Oct 4, 2023.'),
('Latte', (SELECT type_id FROM Types WHERE type_name = 'Other'), 'Latte.jpeg', (SELECT availability_id FROM Availability_Options WHERE description = 'Adopted'), 'I am a neutered male, white English Spot. I am about 5 months old. I have been at the shelter since Oct 29, 2023.');

-- Adds sample data to Animal_Breeds table
INSERT INTO Animal_Breeds (animal_id, breed_id)
VALUES ((SELECT animal_id FROM Animals WHERE name = 'Orion'), (SELECT breed_id FROM Breeds WHERE breed_name = 'Siberian Husky' AND type_id = (SELECT animal_type FROM Animals WHERE name = 'Orion'))),
((SELECT animal_id FROM Animals WHERE name = 'Daffodil'), (SELECT breed_id FROM Breeds WHERE breed_name = 'Chihuahua' AND type_id = (SELECT animal_type FROM Animals WHERE name = 'Daffodil'))),
((SELECT animal_id FROM Animals WHERE name = 'Mochi'), (SELECT breed_id FROM Breeds WHERE breed_name = 'Domestic Shorthair' AND type_id = (SELECT animal_type FROM Animals WHERE name = 'Mochi'))),
((SELECT animal_id FROM Animals WHERE name = 'Latte'), (SELECT breed_id FROM Breeds WHERE breed_name = 'Other' AND type_id = (SELECT animal_type FROM Animals WHERE name = 'Latte')));

-- Adds sample data to Animal_Dispositions table
INSERT INTO Animal_Dispositions (animal_id, disposition_id)
VALUES ((SELECT animal_id FROM Animals WHERE name = 'Orion'), (SELECT disposition_id FROM Dispositions WHERE description = 'Animal must be leashed at all times')),
((SELECT animal_id FROM Animals WHERE name = 'Daffodil'), (SELECT disposition_id FROM Dispositions WHERE description = 'Good with children')),
((SELECT animal_id FROM Animals WHERE name = 'Mochi'), (SELECT disposition_id FROM Dispositions WHERE description = 'Good with other animals')),
((SELECT animal_id FROM Animals WHERE name = 'Mochi'), (SELECT disposition_id FROM Dispositions WHERE description = 'Good with children')),
((SELECT animal_id FROM Animals WHERE name = 'Latte'), (SELECT disposition_id FROM Dispositions WHERE description = 'Good with children'));

-- Adds sample data to Applications table
INSERT INTO Applications (owner_id, animal_id)
VALUES ((SELECT owner_id FROM Prospective_Owners WHERE first_name = 'Carlos' AND last_name = 'Wilson'), (SELECT animal_id FROM Animals WHERE name = 'Daffodil')),
((SELECT owner_id FROM Prospective_Owners WHERE first_name = 'Sylvia' AND last_name = 'Cordell'), (SELECT animal_id FROM Animals WHERE name = 'Mochi')),
((SELECT owner_id FROM Prospective_Owners WHERE first_name = 'Ida' AND last_name = 'Rutledge'), (SELECT animal_id FROM Animals WHERE name = 'Orion'));