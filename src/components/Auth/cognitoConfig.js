import awsmobile from "../../aws-exports";

export const cognitoConfig = {
  UserPoolId: awsmobile.aws_user_pools_id,
  ClientId: awsmobile.aws_user_pools_web_client_id
};