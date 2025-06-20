import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carregando...",
  description: "Aguarde",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
