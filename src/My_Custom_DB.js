const my_db = {
  name: require('./schemas/schema.json').databaseName,
  createdAt: require('./schemas/schema.json').createdAt,
  createdBy: require('./schemas/schema.json').createdBy,

  collections: require('./schemas/schema.json').collections,

  function_1: require('./functions/function_1'),
  function_2: require('./functions/function_2'),
  function_3: require('./functions/function_3'),
};

module.exports = my_db;
