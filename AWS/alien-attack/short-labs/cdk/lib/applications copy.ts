import { Construct } from 'constructs'
import * as appconfig from 'aws-cdk-lib/aws-appconfig'
import { App, Stack, StackProps } from 'aws-cdk-lib'

enum AppConfigExtensionDeploymentStrategy {
  AllAtOnce = 'AppConfig.AllAtOnce',
  Linear50PercentEvery30Seconds = 'AppConfig.Linear50PercentEvery30Seconds',
  Canary10Percent20Minutes = 'AppConfig.Canary10Percent20Minutes'
}

interface IApplicationsProps {
  deploymentStrategy?: keyof typeof AppConfigExtensionDeploymentStrategy
  projectName: string
  configuration: Record<any, any>
}

const defaultDeploymentStrategy = 'AppConfig.Linear50PercentEvery30Seconds'

export class ApplicationStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

   class Applications extends appconfig.CfnDeployment {
      public readonly deploymentUri: string

      constructor(scope: Construct, id: string, props: IApplicationsProps) {
        const { configuration, projectName, deploymentStrategy } = props

        const application = new appconfig.CfnApplication(scope, `${projectName}-Application`, {
          name: projectName
        })

        const environment = new appconfig.CfnEnvironment(scope, `${projectName}-AppEnvironment`, {
          applicationId: application.ref,
          name: `${projectName}-AppEnvironment`
        })

        const configurationProfile = new appconfig.CfnConfigurationProfile(scope, `${projectName}-ConfigProfile`, {
          applicationId: application.ref,
          locationUri: 'hosted',
          name: `${projectName}-ConfigProfile`,
          type: 'AWS.Freeform'
        })

        const configurationVersion = new appconfig.CfnHostedConfigurationVersion(
          scope,
          `${projectName}-ConfigProfileVersion`,
          {
            applicationId: application.ref,
            configurationProfileId: configurationProfile.ref,
            contentType: 'application/json',
            content: JSON.stringify(configuration)
          }
        )

        super(scope, id, {
          applicationId: application.ref,
          configurationProfileId: configurationProfile.ref,
          configurationVersion: configurationVersion.ref,
          deploymentStrategyId: deploymentStrategy || defaultDeploymentStrategy,
          environmentId: environment.ref,
          tags: configuration.tags,
          description: configuration.description
        })

        new Applications(this, 'gooDo-Application', {
          configuration: {
            tags: [{ Name: 'gooDo-Application', Project: 'Applications' }],
            description: 'application for gooDo project resources management'
          },
          projectName: 'gooDo'
        })
        // this.deploymentUri = Fn.sub(
        //   // eslint-disable-next-line no-template-curly-in-string
        //   '/applications/${applicationId}/environments/${environmentId}/configurations/${configurationId}',
        //   {
        //     applicationId: application.ref,
        //     environmentId: environment.ref,
        //     configurationId: configurationProfile.ref
        //   }
        // )
      }
    }
  }
}
