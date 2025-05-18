import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const nextUrl = request.nextUrl


    if (nextUrl.pathname.match(/\.(webp|png|jpg|jpeg|gif)$/)) {
        const response = NextResponse.next()


        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
        response.headers.set('Accept-Ranges', 'bytes')


        const currentImage = nextUrl.pathname.split('/').pop()
        const images = ['airpods.webp', 'mac.webp', 'watch.webp', 'iphone.webp']
        const currentIndex = images.indexOf(currentImage || '')

        if (currentIndex !== -1) {
            const nextImage = images[(currentIndex + 1) % images.length]
            response.headers.set('Link', `</${nextImage}>; rel=preload; as=image`)
        }

        return response
    }


    if (nextUrl.pathname === '/12') {
        const response = NextResponse.next()


        const preloadLinks = [
            'airpods.webp',
            'mac.webp',
            'watch.webp',
            'iphone.webp'
        ].map(image => `</${image}>; rel=preload; as=image`).join(', ')

        response.headers.set('Link', preloadLinks)
        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/12',
        '/airpods.webp',
        '/mac.webp',
        '/watch.webp',
        '/iphone.webp'
    ]
} 