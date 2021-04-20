import gql from "graphql-tag";

export const createUser = gql`
  mutation userCreate($email: String!, $password: String!, $fullName: String!) {
    createUser(email: $email, password: $password, fullName: $fullName) {
      token
    }
  }
`;

export const createMessage = gql`
  mutation messageCreate($content: String!, $group: String!) {
    createMessage(content: $content, group: $group) {
      _id
      content
      group
      sender {
        userId
        userName
      }
    }
  }
`;
