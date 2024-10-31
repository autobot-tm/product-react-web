'use client'

import React from 'react'

import { Button } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Providers from '@/components/Provider'
import ScrollToTop from '@/components/ScrollToTop'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <ArrowUpwardIcon />
        </Button>
      </ScrollToTop>
    </Providers>
  )
}
