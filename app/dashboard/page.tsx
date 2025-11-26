"use client";

import Nav from "../components/nav";
import Footer from "../components/footer";
import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { useRouter } from "next/navigation";

function DashboardContent() {
    const router = useRouter();
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Nav />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
                    <div>
                        <p className="text-green-600 mb-2">You are logged in!</p>
                        <p className="mb-4">Hello, {user?.username}</p>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Authenticator>
            <DashboardContent />
        </Authenticator>
    );
}
