import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header.js';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'B(AKI)Ş',
  description: 'Bodies and Technology, Bilgi PA with Valentin Okutan, Burcu Becermen, Yunus Emre Şahin and Bilge Yüceer',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
      <Header />
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  )
}
