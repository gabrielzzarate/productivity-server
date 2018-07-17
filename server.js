import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import graphqlHTTP from 'koa-graphql';
import graphqlSchema from './src/data/schema';
import fs from 'fs';
import keys from './config/keys';

const app = new Koa();
const PORT = process.env.PORT || 3000;
const schema = graphqlSchema();
const jsonSchema = graphql(schema, introspectionQuery);

app.use(graphqlHTTP((ctx) => ({
  url: '/graphql',
  schema: schema,
  graphiql: true
})));

fs.writeFile('src/data/schema.json', JSON.stringify(jsonSchema, null, 2), err => {
  if (err) throw err;

  console.log('schema.json created successfully.');
});


mongoose.connect(keys.mongoURI);

app.listen(PORT, () => {
  console.info(`===> Listening on port ${PORT}.`, PORT);
});