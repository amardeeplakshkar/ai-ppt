'use client'

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Separator } from "./ui/separator";

interface OutlineRendererProps {
    outline: string;
}

const OutlineRenderer: React.FC<OutlineRendererProps> = ({ outline }) => {
    const [processedOutline, setProcessedOutline] = useState<string>("");

    useEffect(() => {
        let sectionCount = 0;
        let subsectionCount = 0;
        let subpointCount = 0;

        // Process outline text to insert numbering dynamically
        const processedText = outline
            .split("\n")
            .map(line => {
                if (line.startsWith("# ")) { // Main Title (No numbering)
                    return line;
                } else if (line.startsWith("## ")) { // Section (H2)
                    sectionCount++;
                    subsectionCount = 0; // Reset subsection counter
                    subpointCount = 0; // Reset subpoint counter
                    return `## ${sectionCount} ${line.replace("## ", "")}`;
                } else if (line.startsWith("### ")) { // Subsection (H3)
                    subsectionCount++;
                    subpointCount = 0; // Reset subpoint counter
                    return `### ${sectionCount}.${subsectionCount} ${line.replace("### ", "")}`;
                } else if (line.startsWith("#### ")) { // Subpoint (H4)
                    subpointCount++;
                    return `#### ${sectionCount}.${subsectionCount}.${subpointCount} ${line.replace("#### ", "")}`;
                }
                return line;
            })
            .join("\n");

        setProcessedOutline(processedText);
    }, [outline]);




    function extractAndRemoveNumbers(markdown: string) {
        // Regular expression to match numbers with optional decimal parts at the beginning of lines
        const regex = /^##*\s*\d+(\.\d+)*\s*/gm;

        const numbers = [...markdown.matchAll(regex)]
            .map(match => match[0]?.trim().match(/\d+(\.\d+)*/)?.[0] ?? "");

        // Remove numbers from the markdown
        const cleanedMarkdown = markdown.replace(regex, (match: string) => match.replace(/\d+(\.\d+)*/g, '').trim());

        return { numbers, cleanedMarkdown };
    }

    const result = extractAndRemoveNumbers(processedOutline);
    console.log("Extracted Numbers:", result.numbers);
    console.log("Cleaned Markdown:\n", result.cleanedMarkdown);
    return (
        <div className="*:text-center *:*:my-2">
            <ReactMarkdown
                components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 text-center">{children}
                        <Separator />
                    </h1>,
                    h2: ({ children }) => {
                        const text = children?.toString() ?? ""; // Ensure it's always a string
                        const match = text.match(/^(\d+)\s(.*)/);
                        return (
                            <h2 className="text-xl gap-2 grid grid-cols-3 text-ellipsis font-semibold text-gray-800 dark:text-gray-200">
                                <div>
                                    <span className='bg-purple-100 col-auto text-nowrap text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 border border-dashed text-center border-purple-400'>
                                        Chapter {match?.[1] ?? ""}
                                    </span>
                                </div>
                                <span className="col-span-2 text-start line-clamp-1">
                                    {(match?.[2] ?? children)?.toString().slice(1)}
                                </span>
                            </h2>
                        );
                    },

                    h3: ({ children }) => {
                        const text = children?.toString() ?? "";
                        const match = text.match(/^(\d+\.\d+)\s(.*)/);
                        return (
                            <h3 className="text-base gap-2 grid grid-cols-3 font-semibold text-gray-700 dark:text-gray-300">
                                <span className='text-center'>{match?.[1] ?? ""}</span>
                                <div className="col-span-2 text-start">
                                    {(match?.[2] ?? children)?.toString().slice(4)}
                                </div>
                            </h3>
                        );
                    },

                    h4: ({ children }) => {
                        const text = children?.toString() ?? "";
                        const match = text.match(/^(\d+\.\d+\.\d+)\s(.*)/);
                        return (
                            <h4 className="text-sm gap-2 grid grid-cols-3 font-medium text-gray-600 dark:text-gray-400">
                                <span className='text-center'>{match?.[1] ?? ""}</span>
                                <div className="col-span-2 text-start">
                                    {(match?.[2] ?? children)?.toString().slice(6)}
                                </div>
                            </h4>
                        );
                    },
                }}
            >
                {processedOutline}
            </ReactMarkdown>
        </div>
    );
};

export default OutlineRenderer;