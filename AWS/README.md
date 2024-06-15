# AWS WORKSHOPS AND LABS MONOREPO

## ALIEN ATTACK SHORT LABS

* [Build a Parameter Store API with API Gateway](https://catalog.us-east-1.prod.workshops.aws/workshops/3ae476e4-e66d-4e78-b22f-6190c79ddee2/en-US/aws-services/api-gateway/systems-manager-integration/) *#level_100*

To work with the integration of SSM service with API Gateway, using the provided parameters. We'll create a String Parameter with the desired configuration and define IAM roles with the necessary policies to access the SSM resource. We'll integrate our API with SSM by assigning the created role and configuring the requests to access and consume SSM values and properties.

  We can consume our API writting this in our terminal

  **curl https:<api_url>/prod/getconfig?lab=Short-Lab-01**