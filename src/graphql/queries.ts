/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listSubmissionResults = /* GraphQL */ `
  query ListSubmissionResults {
    listSubmissionResults {
      items {
        id
        modelId
        modelUrl
        name
        email
        phone
        commpany
        description
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      company
      project {
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
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        company
        project {
          id
          name
          description
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
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
      owner
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
        owner
      }
      nextToken
    }
  }
`;
