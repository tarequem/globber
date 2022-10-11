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
    type Auth {
        token: ID!
        user: User
    }
    type Glob {
        _id: ID
        globText: String
        createdAt: String
        username: String
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        globs(username: String): [Glob]
        glob(_id: ID!): Glob
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addGlob(globText: String!): Glob
    }
`;


// export the typeDefs
module.exports = typeDefs;
