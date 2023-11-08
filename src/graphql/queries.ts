/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      description
      submissions {
        id
        modelId
        modelUrl
        name
        email
        phone
        commpany
        description
      }
      createdAt
      updatedAt
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        submissions {
          id
          modelId
          modelUrl
          name
          email
          phone
          commpany
          description
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
