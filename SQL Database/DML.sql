-- Data Manipulation Queries
-- CS467 - PetPals Connect
-- Breanna Tran, Alyssa Feutz, Hanami Do, Julian Macleod


-- -----------------------------------------------------
-- Prospective Owners Entity
-- -----------------------------------------------------

-- CREATE: Add a new prospective owner
-- User types in all info into input elements except dropdown for state
INSERT INTO Prospective_Owners (first_name, last_name, phone_number, email, street, city, state, zip_code) VALUES (:first_name_input, :last_name_input, :phone_number_input, :email_input, :street_input, :city_input, :state_dropdown, :zip_code_input);

-- READ:
-- Get all info in Prospective_Owners table
SELECT * FROM Prospective_Owners;

-- Get first and last name from owner id (for Applications table)
SELECT first_name, last_name FROM Prospective_Owners WHERE owner_id = given_owner_id;

-- UPDATE: Update candidate contact info or address
-- Input elements/dropdowns are prefilled with existing data and user can update values as needed (first name is fixed)
UPDATE Prospective_Owners SET last_name = :last_name_input, phone_number = :phone_number_input, email = :email_input, street = :street_input, city = :city_input, state = :state_input, zip_code = :zip_code_input WHERE owner_id = :owner_id_of_user;

-- DELETE: Delete a prospective owner
-- Admin user finds prospective owner name from table and selects delete button or prospective owner deletes account
DELETE FROM Prospective_Owners WHERE owner_id = :owner_id_associated_to_delete_button;


-- -----------------------------------------------------
-- Availability_Options Entity
-- -----------------------------------------------------

-- CREATE: No ability to create new options, the four options were provided in project description

-- READ: 
-- Get all info in Availability_Options table
SELECT * FROM Availability_Options;

-- Get description from availability_id (for Animals table)
SELECT description FROM Availability_Options WHERE availability_id = given_animal_availability;

-- UPDATE: No ability to update options, the four options were provided in project description

-- DELETE: No ability to delete options, the four options were provided in project description


-- -----------------------------------------------------
-- Types Entity
-- -----------------------------------------------------

-- CREATE: No ability to create new options, the three options were provided in project description

-- READ: 
-- Get all info in Types table
SELECT * FROM Types;

-- Get type_name from type_id (for Animals table and Breeds table)
SELECT type_name FROM Types WHERE type_id = given_type_id;

-- UPDATE: No ability to update options, the three options were provided in project description

-- DELETE: No ability to delete options, the three options were provided in project description


-- -----------------------------------------------------
-- Animals Entity
-- -----------------------------------------------------

-- CREATE: Add new animal
-- Admin user types in info into input elements and selects from dropdowns
INSERT INTO Animals (name, picture, description, animal_type, animal_availability) VALUES (:name_input, :picture_input, :description_input, :animal_type_dropdown, :animal_availability_dropdown);

-- CREATE: Add new animal given the animal_type input and availability input
INSERT INTO Animals (name, animal_type, picture, animal_availability, description)
VALUES (:name_input, (SELECT type_id FROM Types WHERE type_name = :description), :image_input, (SELECT availability_id FROM Availability_Options WHERE description = :availability_input), :description_input)

-- READ: Get all info in Animals table
SELECT * FROM Animals;

-- UPDATE: Update an animal profile
-- Input elements/Dropdowns are prefilled with existing data and user can update values as needed
UPDATE Animals SET name = :name_input, animal_type = :animal_type_dropdown, picture = :picture_input, animal_availability = :animal_availability_dropdown, description = :description_input WHERE animal_id = :animal_id_of_selected_animal;

-- DELETE: Delete an animal
-- Admin user finds animal from table and selects delete button
DELETE FROM Animals WHERE animal_id = :animal_id_associated_to_delete_button;

-- READ: Show animals, their type, their breed, their availability, and their dispositions (as one property)
SELECT Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, GROUP_CONCAT(Dispositions.description SEPARATOR ', ') as animalDisposition 
	FROM ((Animals
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animals.animal_id)
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id
         INNER JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id)
         INNER JOIN Types ON Animals.animal_type = Types.type_id
         group by animal_id;

-- READ: Show an animal based on the animal_id
SELECT Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, GROUP_CONCAT(Dispositions.description SEPARATOR ', ') as animalDisposition
	FROM ((Animals
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animals.animal_id)
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id
         INNER JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id)
         INNER JOIN Types ON Animals.animal_type = Types.type_id
         WHERE Animals.animal_id = :animal_id_in_request;


