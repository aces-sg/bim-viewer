/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  phone?: string | null,
  manager?: string | null,
  email?: string | null,
  company?: string | null,
  onboarding?: boolean | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  manager?: ModelStringInput | null,
  email?: ModelStringInput | null,
  company?: ModelStringInput | null,
  onboarding?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  name?: string | null,
  phone?: string | null,
  manager?: string | null,
  email?: string | null,
  company?: string | null,
  project?:  Array<Project | null > | null,
  onboarding?: boolean | null,
  createdAt: string,
  updatedAt: string,
  ownerId?: string | null,
};

export type Project = {
  __typename: "Project",
  id: string,
  name?: string | null,
  description?: string | null,
  submissions?:  Array<Submission | null > | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Submission = {
  __typename: "Submission",
  id: string,
  modelId?: string | null,
  modelUrl?: string | null,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  commpany?: string | null,
  description?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  phone?: string | null,
  manager?: string | null,
  email?: string | null,
  company?: string | null,
  onboarding?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateProjectInput = {
  id?: string | null,
  name?: string | null,
  description?: string | null,
  submissions?: Array< SubmissionInput | null > | null,
};

export type SubmissionInput = {
  id: string,
  modelId?: string | null,
  modelUrl?: string | null,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  commpany?: string | null,
  description?: string | null,
};

export type ModelProjectConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  submissions?: Array< SubmissionInput | null > | null,
};

export type DeleteProjectInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  message?: string | null,
  user?: string | null,
  replyOf?: string | null,
  project?: string | null,
  createdAt?: string | null,
  mentions?: Array< string | null > | null,
};

