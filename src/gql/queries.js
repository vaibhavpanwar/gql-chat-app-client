import gql from "graphql-tag";

export const getMessages = gql`
  query messageFetch($group: String!) {
    getMessages(group: $group) {
      content
      group
      _id
      createdAt
      sender {
        userName
        userId
      }
    }
  }
`;
export const getOneGroup = gql`
  query getOnegroup($id: String!) {
    getOneGroup(id: $id) {
      name
      image
      _id
    }
  }
`;

export const getUser = gql`
  query userGet($token: String!) {
    getUser(token: $token) {
      _id
      fullName
      email
    }
  }
`;

export const login = gql`
  query authUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const getGroups = gql`
  query {
    getGroups {
      name
      image
      _id
    }
  }
`;
