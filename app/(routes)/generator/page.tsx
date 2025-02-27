'use client'

import { TextShimmerWave } from '@/components/ui/TextShimmerWave';
import { PPTGeneratorPrompt } from '@/constant';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DownloadButton from '@/components/DownloadButton';
import { PresentationData } from '@/lib/types';

const Generator = () => {
    const [pptData, setPptData] = useState<PresentationData | null>(null);
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
            
            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);
                setPptData(jsonData);
            } catch (parseError) {
                console.error("Failed to parse JSON:", parseError);
                setError(`Failed to parse presentation data. Please try again.`);
                setPptData(null);
            }
        } catch (err) {
            setError(`Failed to generate presentation. Please try again. ${err}`);
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
        <div className="container -mt-2 mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {pptData && (
                    <>
                        <h1 className="text-2xl font-bold mb-6">{pptData.presentation.title}</h1>
                        
                        <div className="bg-accent h-[65dvh] overflow-y-auto rounded-lg shadow-xl p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Presentation Preview</h2>
                            
                            {pptData.presentation.slides.map((slide, slideIndex) => (
                                <div key={slideIndex} className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <h3 className="text-lg font-medium mb-3">{slide.slide_title}</h3>
                                    
                                    {slide.content.map((section, sectionIndex) => (
                                        <div key={sectionIndex} className="mb-4">
                                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{section.title}</h4>
                                            
                                            {section.subsections.map((subsection, subsectionIndex) => (
                                                <div key={subsectionIndex} className="ml-4 mb-3">
                                                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">{subsection.title}</h5>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{subsection.content}</p>
                                                    
                                                    {subsection.image_src && (
                                                        <div className="mt-2">
                                                            <img 
                                                                src={subsection.image_src} 
                                                                alt={subsection.title} 
                                                                className="max-w-xs rounded-md"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        
                        <DownloadButton presentationData={pptData} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Generator