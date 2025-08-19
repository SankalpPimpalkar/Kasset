import { Github } from 'lucide-react'
import React from 'react'

export default function Navbar() {
    return (
        <header className='border-b border-[#202020] bg-[#151515] sticky top-0 w-full left-0'>
            <nav className='w-full max-w-5xl mx-auto py-6 px-4 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img
                        className='w-12 border border-[#202020]'
                        src="/kasset-logo.jpeg"
                        alt="Kasset-Logo"
                    />
                    <h1 className='font-lilita text-3xl uppercase'>
                        Kasset
                    </h1>
                </div>

                <div>
                    <Github size={24} fill='white' />
                </div>
            </nav>
        </header>
    )
}
