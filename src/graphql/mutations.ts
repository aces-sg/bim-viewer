/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const triggerNotification = /* GraphQL */ `
  mutation TriggerNotification($input: String) {
    triggerNotification(input: $input)
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
