import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        bookCount
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation Mutation($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($username: String, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
        password
        bookCount
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation(
    $description: String!
    $title: String!
    $bookId: String!
    $image: String
    $link: String
    $authors: [String]
  ) {
    saveBook(
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
      authors: $authors
    ) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
