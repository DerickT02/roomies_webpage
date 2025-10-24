import { defineBackend } from '@aws-amplify/backend';

import { data } from './data/resource.js';
import { aws_dynamodb } from 'aws-cdk-lib';

export const backend = defineBackend({

  data,
});
//add backend resources here

