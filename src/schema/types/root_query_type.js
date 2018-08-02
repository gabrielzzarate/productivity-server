import { GraphQLObjectType, GraphQLID } from 'graphql';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    dummyField: { type: GraphQLID }
  }
});