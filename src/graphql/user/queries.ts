export const queries = `#graphql 
        getUser(id: ID!): User
        getUsers: [User]
        getUserToken(email: String!, password: String!): String
`;