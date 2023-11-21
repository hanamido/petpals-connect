  // // TODO: Check if the disposition is already associated with the animal_id
  // values = [disposition1, id];
  // let firstCheckQuery = checkIfDispositionWithAnimal();
  // db.pool.query(firstCheckQuery, values, function(error, result, fields) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     // if the disposition is not associated with the animal yet and it is checked
  //     if (result.length === 0 && disposition1 !== "false") {
  //       dispositionsToAdd.push(disposition1);
  //     } 
  //     // if the disposition is associated with the animal but it is unchecked
  //     else if (result.length > 0 && disposition1 === "false") {
  //       dispositionsToDelete.push(disposition1);
  //     }
  //     values = [disposition2, id];
  //     let secondCheckQuery = checkIfDispositionWithAnimal();
  //     db.pool.query(secondCheckQuery, values, function(error, result, fields) {
  //       if (error) { console.log(error) }
  //       else {
  //         if (result.length === 0 && disposition2 !== "false") {
  //           dispositionsToAdd.push(disposition2)
  //         }
  //         // if the disposition is associated with the animal but it is unchecked
  //         else if (result.length > 0 && disposition2 === "false") {
  //           dispositionsToDelete.push(disposition2);
  //         }
  //         values = [disposition3, id];
  //         let thirdCheckQuery = checkIfDispositionWithAnimal();
  //         db.pool.query(thirdCheckQuery, values, function(error, result, fields) {
  //           if (error) { console.log(error); }
  //           else {
  //             if (result.length === 0 && disposition3 !== "false") {
  //               dispositionsToAdd.push(disposition3);
  //             } 
  //             // if the disposition is associated with the animal but it is unchecked
  //             else if (result.length > 0 && disposition3 === "false") {
  //               dispositionsToDelete.push(disposition3);
  //             }
  //           }
  //         })
  //       }
  //     })
  //   } 
  // })