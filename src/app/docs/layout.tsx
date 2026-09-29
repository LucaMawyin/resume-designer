import "../globals.css";
import BuildShell from "@/components/BuildShell";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume Builder",
    description:
        "Build and customize your professional technical resume with Resumely.",
    robots: {
        index: false,
        follow: false,
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