import "../globals.css";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentation",
    description:
        "Learn how to use Resumely to create, customize, save, and export your resume.",
    robots: {
        index: true,
        follow: true,
    },
};

export default function DocumentationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full flex-col">
            <Header showStepTitle={false}/>
            {children}
        </div>
    );
}