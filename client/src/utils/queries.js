// hold code and functionality that isn't necessarily React-based
import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Query {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_GLOBES_BY_USER = gql`
  query Query($receiverId: ID!) {
    globs(receiverId: $receiverId) {
      _id
      globText
      createdAt
      senderId
      receiverId
    }
  }
`;

export const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      _id
      username
      email
    }
  }
`;
