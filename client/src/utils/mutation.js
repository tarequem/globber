import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        url
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation(
    $username: String!
    $email: String!
    $password: String!
    $url: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      url: $url
    ) {
      token
      user {
        _id
        username
        email
        url
      }
    }
  }
`;

export const SEND_GLOBE = gql`
  mutation Mutation($receiverId: ID!, $globText: String!) {
    addGlob(receiverId: $receiverId, globText: $globText) {
      _id
      globText
      createdAt
      senderUserName
      senderUserEmail
      senderId
      receiverId
    }
  }
`;
