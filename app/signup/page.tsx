"use client";

import { Authenticator } from '@aws-amplify/ui-react';
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center">
        <Authenticator initialState="signUp" />
      </main>
      <Footer />
    </div>
  );
}
