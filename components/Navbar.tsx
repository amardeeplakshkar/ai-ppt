import {  User } from 'lucide-react'
import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='sticky top-0 flex justify-between items-center p-4'>
            <Link href={"/"}>AIPPT</Link>
            <div className='flex gap-2 justify-center items-center'>
                <ThemeSwitcher />
                <Button variant={"outline"} size={"icon"}>
                <User className=""/>
                </Button>
            </div>
        </nav>
    )
}

export default Navbar