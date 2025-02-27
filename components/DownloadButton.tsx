'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Download, Loader2 } from 'lucide-react';
import { generatePPTX } from '@/lib/pptx';
import { PresentationData } from '@/lib/types';

interface DownloadButtonProps {
  presentationData: PresentationData;
  isLoading?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  presentationData, 
  isLoading = false 
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      
      // Generate the PowerPoint file
      const blob = await generatePPTX(presentationData);
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = `${presentationData.presentation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pptx`;
      
      // Append to the DOM, click, and remove
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Release the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PPTX:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      disabled={isLoading || downloading || !presentationData} 
      className="w-full py-6 my-4"
    >
      {downloading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PowerPoint...
        </>
      ) : (
        <>
          <Download className="mr-2" />
          Download PowerPoint
        </>
      )}
    </Button>
  );
};

export default DownloadButton;