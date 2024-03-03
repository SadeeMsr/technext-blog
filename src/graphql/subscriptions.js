/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $userName: String
  ) {
    onCreatePost(filter: $filter, userName: $userName) {
      id
      title
      content
      userName
      coverImage
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $userName: String
  ) {
    onUpdatePost(filter: $filter, userName: $userName) {
      id
      title
      content
      userName
      coverImage
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $userName: String
  ) {
    onDeletePost(filter: $filter, userName: $userName) {
      id
      title
      content
      userName
      coverImage
      createdAt
      updatedAt
      __typename
    }
  }
`;
