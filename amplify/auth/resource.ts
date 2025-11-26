import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    // username: true,
    // externalProviders: {
    //   google: {
    //     clientId: 'YOUR_GOOGLE_CLIENT_ID',
    //     clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    //   },
    //   facebook: {
    //     clientId: 'YOUR_FACEBOOK_CLIENT_ID',
    //     clientSecret: 'YOUR_FACEBOOK_CLIENT_SECRET',
    //   },
    //   signInWithApple: {
    //     clientId: 'YOUR_APPLE_CLIENT_ID',
    //     keyId: 'YOUR_APPLE_KEY_ID',
    //     privateKey: 'YOUR_APPLE_PRIVATE_KEY',
    //     teamId: 'YOUR_APPLE_TEAM_ID',
    //   },
    //   callbackUrls: ['http://localhost:3000/'],
    //   logoutUrls: ['http://localhost:3000/'],
    // },
  },
  multifactor: {
    mode: "OPTIONAL",
    sms: false,
    totp: true,
  },
  // passwordPolicy: {
  //   minLength: 8,
  //   requireNumbers: true,
  //   requireLowercase: true,
  //   requireUppercase: true,
  //   requireSymbols: true,
  // },
  accountRecovery: "EMAIL_ONLY",
  userAttributes: {
    email: {
      required: true,
    },
    givenName: {
      required: true,
    },
    familyName: {
      required: true,
    },
    birthdate: {
      required: true,
    },
    address: {
      required: true,
    },
    phoneNumber: {
      required: true,
    },
  },
  // autoVerify: {
  //   email: true,
  // },
  // allowAccountDeletions: false,
  /**
   * By default, Amplify will use the `name` of the Auth resource as the User Pool name.
   * If you need to override this, you can set `userPoolName`.
   */
  name: "roomies-user-pool",
  // identityPool: {
  //   allowUnauthenticatedIdentities: true,
  //   /**
  //    * The roles below are placeholder roles. You should replace them with actual IAM roles
  //    * created in your AWS account that have the necessary permissions for authenticated
  //    * and unauthenticated users. The account ID 123456789012 is a placeholder.
  //    */
  //   // authenticated: {
  //   //   // ARN of the authenticated role
  //   //   // Example: "arn:aws:iam::123456789012:role/Cognito_roomiesPoolAuth_Role"
  //   //   // Based on setup_cognito.sh, the role is 'Cognito_roomiesPoolAuth_Role'
  //   //   // You will need to replace '123456789012' with your actual AWS account ID.
  //   //   // And ensure this role exists with appropriate permissions.
  //   // },
  //   // unauthenticated: {
  //   //   // ARN of the unauthenticated role
  //   //   // Example: "arn:aws:iam::123456789012:role/Cognito_roomiesPoolUnauth_Role"
  //   //   // Based on setup_cognito.sh, the role is 'Cognito_roomiesPoolUnauth_Role'
  //   //   // You will need to replace '123456789012' with your actual AWS account ID.
  //   //   // And ensure this role exists with appropriate permissions.
  //   // },
  // },
});
