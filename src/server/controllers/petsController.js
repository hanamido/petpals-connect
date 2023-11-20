// Database stuff
const db = require('../database/db-connector');

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

function addTwoAnimalDispositionQuery(animalId) {
    let query = `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = ?), ${animalId}); \
    INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = ?), ${animalId});`
    return query;
}

function addThreeAnimalDispositionQuery(animalId, disposition1, disposition2, disposition3) {
    return `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = '${disposition1}'), ${animalId}); 
    INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = '${disposition2}'), ${animalId});
    INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = '${disposition3}'), ${animalId});`;
}

function checkIfBreedExists(breedName) {
    return `SELECT * FROM Breeds WHERE breed_name = '${breedName}'`;
}

function checkType(typeName) {
    if (typeName !== "Dog" || typeName !== "Cat") {
        return "Other";
    } else {
        return typeName;
    }
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
    return `UPDATE Animal_Breeds SET
    animal_id = ${animalId},
    breed_id = (SELECT breed_id FROM Breeds WHERE breed_name = ${breedName});`;
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

async function executeTwoDispositionsQuery(animalId, disposition1, disposition2, animal_breed, animal_type) {
    try {
        // Query 1
        let query1 = `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = "${disposition1}"), ${animalId})`;
        db.pool.query(query1, function(err, results, fields) {
            const query2 = `INSERT INTO Animal_Dispositions(disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description="${disposition2}"), ${animalId})`;
            db.pool.query(query2, function(err, results, fields) {
                // Checks if the breed is already in the db
                let addQuery3 = checkIfBreedExists(animal_breed);
                // placeholder query
                let addQuery4;
                db.pool.query(addQuery3, function(error, result, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                        // if the breed (dog or cat) is not in the db, add it as "Other"
                        const isEmptySet = result.length === 0; 
                        console.log(checkType(animal_type));
                        console.log(animal_breed);
                        console.log(animal_type);
                        if (isEmptySet) {
                            animal_breed = "Other";
                            animal_type = "Other";
                            addQuery4 = addOtherAnimalBreed(animalId, animal_breed, animal_type)
                            // then add to Animal_Breeds
                            db.pool.query(addQuery4, function(error, result, fields) {
                                if (error) {
                                console.log(error)
                                }
                            })
                        } else {
                            // otherwise go straight into adding to Animal_Breeds
                            addQuery4 = addAnimalBreedQuery(animalId, animal_breed, animal_type);
                            db.pool.query(addQuery4, function(error, result, fields) {
                                if (error) {
                                console.log(error);
                                } else {
                                    return result;
                                }
                            })
                        }
                    }
                })
            })
        });

    } catch (error) {
        console.error('Error executing queries:', error.message);
    }
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
    executeTwoDispositionsQuery: executeTwoDispositionsQuery
}