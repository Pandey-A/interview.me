import Image from 'next/image';
import React from 'react'
import socialInsta from '../../../public/social-insta.svg'
import socialLinkedin from '../../../public/social-linkedin.svg'
import socialTwitter from '../../../public/social-x.svg'
import socialYoutube from '../../../public/social-youtube.svg'
import logoBrand from '../../../public/logo.png'

function Footer() {
    return (
        <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
    <div className="container">
      <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:h-full before:w-full before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)]">
      <Image src={logoBrand} alt="Saas Logo" height={40} className="relative"/>
      </div>
      <nav className="flex flex-col md:flex-row  md:justify-center gap-6 mt-6">
        <a href="#">About</a>
        <a href="#">Customers</a>
        <a href="#">Features</a>
        <a href="#">Help</a>
        <a href="#">Careers</a>
      </nav>
      <div className="flex justify-center gap-6 mt-6">
        <Image src={socialInsta} alt="Instagram" height={30} className="relative"/>
        <Image src={socialTwitter} alt="Twitter" height={30} className="relative"/>
        <Image src={socialYoutube} alt="Youtube" height={30} className="relative"/>
        <Image src={socialLinkedin} alt="Linkedin" height={30} className="relative"/>
      </div>
      <p className="mt-6">&copy; 2024 Interview.Me All rights reserved.</p>
    </div>
        </footer>
      );
    
}

export default Footer
