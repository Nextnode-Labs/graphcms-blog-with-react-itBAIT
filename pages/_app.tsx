import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
