"use client";

import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "./hooks/useAutoResize";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TitleBadge from "./TitleBadge";

interface AIInputWithSearchProps {
    id?: string;
    placeholder?: string;
    minHeight?: number;
    maxHeight?: number;
    onSubmit?: (value: string, withSearch: boolean) => void;
    className?: string;
}

const placeholders = [
    "Generate a stunning PPT on any topic...",
    "Type your topic, and let AI build your slides...",
    "Need a presentation? Just enter your idea...",
    "AI-powered slides at your fingertips...",
    "Enter a subject, get a full presentation...",
    "What do you want your PPT to be about?",
    "Instantly create slides with AI—start now!",
    "Describe your presentation topic and let AI do the rest..."
];
export function AIInputWithSearch({
    id = "ai-input-with-search",
    minHeight = 48,
    maxHeight = 164,
    className
}: AIInputWithSearchProps) {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight,
        maxHeight,
    });
    const router = useRouter();
    const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
    let index = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            index = (index + 1) % placeholders.length;
            setCurrentPlaceholder(placeholders[index]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = () => {
        if (value.trim()) {
            router.push(`/outline?prompt=${encodeURIComponent(value)}`);
            setValue("");
            adjustHeight(true);
        }
    };

    return (
        <div className={cn("w-full py-4", className)}>
            <div className="relative max-w-xl w-full mx-auto">
                <div className="relative flex flex-col">
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: `${maxHeight}px` }}
                    >
                        <Textarea
                            id={id}
                            value={value}
                            className="w-full outline-none focus:ring-[0] focus-visible:ring-[2] rounded-xl rounded-b-none px-4 py-4 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder-transparent resize-none leading-[1.2]"
                            ref={textareaRef}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                        />
                        <AnimatePresence mode="wait">
                            {!value && (
                                <motion.span
                                    key={currentPlaceholder}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute overflow-hidden top-3 left-4 text-black/70 dark:text-white/70 pointer-events-none"
                                >
                                    {currentPlaceholder}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="h-12 bg-black/5 dark:bg-white/5 rounded-b-xl">
                        <div className="absolute right-3 bottom-3">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={cn(
                                    "rounded-lg p-2 transition-colors",
                                    !value.trim() && "opacity-50 cursor-not-allowed",
                                    value.trim()
                                        ? "bg-sky-500/15 text-sky-500"
                                        : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                                )}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex m-4 justify-center gap-2 items-center flex-wrap">
            <TitleBadge/>
            </div>
        </div>
    );
}
