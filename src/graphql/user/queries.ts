export const queries = `#graphql 
        getUser(id: ID!): String
        getUsers: [User]
        getUserToken(email: String!, password: String!): String
`;