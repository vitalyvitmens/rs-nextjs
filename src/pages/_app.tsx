import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextLayoutComponentType } from 'next'

type AppLayoutProps = AppProps & {
  Component: NextLayoutComponentType
}

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout ?? ((page: JSX.Element) => page)
  return (
    <div>
      <span style={{ color: 'green', fontSize: '30px', fontWeight: 'bold' }}>
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
  )
}
