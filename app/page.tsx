'use client';
import { Presentation, Wand2 } from 'lucide-react';
import { AIInputWithSearch } from '@/components/InputComponent';

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 min-h-[82dvh] flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Presentation className="w-12 h-12 text-indigo-600" />
          <Wand2 className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold text-accent-800 mb-2">AI PowerPoint Generator</h1>
        <p className="text-gray-600">Enter your topic and let AI create a structured presentation outline</p>
      </div>

      <div className="w-full max-w-2xl">
       <AIInputWithSearch/>
      </div>
    </div>
  );
}