import awsmobile from "./aws-exports";

export const awsConfig = {
  ...awsmobile,
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_appsync_authenticationType:
    process.env.NEXT_PUBLIC_AWS_AUTHENTICATIONTYPE,
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_AWS_APIKEY,
  Auth: {
    identityPoolId: awsmobile.aws_cognito_identity_pool_id,
    userPoolId: awsmobile.aws_user_pools_id,
    userPoolWebClientId: awsmobile.aws_user_pools_web_client_id,
    cookieStorage: {
      domain: "localhost",
      secure: false,
      path: "/",
      expires: 365,
    },
  },
};
