import gql from "graphql-tag";

export const newMessage = gql`
  subscription newMessage {
    newMessage {
      content
      group
      _id
      sender {
        userName
        userId
      }
    }
  }
`;
