'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@mui/material'
import { useAppSelector } from '@/redux-store/hooks'
import { navPop } from '@/assets/png'
import '@/components/layout/style.scss'

const CartIcon = dynamic(() => import('@/assets/svg/Cart'), { ssr: false })
const NotificationIcon = dynamic(() => import('@/assets/svg/Notification'), { ssr: false })

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useAppSelector(state => state.cart)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header>
      {/* Desktop menu */}
      <div className='desktop-device text-white px-[60px] h-[90px] w-[100%] flex items-center justify-between border-b border-[#EDEDED]'>
        <div className='flex items-center gap-[60px] navbar-menu-wrapper'>
          <Link href='/product-management'>
            <h1 className='text-[32.8px] italic font-black text-[#0D3356]'>FashionHub</h1>
          </Link>

          <ul className='flex items-center gap-[50px] text-[#1D364D]'>
            <li>Category</li>
            <li>Brand</li>
            <li>Contact</li>
            <li>FAQ's</li>
          </ul>
        </div>
        <div className='nav-icon-wrapper flex items-center gap-[18px]'>
          <NotificationNavWrapper totalItems={items?.length || 0} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className='mobile-device text-white px-[60px] h-[90px] w-[100%] flex items-center justify-between border-b border-[#EDEDED]'>
        <Link href='/product-management'>
          <h1 className='nav-toggle text-[32.8px] italic font-black text-[#0D3356]'>FashionHub</h1>
        </Link>
        <figure
          className='nav-toggle cursor-pointer h-[50px] w-[50px] flex items-center justify-center'
          onClick={toggleMenu}
        >
          <Image src={navPop.src} alt='navPop' width={50} height={50} priority blurDataURL={navPop.src} />
          <ul className={`nav-menu-${isMenuOpen ? 'open' : 'hidden'}`}>
            <li>Category</li>
            <li>Brand</li>
            <li>Contact</li>
            <li>FAQ's</li>
            <li>
              <NotificationNavWrapper totalItems={items?.length || 0} />
            </li>
          </ul>
        </figure>
      </div>
    </header>
  )
}

export default Header

const NotificationNavWrapper = ({ totalItems }: { totalItems: number }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  if (typeof window === 'undefined') return null
  return <NotificationNav totalItems={totalItems} />
}

const NotificationNav: React.FC<{ totalItems: number }> = ({ totalItems }) => {
  return (
    <>
      <figure className='cursor-pointer h-[50px] w-[50px] bg-[#F5F1EE] rounded-full flex items-center justify-center'>
        <Link href='/cart'>
          <Badge badgeContent={totalItems} color='primary'>
            <CartIcon />
          </Badge>
        </Link>
      </figure>
      <figure className='cursor-pointer h-[50px] w-[50px] bg-[#EEEFF8] rounded-full flex items-center justify-center'>
        <NotificationIcon />
      </figure>
      <div className='flex items-center gap-[14px]'>
        <figure className='cursor-pointer h-[50px] w-[50px] bg-[#EEEFF8] rounded-full flex items-center justify-center'>
          <Image
            src='https://avatar.iran.liara.run/public/5'
            alt='avatar'
            width={50}
            height={50}
            priority
            blurDataURL='https://avatar.iran.liara.run/public/5'
            style={{ width: 'auto', height: 'auto' }}
          />
        </figure>
        <span className='header-user-info'>
          <p className='text-[12px] text-[#C0C3C6]'>Good Morning!</p>
          <h6 className='text-[16px] text-[#1D364D] font-bold'>KVY CEO</h6>
        </span>
      </div>
    </>
  )
}
