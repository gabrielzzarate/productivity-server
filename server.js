import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import session from 'koa-session-store';
import mongoStore from 'koa-session-mongo';
import passport from 'passport';
import passportConfig from './src/services/auth';
import graphqlHTTP from 'koa-graphql';
import schema from './src/schema/schema';
import fs from 'fs';
import keys from './config/keys';
//import { initSeed } from './src/data/seeders/task.seeder';

const app = new Koa();
//const PORT = process.env.PORT || 3000;
//const jsonSchema = graphql(schema, introspectionQuery);

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB'))
  .on('error', error => console.log('Error connecting to MongoDB', error));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabadfabc',
  store: mongoStore.create({
    db: 'mongo',
    url: keys.mongoURI,
    autoReconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(graphqlHTTP((ctx) => ({
  url: '/graphql',
  schema,
  graphiql: true
})));




