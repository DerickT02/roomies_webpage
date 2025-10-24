"use client";

import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";

export default function AuthNav() {
  const { user, signOut, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
  ]);
  const [userAttributes, setUserAttributes] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const fetchAttributes = async () => {
        try {
          const attributes = await fetchUserAttributes();
          setUserAttributes(attributes);
        } catch (error) {
          console.error("Error fetching user attributes:", error);
        }
      };
      fetchAttributes();
    }
  }, [user]);

  if (authStatus === "authenticated" && userAttributes?.given_name) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">
          Hi, {userAttributes.given_name}
        </span>
        <button
          onClick={signOut}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:underline transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  if (authStatus === "authenticated") {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline"> </span>
        <button
          onClick={signOut}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:underline transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="hidden sm:inline-flex px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-6 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
      >
        Get Started
      </Link>
    </div>
  );
}
