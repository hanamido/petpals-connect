function showOneAnimalQuery(animalId) {
    return `SELECT Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, GROUP_CONCAT(Dispositions.description SEPARATOR ', ') as animalDisposition \
	FROM ((Animals \
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animals.animal_id) \
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id \
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id \
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id \
         INNER JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id) \
         INNER JOIN Types ON Animals.animal_type = Types.type_id \
         WHERE Animals.animal_id = ${animalId};`
}

let animalsQueries = {
    showAllAnimalsQuery: 'SELECT Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, GROUP_CONCAT(Dispositions.description SEPARATOR ", ") as animalDisposition \
	FROM ((Animals \
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animals.animal_id) \
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id \
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id \
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id \
         INNER JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id) \
         INNER JOIN Types ON Animals.animal_type = Types.type_id \
         group by animal_id;', 
}

module.exports = {
    animalsQueries: animalsQueries,
    showOneAnimalQuery: showOneAnimalQuery
}