import { GraphQLObjectType, GraphQLString} from 'graphql';
import UserType from './types/user_type';
import AuthService from '../services/auth';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    }
  }
});
