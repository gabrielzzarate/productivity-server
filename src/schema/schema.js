import { GraphQLSchema } from 'graphql';

import RootQueryType from './types/root_query_type';
import mutation from './mutations';

export const Schema = new GraphQLSchema({
  query: RootQueryType,
  mutation
});