'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@mui/material'

import { useAppSelector } from '@/redux-store/hooks'

import CartIcon from '@/assets/svg/Cart'
import NotificationIcon from '@/assets/svg/Notification'
import { navPop } from '@/assets/png'
import '@/components/layout/style.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useAppSelector(state => state.cart)

  const totalItems = items?.length

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='text-white px-[60px] h-[90px] flex items-center justify-between border-b border-[#EDEDED]'>
      <div className='flex items-center gap-[60px] navbar-menu-wrapper'>
        <h1 className='text-[32.8px] italic font-black text-[#0D3356]'>FashionHub</h1>
        <ul className='flex items-center gap-[50px] text-[#1D364D]'>
          <li>Category</li>
          <li>Brand</li>
          <li>Contact</li>
          <li>FAQ's</li>
        </ul>
      </div>

      <div className='nav-icon-wrapper flex items-center gap-[18px]'>
        <NotificationNav totalItems={totalItems} />
      </div>

      {/* Mobile Menu */}
      <h1 className='nav-toggle text-[32.8px] italic font-black text-[#0D3356]'>FashionHub</h1>
      <figure
        className='nav-toggle cursor-pointer h-[50px] w-[50px] flex items-center justify-center'
        onClick={toggleMenu}
      >
        <img src={navPop.src} alt='navPop' />
        <ul className={`nav-menu-${isMenuOpen ? 'open' : 'hidden'}`}>
          <li>Category</li>
          <li>Brand</li>
          <li>Contact</li>
          <li>FAQ's</li>
          <li>
            <NotificationNav totalItems={totalItems} />
          </li>
        </ul>
      </figure>
    </header>
  )
}

export default Header

const NotificationNav: React.FC<{ totalItems: number }> = ({ totalItems }) => {
  return (
    <>
      <Link href='/cart'>
        <figure className='cursor-pointer h-[50px] w-[50px] bg-[#F5F1EE] rounded-full flex items-center justify-center'>
          <Badge badgeContent={totalItems} color='primary'>
            <CartIcon />
          </Badge>
        </figure>
      </Link>
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
        <span>
          <p className='text-[12px] text-[#C0C3C6]'>Good Morning!</p>
          <h6 className='text-[16px] text-[#1D364D] font-bold'>KVY CEO</h6>
        </span>
      </div>
    </>
  )
}
