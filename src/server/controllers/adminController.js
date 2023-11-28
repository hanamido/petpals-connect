function addAdminQuery(firstName, lastName, shelterName) {
    return `INSERT INTO Admins (first_name, last_name, shelter_name) VALUES ('${firstName}', '${lastName}', '${shelterName}')`;
}

module.exports = {
    addAdminQuery: addAdminQuery,
}