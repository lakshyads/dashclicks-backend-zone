const my_db = {
  name: require('./schema.json').databaseName,
  createdAt: require('./schema.json').createdAt,
  createdBy: require('./schema.json').createdBy,

  collections: require('./schema.json').collections,

  function_1: require('./function_1'),
  function_2: require('./function_2'),
  function_3: require('./function_3'),
};

module.exports = my_db;
