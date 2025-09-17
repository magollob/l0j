import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Ilha - AirPods Premium | Fones de Ouvido com Qualidade Superior",
  description:
    "🎧 Smart Ilha - AirPods Premium com qualidade superior! Compatibilidade universal Android e iPhone, áudio espacial dinâmico, design ergonômico e bateria duradoura. Frete grátis para todo Brasil!",
  keywords:
    "smart ilha, airpods premium, fones de ouvido, bluetooth, wireless, android, iphone, áudio espacial, cancelamento ruído, bateria duradoura",
  generator: "v0.dev",
  robots: "index, follow",
  authors: [{ name: "Smart Ilha" }],
  creator: "Smart Ilha",
  publisher: "Smart Ilha",
  openGraph: {
    title: "Smart Ilha - AirPods Premium",
    description:
      "🎧 AirPods Premium com qualidade superior! Compatibilidade universal, áudio espacial dinâmico e bateria duradoura. Frete grátis!",
    url: "https://smartilha.com.br",
    siteName: "Smart Ilha",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Ilha - AirPods Premium",
    description:
      "🎧 AirPods Premium com qualidade superior! Compatibilidade universal, áudio espacial dinâmico e bateria duradoura.",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ff7a00" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
