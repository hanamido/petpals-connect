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

function addAnimalDispositionQuery(animalId) {
    return `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = ?), ${animalId});`
}

function addTwoAnimalDispositionQuery(animalId) {
    let query = `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = ?), ${animalId}); \
    INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = ?), ${animalId});`
    return query;
}

function addThreeAnimalDispositionQuery(animalId) {
    return `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = ?), ${animalId}); 
    INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = ?), ${animalId});
    INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = ?), ${animalId});`;
}

function checkIfBreedExists(breedName) {
    return `SELECT * FROM Breeds WHERE breed_name = '${breedName}'`;
}

function checkType(typeName) {
    console.log(typeName);
    if (typeName !== "Dog" && typeName !== "Cat") {
        return "Other";
    } 
    return typeName;
}

function insertBreed(breedName, animalType) {
    return `INSERT INTO Breeds (breed_name, type_id) VALUES ('${breedName}', (SELECT type_id FROM Types WHERE type_name = '${animalType}'));`
}

function addAnimalBreedQuery(animalId, breedName, typeName) { 
    return `INSERT INTO Animal_Breeds (breed_id, animal_id) VALUES ((SELECT breed_id from Breeds WHERE breed_name = '${breedName}' AND type_id = (SELECT type_id FROM Types WHERE type_name = '${typeName}')), ${animalId});`
}

function addOtherAnimalBreed(animalId, animalType) {
    return `INSERT INTO Animal_Breeds (breed_id, animal_id) VALUES ((SELECT breed_id FROM Breeds WHERE breed_name = "Other" AND type_id = (SELECT type_id FROM Types WHERE type_name = '${animalType}')), ${animalId})`;
}

function deleteAnimalQuery(animalId) {
    let deletePetQuery = `DELETE FROM Animals WHERE animal_id = ${animalId}`;
    return deletePetQuery;
}

function editAnimalQuery(animalId, animalName, animalType, animalPicture, animalAvailability, animalDescription) {
    return `UPDATE Animals SET \
	    name = "${animalName}", \
        animal_type = (SELECT type_id FROM Types WHERE type_name = '${animalType}'), \
        picture= "${animalPicture}", \
        animal_availability=(SELECT availability_id FROM Availability_Options WHERE description = "${animalAvailability}"), \
        description= "${animalDescription}" \
    WHERE animal_id = ${animalId};`
}

function editAnimalDisposition(animalId, dispositionName) {
    return `UPDATE Animal_Dispositions SET 
        `
}

function editAnimalBreed(animalId, breedName) {
    return `UPDATE Animal_Breeds SET \
    breed_id = (SELECT breed_id FROM Breeds WHERE \ breed_name = "${breedName}") \
    WHERE animal_id = ${animalId};`;
}

function editOtherAnimalBreed(animalId, breedName, typeName) {
    return `UPDATE Animal_Breeds SET \
    breed_id = (SELECT breed_id FROM Breeds WHERE breed_name = "${breedName}" AND type_id = (SELECT\
        type_id FROM Types WHERE type_name = "${typeName}")) \
        WHERE animal_id = ${animalId}`;
}

function searchByType(typeName) {
    return `SELECT Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, GROUP_CONCAT(Dispositions.description SEPARATOR ", ") as animalDisposition
	FROM Animals
	JOIN Types ON Animals.animal_type = Types.type_id
	LEFT JOIN Animal_Breeds ON Animals.animal_id = Animal_Breeds.animal_id
	LEFT JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id
	LEFT JOIN Animal_Dispositions ON Animals.animal_id = Animal_Dispositions.animal_id
	LEFT JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id
	JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id
	WHERE Types.type_name = '${typeName}'
    GROUP BY animal_id;`;
}

function searchByBreed(breedName) {
    return `SELECT \
    Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, GROUP_CONCAT(Dispositions.description SEPARATOR ", ") as animalDisposition \
        FROM Animals \
        JOIN Animal_Breeds ON Animals.animal_id =  Animal_Breeds.animal_id \
        JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id \
        JOIN Types ON Animals.animal_type = Types.type_id \
        JOIN Animal_Dispositions ON Animals.animal_id = Animal_Dispositions.animal_id \
        JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id \
        JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id \
        WHERE Breeds.breed_name = '${breedName}'
        GROUP BY animal_id;`;
}

function searchByDisposition(dispositionDesc) {
    return `SELECT Animals.animal_id, Animals.name as animalName, Types.type_name as animalType, Breeds.breed_name as animalBreed, Animals.picture as imgSrc, Availability_Options.description as animalAvailability, Animals.description as animalDescription, GROUP_CONCAT(Dispositions.description SEPARATOR ", ") as animalDisposition \
	FROM Animals \
	JOIN Types ON Animals.animal_type = Types.type_id \
	LEFT JOIN Animal_Breeds ON Animals.animal_id = Animal_Breeds.animal_id \
	LEFT JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id \
	LEFT JOIN Animal_Dispositions ON Animals.animal_id = Animal_Dispositions.animal_id \
	LEFT JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id \
	JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id \
	WHERE Dispositions.description = '${dispositionDesc}' \
    GROUP BY animal_id;`;
}

function checkIfDispositionWithAnimal() {
    return `SELECT * FROM Animal_Dispositions WHERE disposition_id = (SELECT disposition_id FROM Dispositions WHERE description = ?) AND animal_id = ?;`;
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
    addTwoAnimalDispositionQuery: addTwoAnimalDispositionQuery,
    addThreeAnimalDispositionQuery: addThreeAnimalDispositionQuery,
    addAnimalBreedQuery: addAnimalBreedQuery,
    checkIfBreedExists: checkIfBreedExists,
    insertBreed: insertBreed,
    addOtherAnimalBreed: addOtherAnimalBreed,
    deleteAnimalQuery: deleteAnimalQuery,
    checkType: checkType,
    editAnimalQuery: editAnimalQuery,
    editAnimalBreed: editAnimalBreed,
    editAnimalDisposition: editAnimalDisposition,
    searchByType: searchByType,
    searchByBreed: searchByBreed,
    searchByDisposition: searchByDisposition,
    checkIfDispositionWithAnimal: checkIfDispositionWithAnimal,
    editOtherAnimalBreed: editOtherAnimalBreed,
}