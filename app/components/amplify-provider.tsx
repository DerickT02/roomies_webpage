"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { ThemeProvider, Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs, { ssr: false });

console.log("Amplify Configured:", JSON.stringify(outputs, null, 2));

export default function AmplifyClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </ThemeProvider>
  );
}
