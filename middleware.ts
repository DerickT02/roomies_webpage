import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from '@/utils/amplify-server-utils';

export async function middleware(request: NextRequest) {
    // With ssr: false, middleware cannot check session cookies.
    // We are relying on client-side protection for the dashboard.
    // This middleware is kept for future server-side expansion if needed,
    // but currently passes through requests.
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match nothing for now to disable server-side protection
         * until ssr: true is resolved/needed.
         */
    ],
};
