import { ApolloServer } from '@apollo/server';


import { User } from './user';
async function createApoloGraphqlServer() {
        // Create GraphQL Server
        const gqlServer = new ApolloServer({
            typeDefs: `
                ${User.typeDefs}
                type Query {
                  ${User.queries}
                }

                type Mutation {
                  ${User.mutations}
                }
                  `,
            resolvers: {
              Query: {
                ...User.resolvers.queries
              },
              Mutation: {
               ...User.resolvers.mutations
              },
            },
          });
      
          await gqlServer.start();

          return gqlServer;
}

export default createApoloGraphqlServer;