// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Glob {
    _id: ID
    globText: String
    createdAt: String
    senderId: ID!
    senderUserName: String!
    senderUserEmail: String!
    receiverId: ID!
  }

  type Query {
    loggedInUser: User
    users: [User]
    user(email: String!): User
    globs(receiverId: ID!): [Glob]
    glob(_id: ID!): Glob
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGlob(receiverId: ID!, globText: String!): Glob
  }

  type Subscription {
    globeAdded: Glob
  }
`;

// export the typeDefs
module.exports = typeDefs;
