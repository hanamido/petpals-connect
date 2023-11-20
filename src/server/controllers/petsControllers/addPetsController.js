function addAnimalQuery(name, animal_type, picture, animal_availability, description) {
    return `INSERT INTO Animals (name, animal_type, picture, animal_availability, description)
    VALUES ("${name}", (SELECT type_id FROM Types WHERE type_name = "${animal_type}"), "${picture}", (SELECT availability_id FROM Availability_Options WHERE description = "${animal_availability}"), "${description}");`
}

function addAnimalDispositionQuery(animalId, dispositionName) {
    return `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = '${dispositionName}'), ${animalId});`
}

function addTwoAnimalDispositionQuery(animalId, disposition1, disposition2) {
    let query = `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = '${disposition1}'), ${animalId}); INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = '${disposition2}'), ${animalId});`
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
        return false;
    }
    return true;
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

async function executeTwoDispositionsQuery(animalId, disposition1, disposition2, animal_breed, animal_type) {
    try {
        // Query 1
        let query1 = `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = "${disposition1}"), ${animalId})`;
        db.pool.query(query1, function(err, results, fields) {
            // Query 2
            const query2 = `INSERT INTO Animal_Dispositions (disposition_id, animal_id) VALUES ((SELECT disposition_id FROM Dispositions WHERE description = "${disposition2}"), ${animalId})`;
            db.pool.query(query2, function(err, result, fields) {
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
                        // if it is not a dog or cat, add it as "Other" for type and breed
                        if (!checkType(animal_type)) {
                            animal_breed = "Other"; 
                            animal_type = "Other"; 
                        }
                        if (isEmptySet) {
                            addQuery4 = addOtherAnimalBreed(animalId, animal_breed, animal_type)
                            // then add to Animal_Breeds
                            db.pool.query(addQuery4, function(error, result, fields) {
                                if (error) {
                                    console.log(error);
                                }
                            })
                        } else {
                            // otherwise go straight into adding to Animal_Breeds
                            addQuery4 = addAnimalBreedQuery(animalId, animal_breed, animal_type);
                            db.pool.query(addQuery4, function(error, result, fields) {
                                if (error) {
                                console.log(error);
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