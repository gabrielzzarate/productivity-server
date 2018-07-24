import {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql';

import User from '../models/user';
import Task from '../models/task';

const viewer = {};

export const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    complete: { type: new GraphQLNonNull(GraphQLBoolean)},
  })
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }
});

export const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async () => await Task.find({})
    }
  })
});

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: { 
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parentValue, args) => {
        await User.create({ firstName: args.firstName, age: args.age });
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: async (parentValue, args) => {
        await User.deleteOne({ id: args.id });
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async (parentValue, args) => {
        await User.updateOne({ id: args.id }, { args });
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    viewer: {
      type: ViewerType,
      //args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return viewer;
      }
    },
    // }, 
    // task: {
    //   type: TaskType,
    //   args: { id: { type: GraphQLString } },
    //   resolve: async (parentValue, args) => {
    //     await Task.findById({ _id: args.id });
    //   }
    // }
  }
});

const schema = () => new GraphQLSchema({
  query: RootQuery,
  mutation
});

export default schema; 