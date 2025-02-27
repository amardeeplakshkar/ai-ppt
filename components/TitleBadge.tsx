import { useRouter } from "next/navigation";

function TitleBadge() {
    const router = useRouter()

    const topics = [
        { title: "Nanotech in Medicine", description: "Exploring the role of nanotechnology in modern medical advancements and treatments." },
        { title: "Bizarre Architectural Wonders", description: "A look at the strangest and most fascinating architectural structures across the globe." },
        { title: "Ancient Astrology vs. Astronomy", description: "Understanding how ancient astrological beliefs compare and contrast with modern astronomical discoveries." },
        { title: "Wisdom of Ancient Architects", description: "Analyzing the engineering and architectural brilliance of ancient societies." },
        { title: "Identity in the Virtual World", description: "Examining how digital environments shape and redefine human identity." },
        { title: "Cultural Diversity Online", description: "Discussing ways to preserve and celebrate cultural diversity in the digital age." },
        { title: "Preserving Ancient Relics", description: "Exploring techniques and challenges in conserving historical artifacts and relics." },
        { title: "Mastering Communication", description: "Mastering the principles of clear, persuasive, and impactful communication." }
    ];


    return (
        <>
            {
                topics.map((topic, index) => (
                    <div onClick={()=> router.push(`/outline?prompt=${encodeURIComponent(topic.title)}`)} key={index} className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5 cursor-pointer text-muted-foreground *:hover:text-foreground transition-opacity duration-300 hover:scale-105">
                        <p className="px-2 text-xs">
                            {topic.title}
                        </p>
                    </div>
                ))
            }
        </>
    );
}

export default TitleBadge;
