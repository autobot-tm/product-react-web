'use client'

import { useRef, type ReactNode } from 'react'

import { Provider } from 'react-redux'

import type { AppStore } from '@/redux-store'

import { store } from '@/redux-store'

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = store()
    console.log('run store')
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default ReduxProvider
