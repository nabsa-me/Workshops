# AWS WORKSHOPS AND LABS MONOREPO

## ALIEN ATTACK SHORT LABS

### [Build a Parameter Store API with API Gateway](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/api-gateway/systems-manager-integration/) *#level_100*

To work with the integration of SSM service with API Gateway, using the provided parameters. We'll create a String Parameter with the desired configuration and define IAM roles with the necessary policies to access the SSM resource. We'll integrate our API with SSM by assigning the created role and configuring the requests to access and consume SSM values and properties.

  We can consume our API writting this in our terminal

  **curl https:<api_url>/prod/getconfig?lab=Short-Lab-01**

### [Build a Parameter Store API with AppSync](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/appsync/systems-manager-integration/) *#level_200*

To integrate the SSM service with AppSync using the specified parameters, we will start by creating a String Parameter with the required configuration and defining IAM roles with the appropriate policies to access the SSM resources. Next, we'll connect our GraphQl API to SSM by assigning the created role and setting up the resolvers to fetch and use SSM values and properties.

We can consume our API in AWS Console, AppSync service
