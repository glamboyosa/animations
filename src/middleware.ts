import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const nextUrl = request.nextUrl

    if (nextUrl.pathname === '/12') {
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/12']
} 