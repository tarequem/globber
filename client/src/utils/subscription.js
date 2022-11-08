import { gql } from '@apollo/client';

export const GLOBE_SUBSCRIPTION = gql`
  subscription Subscription {
    globeAdded {
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
