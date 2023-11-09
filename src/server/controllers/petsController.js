function addDispositionsToAnimals(jsonResult) {
    /*
    jsonResult: an array of Animals in the db
    */
    let currentAnimal;
    let i;
    let j;
    let dispositions = []; 
    for (i = 0; i < jsonResult.length; i++) {
        for (j = 0; j < jsonResult.length; j++) {
            if (jsonResult[i].id == jsonResult[j].id) {
                
            }
        }
    }
}

module.exports = {
    addDispositionsToAnimals: addDispositionsToAnimals
}