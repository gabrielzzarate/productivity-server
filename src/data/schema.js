import _ from 'lodash';
import {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql';

import Task from '../models/task';

const viewer = {};

export const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    complete: { type: new GraphQLNonNull(GraphQLBoolean)}
  })
});

export const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    tasks: {
      type: new GraphQLList(taskType),
      resolve: async () => await Task.find({})
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    viewer: {
      type: viewerType,
      //args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return _.find(viewer, { id: args.id });
        return viewer
      }
    }
  }
});

const schema = () => new GraphQLSchema({
  query: RootQuery
});

export default schema; 