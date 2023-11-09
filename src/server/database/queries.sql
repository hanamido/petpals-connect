-- Show animals and their dispositions
SELECT Animals.animal_id, Animals.name, Animals.animal_type, Animals.picture, Animals.animal_availability, Animals.description, Dispositions.description 
	FROM ((Animals
           INNER JOIN Animal_Dispositions ON Animals.animal_id = Animal_Dispositions.animal_id)
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id)

-- Show animals and their breeds
SELECT Animals.animal_id, Animals.name, Breeds.breed_name, Animals.picture, Animals.animal_availability, Animals.description 
	FROM ((Animals
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animal_Breeds.animal_id)
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id);

-- Show animals, their breeds, and their dispositions
SELECT Animals.animal_id, Animals.name, Breeds.breed_name as animal_type, Animals.picture, Animals.animal_availability, Animals.description, Dispositions.description
	FROM ((Animals
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animal_Breeds.animal_id)
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id);

-- Show animals, their breeds, their availability, and their dispositions
SELECT Animals.animal_id, Animals.name, Breeds.breed_name as animal_type, Animals.picture, Availability_Options.description as animal_availability, Animals.description, Dispositions.description as dispositions
	FROM ((Animals
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animals.animal_id)
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id
         INNER JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id);

-- Show animals, their type, their breed, their availability, and their dispositions
SELECT Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, Dispositions.description as animalDisposition
	FROM ((Animals
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animals.animal_id)
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id
         INNER JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id)
         INNER JOIN Types ON Animals.animal_type = Types.type_id;

-- Show animals, their type, their breed, their availability, and their dispositions (as one)
SELECT Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, GROUP_CONCAT(Dispositions.description SEPARATOR ', ') as animalDisposition 
	FROM ((Animals
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animals.animal_id)
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id
         INNER JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id)
         INNER JOIN Types ON Animals.animal_type = Types.type_id
         group by animal_id;