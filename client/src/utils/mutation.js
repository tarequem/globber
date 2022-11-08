import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
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
