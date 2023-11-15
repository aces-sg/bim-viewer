export const awsConfig = {
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_appsync_authenticationType:
    process.env.NEXT_PUBLIC_AWS_AUTHENTICATIONTYPE,
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_AWS_APIKEY,
};
