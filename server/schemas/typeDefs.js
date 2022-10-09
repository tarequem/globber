// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        globs: [Glob]
    }
    type Glob {
        _id: ID
        globText: String
        createdAt: String
        username: String
    }
    type Query {
        users: [User]
        user(username: String!): [User]
        user(username: String): [Glob]
        glob(_id: ID!): Glob
    }
    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
    }
`;


// export the typeDefs
module.exports = typeDefs;
