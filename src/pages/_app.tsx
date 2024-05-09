import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextLayoutComponentType } from 'next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

type AppLayoutProps = AppProps & {
  Component: NextLayoutComponentType
}

const client = new QueryClient()

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout ?? ((page: JSX.Element) => page)
  return (
    <Suspense fallback="Loading">
      <QueryClientProvider client={client}>
        <div>
          <span
            style={{ color: 'green', fontSize: '30px', fontWeight: 'bold' }}
          >
            START
          </span>
          <br />
          <br />
          <br />
          {getLayout(<Component {...pageProps} user="ADMIN" app="NEXT" />)}
          <br />
          <br />
          <span style={{ color: 'red', fontSize: '30px', fontWeight: 'bold' }}>
            END
          </span>
        </div>
      </QueryClientProvider>
    </Suspense>
  )
}
