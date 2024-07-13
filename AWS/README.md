# AWS WORKSHOPS AND LABS MONOREPO

## ALIEN ATTACK SHORT LABS

### [Build a Parameter Store API with API Gateway](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/api-gateway/systems-manager-integration/) *#level_100*

To work with the integration of SSM service with API Gateway, using the provided parameters. We'll create a String Parameter with the desired configuration and define IAM roles with the necessary policies to access the SSM resource. We'll integrate our API with SSM by assigning the created role and configuring the requests to access and consume SSM values and properties.

  We can consume our API writting this in our terminal

  **curl https:<api_url>/prod/getconfig?lab=Short-Lab-01**

### [Build a Parameter Store API with AppSync](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/appsync/systems-manager-integration/) *#level_200*

To integrate the SSM service with AppSync using the specified parameters, we will start by creating a String Parameter with the required configuration and defining IAM roles with the appropriate policies to access the SSM resources. Next, we'll connect our GraphQl API to SSM by assigning the created role and setting up the resolvers to fetch and use SSM values and properties.

We can consume our API in AWS Console, AppSync service

### [Integrate Parameter Store with Lambda](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/lambda/write-to-ssm/) *#level_100*

To integrate the SSM service with Lambda using the specified parameters, we will begin by creating a String Parameter with the necessary configuration and defining IAM roles with the appropriate policies to access the SSM resources. Next, we'll link our Lambda function to SSM by assigning the created role and retrieve and use SSM values and properties.

We can test the resources on AWS Console - Lambda

### [Ingest Data with Kinesis Data Streams](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/kinesis/ingestion-to-dynamodb) *#level_300*

In this lab we are going to build an architecture that is going to allow us to ingest data from API Gateway to DynamoDB through Kinesis Data Streams and a Lambda to manage and redirect the events to DynamoDB.

We could test the whole system passing that object to our api,

{
    "User" : "theuser@amazon.com",
    "Client" : "13522bac-89fb-4f14-ac37-92642eec2b06",
    "Timestamp" : "2021-02-01T18:42:35.903Z",
    "Order" : {
        "Symbol" : "USDJPY",
        "Volume" : 200000,
        "Price" : 104.987
    }
}
