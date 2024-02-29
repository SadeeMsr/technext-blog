/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      userName
      coverImage
      createdAt
      updatedAt
      username
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        userName
        coverImage
        createdAt
        updatedAt
        username
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const postsByUsername = /* GraphQL */ `
  query PostsByUsername(
    $userName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUsername(
      userName: $userName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        userName
        coverImage
        createdAt
        updatedAt
        username
        __typename
      }
      nextToken
      __typename
    }
  }
`;
