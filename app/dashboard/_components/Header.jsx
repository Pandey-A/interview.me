"use client";
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import brand from '../../../../public/logo.png'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path = usePathname();
    useEffect(() => {
        console.log(path)
    },[])

  return (
   <div className='flex py-2 px-2 items-center justify-between bg-secondary shadow-sm'>
    <Image src={brand} width={150} height={200} alt="logo" />
    
    <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer`
            +(path === '/dashboard' ? ' text-primary font-bold' : '')
        }>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer`
            +(path === '/dashboard/upgrade' ? ' text-primary font-bold' : '')
        }>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer`
            +(path === '/dashboard/questions' ? ' text-primary font-bold' : '')
        }>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer`
            +(path === '/dashboard/how-it-works' ? ' text-primary font-bold' : '')
        }>How it works?</li>

    </ul>
    <UserButton />
   </div>
   
  )
}

export default Header
