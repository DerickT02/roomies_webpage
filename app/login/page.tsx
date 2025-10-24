"use client";

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function LoginPage() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const router = useRouter();

  useEffect(() => {
    if (authStatus === 'authenticated') {
      router.push('/');
    }
  }, [authStatus, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center">
        <Authenticator />
      </main>
      <Footer />
    </div>
  );
}
