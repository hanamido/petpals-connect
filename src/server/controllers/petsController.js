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

function addAnimalQuery(name, animal_type, picture, animal_availability, description) {
    return `INSERT INTO Animals (name, animal_type, picture, animal_availability, description)
    VALUES ("${name}", (SELECT type_id FROM Types WHERE type_name = "${animal_type}"), "${picture}", (SELECT availability_id FROM Availability_Options WHERE description = "${animal_availability}"), "${description}");`
}

function addAnimalDispositionQuery(animalId, dispositionName) {
    return `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = '${dispositionName}'), ${animalId});`
}

function checkIfBreedExists(breedName) {
    return `SELECT * FROM Breeds WHERE breed_name = '${breedName}'`;
}

function insertBreed(breedName, animalType) {
    return `INSERT INTO Breeds (breed_name, type_id) VALUES ('${breedName}', (SELECT type_id FROM Types WHERE type_name = '${animalType}'));`
}

function addAnimalBreedQuery(animalId, breedName) {
    return `INSERT INTO Animal_Breeds (breed_id, animal_id) VALUES ((SELECT breed_id from Breeds WHERE breed_name = '${breedName}'), ${animalId});`
}

function addOtherAnimalBreed(animalId, breedName) {
    return `INSERT INTO Animal_Breeds (breed_id, animal_id) VALUES ((SELECT breed_id FROM Breeds
        WHERE breed_name = "Other" AND type_id = (SELECT type_id FROM Types WHERE type_name = '${breedName}'), ${animalId})`
}

function deleteAnimalQuery(animalId) {
    let deletePetQuery = `DELETE FROM Animals WHERE animal_id = ${animalId}`;
    return deletePetQuery;
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
    showOneAnimalQuery: showOneAnimalQuery,
    addAnimalQuery: addAnimalQuery,
    addAnimalDispositionQuery: addAnimalDispositionQuery,
    addAnimalBreedQuery: addAnimalBreedQuery,
    checkIfBreedExists: checkIfBreedExists,
    insertBreed: insertBreed,
    addOtherAnimalBreed: addOtherAnimalBreed,
    deleteAnimalQuery: deleteAnimalQuery,
}