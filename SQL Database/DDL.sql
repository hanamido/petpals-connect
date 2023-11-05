-- CS467 - PetPals Connect
-- Breanna Tran, Alyssa Feutz, Hanami Do, Julian Macleod

-- Disable commits and foreign key checks
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Creates a Prospective_Owners table
DROP TABLE IF EXISTS Prospective_Owners;
CREATE TABLE Prospective_Owners (
	owner_id int NOT NULL AUTO_INCREMENT UNIQUE,
	first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
	phone_number varchar(15) NOT NULL,
	email varchar(100) NOT NULL,
    street varchar(200) NOT NULL,
    city varchar(100) NOT NULL,
    state varchar(50) NOT NULL,
    zip_code varchar(10) NOT NULL,
	PRIMARY KEY (owner_id)
);

-- Creates a Availability_Options table
DROP TABLE IF EXISTS Availability_Options;
CREATE TABLE Availability_Options (
	availability_id int NOT NULL AUTO_INCREMENT UNIQUE,
	description varchar(50) NOT NULL,
	PRIMARY KEY (availability_id)
);

-- Adds data to Availability_Options table
INSERT INTO Availability_Options (description)
VALUES ('Not Available'), ('Available'), ('Pending'), ('Adopted');

-- Creates a Types table
DROP TABLE IF EXISTS Types;
CREATE TABLE Types (
	type_id int NOT NULL AUTO_INCREMENT UNIQUE,
	type_name varchar(20) NOT NULL,
	PRIMARY KEY (type_id)
);

-- Adds data to Types table
INSERT INTO Types (type_name)
VALUES ('Dog'), ('Cat'), ('Other');

-- Creates an Animals table
DROP TABLE IF EXISTS Animals;
CREATE TABLE Animals (
	animal_id int NOT NULL AUTO_INCREMENT UNIQUE,
	name varchar(100) NOT NULL,
    animal_type int NOT NULL,
    picture varchar(200) NOT NULL,
    animal_availability int NOT NULL,
    description varchar(1000) NOT NULL,
	PRIMARY KEY (animal_id),
    FOREIGN KEY (animal_type) REFERENCES Types(type_id),
	FOREIGN KEY (animal_availability) REFERENCES Availability_Options(availability_id)
);

-- Creates Applications table
DROP TABLE IF EXISTS Applications;
CREATE TABLE Applications (
	application_id int NOT NULL AUTO_INCREMENT UNIQUE,
    owner_id int NOT NULL,
	animal_id int NOT NULL,
    PRIMARY KEY (application_id),
	FOREIGN KEY (owner_id) REFERENCES Prospective_Owners(owner_id),
	FOREIGN KEY (animal_id) REFERENCES Animals(animal_id)
ON DELETE CASCADE);

-- Creates a Breeds table
DROP TABLE IF EXISTS Breeds;
CREATE TABLE Breeds (
	breed_id int NOT NULL AUTO_INCREMENT UNIQUE,
	breed_name varchar(100) NOT NULL,
    type_id int NOT NULL,
	PRIMARY KEY (breed_id),
    FOREIGN KEY (type_id) REFERENCES Types(type_id)
);

-- Creates an Animal_Breeds table
DROP TABLE IF EXISTS Animal_Breeds;
CREATE TABLE Animal_Breeds (
	animal_breed_id int NOT NULL AUTO_INCREMENT UNIQUE,
	animal_id int NOT NULL,
	breed_id int NOT NULL,
	PRIMARY KEY (animal_breed_id),
    FOREIGN KEY (breed_id) REFERENCES Breeds(breed_id),
    FOREIGN KEY (animal_id) REFERENCES Animals(animal_id)
ON DELETE CASCADE);

-- Creates a Dispositions table
DROP TABLE IF EXISTS Dispositions;
CREATE TABLE Dispositions (
	disposition_id int NOT NULL AUTO_INCREMENT UNIQUE,
	description varchar(100) NOT NULL,
	PRIMARY KEY (disposition_id)
);

-- Adds data to Dispositions table
INSERT INTO Dispositions (description)
VALUES ('Good with other animals'), ('Good with children'), ('Animal must be leashed at all times');

-- Creates an Animal_Dispositions table
DROP TABLE IF EXISTS Animal_Dispositions;
CREATE TABLE Animal_Dispositions (
	animal_disposition_id int NOT NULL AUTO_INCREMENT UNIQUE,
    animal_id int NOT NULL,
	disposition_id int NOT NULL,
	PRIMARY KEY (animal_disposition_id),
    FOREIGN KEY (disposition_id) REFERENCES Dispositions(disposition_id),
    FOREIGN KEY (animal_id) REFERENCES Animals(animal_id)
ON DELETE CASCADE);

-- Creates an Admin table
DROP TABLE IF EXISTS Admins;
CREATE TABLE Admins (
	admin_id int NOT NULL AUTO_INCREMENT UNIQUE,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    shelter_name varchar(100) NOT NULL,
	PRIMARY KEY (admin_id)
);

-- Turn back on commits and foreign key checks
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
