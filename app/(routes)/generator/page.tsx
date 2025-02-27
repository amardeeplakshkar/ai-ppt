'use client'

import { TextShimmerWave } from '@/components/ui/TextShimmerWave';
import { PPTGeneratorPrompt } from '@/constant';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Generator = () => {
    const [pptData, setPptData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const generatePpt = async (prompt: string) => {
        try {
            const encodedPrompt = encodeURIComponent(prompt);
            const encodedSystemPrompt = encodeURIComponent(PPTGeneratorPrompt);
            const response = await fetch(
                `https://text.pollinations.ai/${encodedPrompt}?system=${encodedSystemPrompt}`
            );

            if (!response.ok) {
                throw new Error('Failed to generate outline');
            }

            const data = await response.text();
            setPptData(data);
        } catch (err) {
            setError(`Failed to generate outline. Please try again.${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const prompt = searchParams.get('data');
        if (!prompt) {
            router.push('/');
            return;
        }

        generatePpt(prompt);
    }, [router, searchParams]);


    if (loading) {
        return (
            <div className="min-h-[82dvh] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-[#5EB1EF] mx-auto" />
                    <TextShimmerWave
                        className='[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]'
                        duration={1}
                        spread={1}
                        zDistance={1}
                        scaleDistance={1.1}
                        rotateYDistance={20}
                    >Generating your presentation...</TextShimmerWave>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[82dvh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 bg-indigo-600 text-accent py-2 px-4 rounded-lg hover:bg-indigo-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <pre>
                {pptData}
            </pre>
            {error && <p>{error}</p>}
        </>
    )
}

export default Generator