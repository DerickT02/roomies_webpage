"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { ThemeProvider, Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs, { ssr: true });

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
