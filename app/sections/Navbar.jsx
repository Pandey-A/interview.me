
import React from 'react'
import { ArrowRight, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Navbar() {
    return ( 
        <header className="sticky top-0 backdrop-blur-sm z-20">
        <div className ="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
          <p className="text-white/60 hiddden md:block">Overcome your fear and ace Interviews</p>
       <Link href='/dashboard'>
       <div className="inline-flex gap-1 items-center">
        <p>
          Get Started for free
        </p>
        <ArrowRight className="w-4 h-4 inline-flex justify-center items-center"/>
          </div>
          </Link>
          </div>
          <div className="py-5">
          <div className="container">
            <div className="flex items-center justify-between  font-extrabold ">
            Interview.Me
            <MenuIcon className="h-5 w-5 md:hidden"/>
            <nav className=" hidden md:flex gap-8 text-black/60 items-center">
              <a href="#">About</a>
              <a href="#">Customers</a>
              <a href="#">Help</a>
              <a href="#">Features</a>
              <Link href='/dashboard'>
              <Button>Signup</Button>
              </Link>

      
            </nav>
            </div>
          </div>
          </div>
          </header>
          );
}

export default Navbar
