"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function BuildShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showStepTitle, setShowStepTitle] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowStepTitle(
                window.scrollY >= window.innerHeight * 0.1
            );
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="flex w-full flex-col">
            <Header showStepTitle={showStepTitle} />

            <div className="relative flex flex-1 flex-col">
                {children}
            </div>
        </div>
    );
}