-- -----------------------------------------------------
-- Applications Entity
-- -----------------------------------------------------

-- CREATE: Add new application
-- Gets created when prospective owner submits application for an animal
INSERT INTO Applications (owner_id, animal_id) VALUES (:owner_id_associated_to_user, :animal_id_of_selected_animal);

-- READ: 
-- Get all info in Applications table
SELECT * FROM Applications;

-- UPDATE: No ability to update options, the owner_id and animal_id will not change

-- DELETE: Delete an application
-- User can delete an application if they're no longer interested
DELETE FROM Applications WHERE owner_id = :owner_id_associated_to_user, animal_id = :animal_id_of_selected_animal);


-- -----------------------------------------------------
-- Breeds Entity
-- -----------------------------------------------------

-- CREATE: Add a breed
-- Admin user can add a breed to database
INSERT INTO Breeds (breed_name, type_id) VALUES (:breed_name_input, :type_dropdown);

-- READ: 
-- Get all info in Breeds table
SELECT * FROM Breeds;

-- Get all breeds from animal_type
SELECT breed_name FROM Breeds WHERE type_id = :given_type;

-- UPDATE: Update a breed_name
-- Admin user should only update breed_name to fix spelling issues or to update the animal_type if this info was entered incorrectly previously
UPDATE Breeds SET breed_name = :breed_name_input, type_id = :type_dropdown WHERE breed_id = :breed_id_of_selected_breed;

-- DELETE: Breed cannot be deleted since animals must have a breed


-- -----------------------------------------------------
-- Animal_Breeds Entity
-- -----------------------------------------------------

-- CREATE: Add new animal_breeds
-- Gets created when admin user creates profile animal
INSERT INTO Animal_Breeds (breed_id, animal_id) VALUES (:breed_id_associated_to_breed, :animal_id_of_selected_animal);

-- READ: 
-- Get all info in Animal_Breeds table
SELECT * FROM Animal_Breeds;

-- Get breeds in Animal_Breeds table from animal_id
SELECT breed_id FROM Animal_Breeds WHERE animal_id = given_animal_id;

-- UPDATE: No ability to update options, entries can either be deleted or added

-- DELETE: Delete an entry
-- Admin user can delete an entry if they remove a breed option from an animal
DELETE FROM Animal_Breeds WHERE breed_id = :breed_id_associated_to_breed, animal_id = :animal_id_of_selected_animal);


-- -----------------------------------------------------
-- Dispositions Entity
-- -----------------------------------------------------

-- CREATE: No ability to create new options, the three options were provided in project description

-- READ: 
-- Get all info in Dispositions table
SELECT * FROM Dispositions;

-- UPDATE: No ability to update options, the three options were provided in project description

-- DELETE: No ability to delete options, the three options were provided in project description


-- -----------------------------------------------------
-- Animal_Dispositions Entity
-- -----------------------------------------------------

-- CREATE: Add new animal_dispositions
-- Gets created when admin user creates profile animal
INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES (:disposition_id_associated_to_selected_disposition, :animal_id_of_selected_animal);

-- READ: 
-- Get all info in Animal_Dispositions table
SELECT * FROM Animal_Dispositions;

-- Get breeds in Animal_Dispositions table from animal_id
SELECT disposition_id FROM Animal_Breeds WHERE animal_id = given_animal_id;

-- UPDATE: No ability to update options, entries can either be deleted or added

-- DELETE: Delete an entry
-- Admin user can delete an entry if they remove a disposition option from an animal
DELETE FROM Animal_Dispositions WHERE disposition_id = :disposition_id_associated_to_disposition, animal_id = :animal_id_of_selected_animal);


-- -----------------------------------------------------
-- Admins Entity
-- -----------------------------------------------------

-- CREATE: Add an admin
INSERT INTO Admins (first_name, last_name, shelter_name) VALUES (:first_name_input, :last_name_input, :shelter_name_input);

-- READ: 
-- Get all info in Admins table
SELECT * FROM Admins;

-- UPDATE: Update admin info
-- Admin users can update last name or shelter location (first name is fixed)
UPDATE Admins SET last_name = :last_name_input, shelter_name = :shelter_name_input WHERE admin_id = :admin_id_of_user

-- DELETE: Delete an admin
DELETE FROM Admins WHERE admin_id = :admin_id_associated_to_delete_button;

