/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const triggerNotification = /* GraphQL */ `
  mutation TriggerNotification($input: String) {
    triggerNotification(input: $input)
  }
`;
export const createSubmission = /* GraphQL */ `
  mutation CreateSubmission($input: CreateSubmissionInput) {
    createSubmission(input: $input) {
      id
      name
      email
      phone
      commpany
      description
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
