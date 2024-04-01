import { clsx, type ClassValue } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 300
    }${path}`
}

export function constructMetadata({
  title = 'Inkspace - a Sass platform for students and researchers',
  description = 'Inkspace is an open-source software to make PDF researches easier.',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false
}: {
    title?: string,
    description?: string,
    image?: string,
    icons?: string,
    noIndex?: boolean
  } = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@madebyaugus',
    },
    icons,
    metadataBase: new URL('https://inkspace.vercel.app'),//PASS IT HERE,
    themeColor: '#f5f5f574',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}