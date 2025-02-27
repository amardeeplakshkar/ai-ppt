'use client'

import { usePrompt } from '@/components/contexts/PromptContext'
import React from 'react'
import { usePollinationsText } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';
import { SYSTEM_PROMPT } from '@/constant';

const ContentPage = () => {
    const {prompt} =  usePrompt()
    const text = usePollinationsText(prompt, { 
        seed: 42,
        model: 'openai',
        systemPrompt: SYSTEM_PROMPT
      });
  return (
    <div>{prompt ? <ReactMarkdown>{text}</ReactMarkdown> : <p>Loading...</p>}</div>
  )
}

export default ContentPage