'use client'

import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import Navbar from '../Navbar'
import { PromptProvider } from '../contexts/PromptContext'

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange

            >
                <PromptProvider>
                    <Navbar />
                    <div className="-mt-[4.3rem] pt-[4rem] p-4 min-h-screen">
                        {children}
                    </div>
                </PromptProvider>
            </ThemeProvider>
        </>
    )
}

export default ProviderLayout