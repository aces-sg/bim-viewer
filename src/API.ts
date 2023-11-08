/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  name?: string | null,
  description?: string | null,
  submissions?: Array< SubmissionInput | null > | null,
};

export type SubmissionInput = {
  id?: string | null,
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

export type Project = {
  __typename: "Project",
  id: string,
  name?: string | null,
  description?: string | null,
  submissions?:  Array<Submission | null > | null,
  createdAt: string,
  updatedAt: string,
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

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  submissions?: Array< SubmissionInput | null > | null,
};

export type DeleteProjectInput = {
  id: string,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
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

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
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
    } | null >,
    nextToken?: string | null,
  } | null,
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
  } | null,
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
  } | null,
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
  } | null,
};
