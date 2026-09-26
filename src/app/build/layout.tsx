import Footer from "@/components/Footer";
import "../globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { NotificationProvider } from "@/components/NotificationProvider";
import { Suspense } from "react";

const inter = Inter({
    subsets: ["latin"],
});

export default function BuildLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className={`
            ${inter.className} 
            flex 
            flex-col 
            w-full 
        `}>
            <Header/>
            <div className="
                relative 
                flex
                flex-1
            ">
                <NotificationProvider>
                    <Suspense fallback={null}>
                        {children}
                    </Suspense>
                </NotificationProvider>                    
            </div>
        </div>
        

    );
}
