"use client";

import { Authenticator } from '@aws-amplify/ui-react';
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center">
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <h1>Hello {user?.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </div>
          )}
        </Authenticator>
      </main>
      <Footer />
    </div>
  );
}
