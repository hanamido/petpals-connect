const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    define: {
        timestamps: false,
    }
});

// Tests the connection
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.'); 
// } catch (error) {
//     console.error('Unable to connect to the database: ', error);
// }

// Animal Models
const Animal = sequelize.define("Animals", {
    animal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: DataTypes.TEXT, 
    picture: DataTypes.TEXT,
    description: DataTypes.TEXT,
    animal_type: {
        type: DataTypes.INTEGER
    },
    animal_availability: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Animals'
});

const Type = sequelize.define("Types", {
    type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    type_name: DataTypes.TEXT
});

const AvailabilityOption = sequelize.define("Availability_Options", {
    availability_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    description: DataTypes.TEXT
});

Animal.hasOne(Type);
Animal.hasOne(AvailabilityOption);

const TestTable = sequelize.define("Test_Table", {
    test_name: DataTypes.TEXT
}, {
    tableName: 'Test_Table'
})

// (async () => {
//     await sequelize.sync({ force: true });
// })();

module.exports = {
    sequelize: sequelize,
    Animal: Animal,
    Type: Type,
    AvailabilityOption: AvailabilityOption,
    TestTable: TestTable
}

  /* GETS THE DATA FROM PETFINDERS API */
  // Get the access token from the API
  // try {
  //   const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
  //     grant_type: 'client_credentials',
  //     client_id: clientId,
  //     client_secret: clientSecret
  //   });

  //   const accessToken = response.data.access_token;

  //   // Get the pets data from the API
  //   try {
  //     const response = await axios.get('https://api.petfinder.com/v2/animals?type=cat', {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }});
  //     const apiData = response.data;
  //     res.json(apiData);
  //   } catch (err) {
  //     console.log("Error retrieving pets from API: ", err)
  //   }

  // } catch (err) {
  //   console.log("Error retrieving pets from API: ", err)
  // }