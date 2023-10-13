/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSubmissionInput = {
  id?: string | null,
  modelId: string,
  modelUrl: string,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  commpany?: string | null,
  description?: string | null,
};

export type Submission = {
  __typename: "Submission",
  id: string,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  commpany?: string | null,
  description?: string | null,
};

export type CreateTodoInput = {
  id?: string | null,
};

export type ModelTodoConditionInput = {
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
};

export type DeleteTodoInput = {
  id: string,
};

export type SubmissionsResult = {
  __typename: "SubmissionsResult",
  items?:  Array<Submission | null > | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type TriggerNotificationMutationVariables = {
  input?: string | null,
};

export type TriggerNotificationMutation = {
  triggerNotification?: string | null,
};

export type CreateSubmissionMutationVariables = {
  input?: CreateSubmissionInput | null,
};

export type CreateSubmissionMutation = {
  createSubmission?:  {
    __typename: "Submission",
    id: string,
    name?: string | null,
    email?: string | null,
    phone?: string | null,
    commpany?: string | null,
    description?: string | null,
  } | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSubmissionsQuery = {
  listSubmissions?:  {
    __typename: "SubmissionsResult",
    items?:  Array< {
      __typename: "Submission",
      id: string,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
