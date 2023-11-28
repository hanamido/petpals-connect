function addUserQuery(firstName, lastName, phoneNumber, email, city, state, zipCode) {
    return `INSERT INTO Prospective_Owners (first_name, last_name, phone_number, email, city, state, zip_code) VALUES (
        '${firstName}', '${lastName}', '${phoneNumber}', '${email}', '${city}', '${state}', '${zipCode}'
    )`
}

module.exports = {
    addUserQuery: addUserQuery,
}