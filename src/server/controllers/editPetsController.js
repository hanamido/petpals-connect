const dotenv = require('dotenv').config();
// Database stuff
const db = require('../database/db-connector');

function checkIfDispositionWithAnimal() {
    return `SELECT * FROM Animal_Dispositions WHERE disposition_id = (SELECT disposition_id FROM Dispositions WHERE description = ?) AND animal_id = ?;`;
}

function checkDisposition(animalId, disposition, dispositionName, dispositionsToAdd, dispositionsToDelete, callback) {
    /* Function to check if disposition needs to be added or deleted */ 
    let values = [dispositionName, animalId];
    let firstCheckQuery = checkIfDispositionWithAnimal(); 

    db.pool.query(firstCheckQuery, values, function(error, result, fields) {
        if (error) { console.log(error); }
        else {
            // if the disposition is not yet associated with the animal yet and it is checked
            if (result.length === 0 && disposition !== "false") {
                dispositionsToAdd.push(dispositionName);
            }
            // if the disposition is already associated with the animal but it is unchecked
            else if (result.length > 0 && disposition === "false") {
                dispositionsToDelete.push(dispositionName);
            }
            const res = {
                "toAdd": dispositionsToAdd,
                "toDelete": dispositionsToDelete
            };
            callback(null, res);
        }
    });
}

module.exports = {
    checkIfDispositionWithAnimal: checkIfDispositionWithAnimal,
    checkDisposition: checkDisposition
}