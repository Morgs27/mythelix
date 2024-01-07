import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from './_components/nav/Nav';
import AuthProvider from './_components/AuthProvider';
import { Suspense } from 'react';
import Loading from './loading';
import Background from './_components/backgrounds/Background';


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
      <head>
  
      </head>
      {/* @ts-ignore */}
      <AuthProvider>
          <body className={inter.className}>

              <Loading></Loading>

              <Background width={0} height = {0} brightness={0.06} style={{position: 'absolute', top: '0', left: '0'}}/>

              <Nav></Nav>

              <div className="pageContent customScroll">
                {children}
              </div>

              <Analytics />
              <SpeedInsights />

          </body>
      </AuthProvider>

    </html>
    
  )
}
