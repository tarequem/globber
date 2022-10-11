import { gql } from '@apollo/client';

export const QUERY_GLOBS = gql`
  query globs($username: String) {
    globs(username: $username) {
      _id
      globText
      createdAt
      username
    }
  }
`;