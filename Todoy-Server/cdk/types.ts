import { StackProps } from 'aws-cdk-lib'

export interface ITodoyStackProps extends StackProps {
  baseId: string
  tasksLambdaArn?: string
}
