import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from './_components/Nav';
import AuthProvider from './_components/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mythelix',
  description: 'Dive into a world of AI-crafted artistry and strategy.',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* @ts-ignore */}
      <AuthProvider>
      <body className={inter.className}>
        <Nav></Nav>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
      </AuthProvider>
    </html>
  )
}
