# AWS WORKSHOPS

## ALIEN ATTACK SHORT LABS

### [Build a Parameter Store API with API Gateway](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/api-gateway/systems-manager-integration/) _#level\_100_

To work with the integration of SSM service with API Gateway, using the provided parameters. We'll create a String Parameter with the desired configuration and define IAM roles with the necessary policies to access the SSM resource. We'll integrate our API with SSM by assigning the created role and configuring the requests to access and consume SSM values and properties.

We can consume our API writting this in our terminal

```terminal
curl https:<api_url>/prod/getconfig?lab=Short-Lab-01
```

### [Build a Parameter Store API with AppSync](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/appsync/systems-manager-integration/) _#level\_200_

To integrate the SSM service with AppSync using the specified parameters, we will start by creating a String Parameter with the required configuration and defining IAM roles with the appropriate policies to access the SSM resources. Next, we'll connect our GraphQl API to SSM by assigning the created role and setting up the resolvers to fetch and use SSM values and properties.

We can consume our API in AWS Console, AppSync service

### [Integrate Parameter Store with Lambda](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/lambda/write-to-ssm/) _#level\_100_

To integrate the SSM service with Lambda using the specified parameters, we will begin by creating a String Parameter with the necessary configuration and defining IAM roles with the appropriate policies to access the SSM resources. Next, we'll link our Lambda function to SSM by assigning the created role and retrieve and use SSM values and properties.

We can test the resources on AWS Console - Lambda

### [Ingest Data with Kinesis Data Streams](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/kinesis/ingestion-to-dynamodb) _#level\_300_

In this lab we are going to build an architecture that is going to allow us to ingest data from API Gateway to DynamoDB through Kinesis Data Streams and a Lambda to manage and redirect the events to DynamoDB.

We could test the whole system passing that object to our api,

```aws
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
```

### [Create Your First DynamoDB Table](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/dynamodb/my-first-table/) _#level\_100_

In this lab we will experiment with Amazon DynamoDB, creating a lambda to put item in it.

We could test the resources passing that object to our lambda, in the AWS console o by the debugger.

```event
{
  "Id": "PRD01",
  "Description": "UNICORN GENERATOR",
  "LatestStockUpdate": "2019-10-22T22:15:34Z",
  "Suppliers": [
    "S045",
    "S4456",
    "ACME126"
  ]
}
```

### [Build Your First Microservice (NodeJS)](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/architecture-samples/full-microservice/) _#level\_200_

In this lab we will create a full microservice, by using a database (Amazon DynamoDB), a computing service (AWS Lambda), and an API service to expose the service to users and other microservices. Once all the resources are deployed, it is necessary to run the [SL06-dynamoScript.ts file](AWS/alien-attack/short-labs/src/SL06-dynamoScript.ts) to add the data to the created dynamoDB table.

We could test the resources running the next command on our console to reach our api.

```terminal
curl --verbose --header "x-api-key: <put your API key here>" https://<API URL>?sessionId=TheTestSession
```
