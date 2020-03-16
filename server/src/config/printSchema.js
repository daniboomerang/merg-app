const { printSchema } = require('graphql');
const fs = require('fs');

const printSchemaFromBuild = (schema) => {
  fs.writeFile('./schema.graphql', printSchema(schema), (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    // eslint-disable-next-line no-console
    console.log('Schema generated');
  });
};

module.exports = printSchemaFromBuild;
