// amplify/auth/resource.ts

import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome to Roomies! Please verify your email",
      verificationEmailBody: (createCode: () => string) =>
        `<p>Welcome! Your verification code is ${createCode()}.</p>`,
    },
  },
  userAttributes: {
    givenName: {
      mutable: false,
      required: true,
    },
    familyName: {
      mutable: false,
      required: true,
    },
  },
  multifactor: {
    mode: "OPTIONAL",
    totp: true,
  },
});
