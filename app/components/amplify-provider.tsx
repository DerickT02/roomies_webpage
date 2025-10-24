"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { ThemeProvider } from "@aws-amplify/ui-react";

Amplify.configure(outputs, { ssr: true });

export default function AmplifyClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
