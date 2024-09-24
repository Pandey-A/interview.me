import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import imageHero from '../../../public/image.png'

function Hero() {
    return (
        <section className="pt-8 pb-20 md:pt-5 md:pb-10  overflow-clip ">
          <div className="container">
            <div className="md:flex items-center">
            <div className="md:w-[478px]">
              <div className=" text-4xl inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Interview.me</div>
              <h1 className=" text-5xl md:text-7xlfont-bold tracking-tighter bg-gradient-to-b from-black to -[#001E80] text-transparent bg-clip-text mt-6" > Pathway to test your knowledge</h1> 
              <p className="text-xl text-[#010D3E] tracking-tight mt-6">
                Celebrate the joy of accomplishment when you crack an interview and get all the insights where you lack just before your real interviews.
              </p>
              <div className="flex gap-1 items-center mt-[30px]">
                <Link href="/dashboard"><button className="btn-primary btn ">Join Interview</button></Link>
                
                <button className="btn btn-text">
                  <span>
                  Learn more
                  </span>
                  <ArrowRightIcon className="h-5 w-5"/>
                  </button>
              </div>
            </div>
            </div>
            <div>
                <Image src={imageHero} alt='Hero Image'  height={500} width={500} className="hidden md:block absolute right-[100px] top-[200px] "/>
            </div>
            {/* <div className="mt-20 md:mt-0 md:h-[640px] md:flex-1 lg:h-[640px] lg:ml-[auto] relative">
              <Image src={cogImage} alt="cog Image" className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 "/>
              <Image 
              src={cylinderImage} 
              width={220}
              height={220}
              alt="cylinder Image"
              className="hidden md:block -top-8 -left-32 md:absolute"/>
            </div> */}
          </div>
        </section>
        );
      
}

export default Hero
