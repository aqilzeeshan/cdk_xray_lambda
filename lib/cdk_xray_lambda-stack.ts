import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { Code, InlineCode, Function, Runtime, Tracing } from '@aws-cdk/aws-lambda';
import {Effect,PolicyStatement} from '@aws-cdk/aws-iam';

export class CdkXrayLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Positive test
    new Function(this, "MyEventProcessor", {
      code: new InlineCode("def main(event, context):\n\tprint(event)\n\treturn {'statusCode': 200, 'body': 'Hello, World'}"),
      handler: "index.main",
      runtime: Runtime.PYTHON_3_7,
      tracing: Tracing.ACTIVE
    })

    //Negative test
    const myLambda = new Function(this, 'negative test lambda', {
      code: Code.fromAsset('./lambda'),
      description: 'Negative test for X-Ray',
      functionName: 'negative-test-lambda',
      handler: 'lambda_function.lambda_handler',
      runtime: Runtime.PYTHON_3_7,
      tracing: Tracing.ACTIVE
    });

    //After doing negative test give lambda function access to read S3
    myLambda.addToRolePolicy(new PolicyStatement({
      actions: ["s3:ListAllMyBuckets"],
      effect: Effect.ALLOW,
      resources: ['arn:aws:s3:::*']
    }));
  }
}
