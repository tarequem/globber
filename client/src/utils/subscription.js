import { gql } from '@apollo/client';

export const GLOBE_SUBSCRIPTION = gql`
  subscription Subscription {
    globeAdded {
      _id
      globText
      createdAt
      senderId
      receiverId
    }
  }
`;
