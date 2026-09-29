import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { NotificationProvider } from "@/components/NotificationProvider";
import { Suspense } from "react";
import { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";


const inter = Inter({
    subsets: ["latin"],
});

const description =
    "Create clean, professional technical resumes with Resumely. Build, customize, and download a well-formatted resume in minutes.";
const siteUrl = "https://resumelyonline.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Resumely | Create Professional Technical Resumes",
        template: "%s | Resumely",
    },
    applicationName: "Resumely",
    category: "technology",
    description,
    keywords: [
        "resume builder",
        "resume generator",
        "technical resume",
        "CV builder",
        "resume creator",
    ],
    authors: [
        {
            name: "Luca Mawyin",
            url: siteUrl,
        }
    ],
    creator: "Luca Mawyin",
    publisher: "Luca Mawyin",
    icons: {
        icon: [
            {
                url: "/favicon.svg",
                type: "image/svg+xml",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
        },
    },
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: "/",
        title: "Resumely | Create Professional Technical Resumes",
        description,
        siteName: "Resumely",
        images: [
            {
                url: "/og-image.png",
                width: 800,
                height: 800,
                alt: "Resumely | Create professional technical resumes",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Resumely | Create Professional Technical Resumes",
        description,
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex min-h-screen flex-col`}>
                <SmoothScroll/>
                <main className="
                    relative 
                    flex
                    flex-col
                    flex-1
                ">
                    <NotificationProvider>
                        <Suspense fallback={null}>
                            {children}
                        </Suspense>

                    </NotificationProvider>
                    <Footer />
                </main>
            </body>
        </html>
    );
}
