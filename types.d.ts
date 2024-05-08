import 'next'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode
  }
}