export type ModelCommentConditionInput = {
  message?: ModelStringInput | null,
  user?: ModelIDInput | null,
  replyOf?: ModelIDInput | null,
  project?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  mentions?: ModelIDInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
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

export type Comment = {
  __typename: "Comment",
  id: string,
  message?: string | null,
  user?: string | null,
  replyOf?: string | null,
  project?: string | null,
  createdAt?: string | null,
  mentions?: Array< string | null > | null,
  updatedAt: string,
};

export type UpdateCommentInput = {
  id: string,
  message?: string | null,
  user?: string | null,
  replyOf?: string | null,
  project?: string | null,
  createdAt?: string | null,
  mentions?: Array< string | null > | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type SubmissionsResult = {
  __typename: "SubmissionsResult",
  items?:  Array<Submission | null > | null,
  nextToken?: string | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  user?: ModelIDInput | null,
  replyOf?: ModelIDInput | null,
  project?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  mentions?: ModelIDInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  manager?: ModelStringInput | null,
  email?: ModelStringInput | null,
  company?: ModelStringInput | null,
  onboarding?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTodoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
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
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionProjectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionProjectFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
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
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  message?: ModelSubscriptionStringInput | null,
  user?: ModelSubscriptionIDInput | null,
  replyOf?: ModelSubscriptionIDInput | null,
  project?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  mentions?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  manager?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  company?: ModelSubscriptionStringInput | null,
  onboarding?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type TriggerNotificationMutationVariables = {
  input?: string | null,
};

export type TriggerNotificationMutation = {
  triggerNotification?: string | null,
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

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    phone?: string | null,
    manager?: string | null,
    email?: string | null,
    company?: string | null,
    project?:  Array< {
      __typename: "Project",
      id: string,
      name?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    onboarding?: boolean | null,
    createdAt: string,
    updatedAt: string,
    ownerId?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    phone?: string | null,
    manager?: string | null,
    email?: string | null,
    company?: string | null,
    project?:  Array< {
      __typename: "Project",
      id: string,
      name?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    onboarding?: boolean | null,
    createdAt: string,
    updatedAt: string,
    ownerId?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    phone?: string | null,
    manager?: string | null,
    email?: string | null,
    company?: string | null,
    project?:  Array< {
      __typename: "Project",
      id: string,
      name?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    onboarding?: boolean | null,
    createdAt: string,
    updatedAt: string,
    ownerId?: string | null,
  } | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject?:  {
    __typename: "Project",
    id: string,
    name?: string | null,
    description?: string | null,
    submissions?:  Array< {
      __typename: "Submission",
      id: string,
      modelId?: string | null,
      modelUrl?: string | null,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject?:  {
    __typename: "Project",
    id: string,
    name?: string | null,
    description?: string | null,
    submissions?:  Array< {
      __typename: "Submission",
      id: string,
      modelId?: string | null,
      modelUrl?: string | null,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject?:  {
    __typename: "Project",
    id: string,
    name?: string | null,
    description?: string | null,
    submissions?:  Array< {
      __typename: "Submission",
      id: string,
      modelId?: string | null,
      modelUrl?: string | null,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    message?: string | null,
    user?: string | null,
    replyOf?: string | null,
    project?: string | null,
    createdAt?: string | null,
    mentions?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    message?: string | null,
    user?: string | null,
    replyOf?: string | null,
    project?: string | null,
    createdAt?: string | null,
    mentions?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    message?: string | null,
    user?: string | null,
    replyOf?: string | null,
    project?: string | null,
    createdAt?: string | null,
    mentions?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type ListSubmissionResultsQueryVariables = {
};

export type ListSubmissionResultsQuery = {
  listSubmissionResults?:  {
    __typename: "SubmissionsResult",
    items?:  Array< {
      __typename: "Submission",
      id: string,
      modelId?: string | null,
      modelUrl?: string | null,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
    nextToken?: string | null,
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

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    phone?: string | null,
    manager?: string | null,
    email?: string | null,
    company?: string | null,
    project?:  Array< {
      __typename: "Project",
      id: string,
      name?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    onboarding?: boolean | null,
    createdAt: string,
    updatedAt: string,
    ownerId?: string | null,
  } | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      phone?: string | null,
      manager?: string | null,
      email?: string | null,
      company?: string | null,
      onboarding?: boolean | null,
      createdAt: string,
      updatedAt: string,
      ownerId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject?:  {
    __typename: "Project",
    id: string,
    name?: string | null,
    description?: string | null,
    submissions?:  Array< {
      __typename: "Submission",
      id: string,
      modelId?: string | null,
      modelUrl?: string | null,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
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
    message?: string | null,
    user?: string | null,
    replyOf?: string | null,
    project?: string | null,
    createdAt?: string | null,
    mentions?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      message?: string | null,
      user?: string | null,
      replyOf?: string | null,
      project?: string | null,
      createdAt?: string | null,
      mentions?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  ownerId?: string | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  ownerId?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    phone?: string | null,
    manager?: string | null,
    email?: string | null,
    company?: string | null,
    project?:  Array< {
      __typename: "Project",
      id: string,
      name?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    onboarding?: boolean | null,
    createdAt: string,
    updatedAt: string,
    ownerId?: string | null,
  } | null,
};


export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    phone?: string | null,
    manager?: string | null,
    email?: string | null,
    company?: string | null,
    project?:  Array< {
      __typename: "Project",
      id: string,
      name?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    onboarding?: boolean | null,
    createdAt: string,
    updatedAt: string,
    ownerId?: string | null,
  } | null,
};

export type OnCreateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
  owner?: string | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    name?: string | null,
    description?: string | null,
    submissions?:  Array< {
      __typename: "Submission",
      id: string,
      modelId?: string | null,
      modelUrl?: string | null,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
  owner?: string | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    name?: string | null,
    description?: string | null,
    submissions?:  Array< {
      __typename: "Submission",
      id: string,
      modelId?: string | null,
      modelUrl?: string | null,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
  owner?: string | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    name?: string | null,
    description?: string | null,
    submissions?:  Array< {
      __typename: "Submission",
      id: string,
      modelId?: string | null,
      modelUrl?: string | null,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      commpany?: string | null,
      description?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    message?: string | null,
    user?: string | null,
    replyOf?: string | null,
    project?: string | null,
    createdAt?: string | null,
    mentions?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    message?: string | null,
    user?: string | null,
    replyOf?: string | null,
    project?: string | null,
    createdAt?: string | null,
    mentions?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    message?: string | null,
    user?: string | null,
    replyOf?: string | null,
    project?: string | null,
    createdAt?: string | null,
    mentions?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    phone?: string | null,
    manager?: string | null,
    email?: string | null,
    company?: string | null,
    project?:  Array< {
      __typename: "Project",
      id: string,
      name?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    onboarding?: boolean | null,
    createdAt: string,
    updatedAt: string,
    ownerId?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};
