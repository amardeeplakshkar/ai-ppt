'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Edit2, Loader2, RefreshCw, Wand2 } from 'lucide-react';
import OutlineRenderer from '@/components/OutlineRenderer';
import { Button } from '@/components/ui/button';
import { OutlineGeneratorPrompt } from '@/constant';
import { TextShimmerWave } from '@/components/ui/TextShimmerWave';

export default function OutlinePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [outline, setOutline] = useState('');
    const [editableOutline, setEditableOutline] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [regenerating, setRegenerating] = useState(false);

    const generateOutline = async (prompt: string) => {
        try {
            const encodedPrompt = encodeURIComponent(prompt);
            const encodedSystemPrompt = encodeURIComponent(OutlineGeneratorPrompt);
            const response = await fetch(
                `https://text.pollinations.ai/${encodedPrompt}?system=${encodedSystemPrompt}`
            );

            if (!response.ok) {
                throw new Error('Failed to generate outline');
            }

            const data = await response.text();
            setOutline(data);
            setEditableOutline(data);
        } catch (err) {
            setError(`Failed to generate outline. Please try again.${err}`);
        } finally {
            setLoading(false);
            setRegenerating(false);
        }
    };

    useEffect(() => {
        const prompt = searchParams.get('prompt');
        if (prompt) {
            generateOutline(prompt);
        }
    }, [searchParams, router]);

    const handleRegenerateOutline = async () => {
        setRegenerating(true);
        await generateOutline(editableOutline);
    };

    const handleSubmit = () => {
        if (outline.trim()) {
            router.push(`/generator?data=${encodeURIComponent(outline)}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[82dvh] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
                     <TextShimmerWave
                                            className='[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]'
                                            duration={1}
                                            spread={1}
                                            zDistance={1}
                                            scaleDistance={1.1}
                                            rotateYDistance={20}
                                        >Generating your presentation Outline...</TextShimmerWave>
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
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center text-accent-foreground/80 hover:text-accent-foreground"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center bg-gray-100 dark:bg-gray-100/10  text-accent-foreground py-2 px-4 rounded-lg hover:bg-gray-200"
                        >
                            <Edit2 className="w-5 h-5 mr-2" />
                            {isEditing ? 'Preview' : 'Edit'}
                        </button>
                        {isEditing && (
                            <button
                                onClick={handleRegenerateOutline}
                                disabled={regenerating}
                                className="flex items-center bg-indigo-600 text-white text-accent py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
                            >
                                <RefreshCw className={`w-5 h-5 mr-2 ${regenerating ? 'animate-spin' : ''}`} />
                                Regenerate
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-accent rounded-lg shadow-xl">
                    {isEditing ? (
                        <div className="p-6">
                            <textarea
                                value={editableOutline}
                                onChange={(e) => setEditableOutline(e.target.value)}
                                className="w-full h-[calc(100vh-300px)] p-4 font-mono text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                placeholder="Edit your outline here..."
                            />
                        </div>
                    ) : (
                        <>
                            <div className="p-8 h-[calc(100vh-300px)] overflow-auto prose prose-indigo max-w-none">
                                <OutlineRenderer outline={outline}></OutlineRenderer>
                            </div>
                        </>
                    )}
                </div>
                <Button onClick={handleSubmit} className='my-4 py-6 w-full'><Wand2 />Generate</Button>
            </div>
        </div>
    );
}